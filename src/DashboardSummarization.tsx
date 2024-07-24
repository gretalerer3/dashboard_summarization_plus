import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '@looker/extension-sdk-react';
import { Filters } from '@looker/extension-sdk';
import { GenerativeLogo, LandingPage } from './components/LandingPage';
import { socket } from './socket';
import MarkdownComponent from './components/MarkdownComponent';
import useWorkspaceOauth from './hooks/useWorkspaceOauth';
import { SummaryDataContext } from './contexts/SummaryDataContext';
import useSlackOauth from './hooks/useSlackOauth';

interface DashboardMetadata {
  dashboardFilters: Filters | undefined,
  dashboardId: string | undefined,
  queries: {
    id: any;
    fields: any;
    view: any;
    model: any;
    dynamic_fields?: any;
  }[],
  indexedFilters: {
    [key: string]: {
      dimension: string,
      explore: string,
      model: string
    }
  }
}

export const DashboardSummarization: React.FC = () => {
  const { extensionSDK, tileHostData, core40SDK } = useContext(ExtensionContext);
  const { dashboardFilters, dashboardId } = tileHostData;
  const [dashboardMetadata, setDashboardMetadata] = useState<DashboardMetadata>();
  const [loadingDashboardMetadata, setLoadingDashboardMetadata] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [refinedData, setRefinedData] = useState([]);
  const { data, setData, formattedData, setFormattedData, info, setInfo, message, setMessage, setDashboardURL } = useContext(SummaryDataContext);
  const [loading, setLoading] = useState(false);
  const workspaceOauth = useWorkspaceOauth();
  const slackOauth = useSlackOauth();
  const [userInput, setUserInput] = useState(''); // State for additional user input

  useEffect(() => {
    function onConnect(value) {
      console.log("Connected!!", value);
      setIsConnected(true);
    }

    function onDisconnect(value) {
      console.log("Disconnected: ", value);
      setIsConnected(false);
    }

    function onFooEvent(value: string) {
      setData(previous => value.substring(0, 2).includes("#") ? [...previous, '\n', value] : [...previous, value]);
    }

    function onRefineEvent(value: string) {
      setRefinedData(JSON.parse(value));
      document.getElementById('overlay').style.zIndex = 10;
      document.getElementById('overlay').style.opacity = 1;
    }

    function onComplete(event: string) {
      console.log(event);
      !event.includes(`"key_points":`) && setFormattedData(event);
      setLoading(false);
    }

    socket.connect();

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('my broadcast event', onFooEvent);
    socket.on('my refine event', onRefineEvent);
    socket.on('complete', onComplete);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('my broadcast event', onFooEvent);
      socket.off('my refine event', onRefineEvent);
      socket.off('complete', onComplete);
    };
  }, []);

  useEffect(() => {
    if (tileHostData.dashboardRunState === 'RUNNING') {
      setData([]);
      setLoading(false);
    }
  }, [dashboardFilters]);

  const applyFilterToListeners = (data, filters, dashboardFilters) => {
    if (dashboardFilters !== null) {
      const filterListeners = data.filter((item) => item.listen.length > 0);
      filterListeners.forEach((filter) => {
        filter.listen.forEach((listener) => {
          filters[listener.field] = dashboardFilters[listener.dashboard_filter_name];
        });
      });
      return filters;
    }
    return {};
  }

  const fetchQueryMetadata = useCallback(async () => {
    if (dashboardId) {
      setLoadingDashboardMetadata(true);
      setMessage("Loading Dashboard Metadata");
      const { description } = await core40SDK.ok(core40SDK.dashboard(dashboardId, 'description'));

      const queries = await core40SDK.ok(core40SDK.dashboard_dashboard_elements(
        dashboardId, 'query,result_maker,note_text,title,query_id'
      )).then((res) => {
        const queries = res.filter((d) => d.query !== null || d.result_maker !== null).map((data) => {
          const { query, note_text, title } = data;
          if (data.query !== null) {
            const { fields, dynamic_fields, view, model, filters, pivots, sorts, limit, column_limit, row_total, subtotals } = query;
            const newFilters = applyFilterToListeners(data.result_maker?.filterables, filters || {}, dashboardFilters);
            return { queryBody: { fields, dynamic_fields, view, model, filters: newFilters, pivots, sorts, limit, column_limit, row_total, subtotals }, note_text, title };
          } else if (data.result_maker!.query !== null) {
            const { fields, dynamic_fields, view, model, filters, pivots, sorts, limit, column_limit, row_total, subtotals } = data.result_maker!.query;
            const newFilters = applyFilterToListeners(data.result_maker?.filterables, filters || {}, dashboardFilters);
            return { queryBody: { fields, dynamic_fields, view, model, filters: newFilters, pivots, sorts, limit, column_limit, row_total, subtotals }, note_text, title };
          } else {
            return undefined;
          }
        });
        return queries;
      }).finally(() => {
        setLoadingDashboardMetadata(false);
        setMessage("Loaded Dashboard Metadata. Click 'Summarize Dashboard' to Generate report summary.");
      });
      if (!loadingDashboardMetadata) {
        await extensionSDK.localStorageSetItem(`${dashboardId}:${JSON.stringify(dashboardFilters)}`, JSON.stringify({ dashboardFilters, dashboardId, queries, description }));
        setDashboardMetadata({ dashboardFilters, dashboardId, queries, description });
      }
    }
  }, [dashboardId, dashboardFilters]);

  useEffect(() => {
    if (message && (message.includes('Loaded Dashboard Metadata') || message.includes("Google Chat") || message.includes("Slack"))) {
      setTimeout(() => {
        setInfo(false);
      }, 1000);
    }
  }, [message]);

  useEffect(() => {
    async function fetchCachedMetadata() {
      return await extensionSDK.localStorageGetItem(`${tileHostData.dashboardId}:${JSON.stringify(tileHostData.dashboardFilters)}`);
    }
    fetchCachedMetadata().then((cachedMetadata) => {
      if (cachedMetadata !== null) {
        setDashboardURL(extensionSDK.lookerHostData?.hostUrl + "/embed/dashboards/" + tileHostData.dashboardId);
        setLoadingDashboardMetadata(false);
        setMessage("Loaded Dashboard Metadata from cache. Click 'Summarize Dashboard' to Generate report summary.");
        setDashboardMetadata(JSON.parse(cachedMetadata || '{}'));
      } else if (tileHostData.dashboardRunState !== 'UNKNOWN') {
        setDashboardURL(extensionSDK.lookerHostData?.hostUrl + "/embed/dashboards/" + tileHostData.dashboardId);
        fetchQueryMetadata();
      }
    });
  }, [fetchQueryMetadata]);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {refinedData.length > 0 ?
        <div 
          id={'overlay'}
          onClick={() => {
            document.getElementById('overlay').style.zIndex = -10;
            document.getElementById('overlay').style.opacity = 0;
          }}
          style={{
            position: 'absolute',
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="refineCard" style={{
            justifyContent: 'space-between',
            height: '80%',
            width: '80%',
            flexDirection: 'column',
            margin: '2rem',
            opacity: 1,
            overflowY: 'scroll'
          }}>
            {refinedData.map((value, index) => (
              <div key={index}>
                <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>{value['query_title']}</p>
                <span style={{ opacity: '0.8' }}>{value['key_points'].join('\n')}</span>
              </div>
            ))}
          </div>
        </div>
        : <></>}
      <div style={{ height: '100vh', position: 'relative', zIndex: 1 }}>
        {message ? 
          <div style={{
            position: 'absolute',
            zIndex: 1,
            top: info ? document.documentElement.scrollTop || document.body.scrollTop : -100,
            left: 0,
            marginBottom: '1rem',
            width: '100%',
            padding: '0.8rem',
            fontSize: '0.8rem',
            color: 'rgb(0,8,2,0.8)',
            alignContent: 'center',
            backgroundColor: 'rgb(255, 100, 100,0.2)',
            backdropFilter: 'blur(10px)'
          }}>{message}</div>
          : <></>}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', marginBottom: '1.6rem' }}>
          {!loading && data.length <= 0 ?
            <div className="layout" style={{ boxShadow: '0px', paddingBottom: '1.2rem', paddingTop: '1.2rem', height: '50%' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.2rem', opacity: '1', width: 'auto' }}>Dashboard Summarization</span>
                <span style={{ fontSize: '0.9rem', opacity: '0.8', width: '60%' }}>Looker + Vertex AI</span>
              </div>
              <input
                type="text"
                placeholder="Enter additional information"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                style={{ marginBottom: '1rem', padding: '0.5rem', fontSize: '1rem' }}
              />
              <button
                className="button"
                style={{ lineHeight: '20px', padding: '6px 16px' }}
                disabled={loading || !socket.connected}
                onClick={() => {
                  setLoading(true);
                  const dataToSend = {
                    ...dashboardMetadata,
                    instance: extensionSDK.lookerHostData?.hostOrigin?.split('https://')[1].split('.')[0],
                    additionalInfo: userInput, // Include the user input
                  };
                  socket.emit('my event', JSON.stringify(dataToSend));
                }}
              >
                {loading ? 'Generating' : 'Generate'}
                <img
                  style={{ opacity: loading ? 0.2 : 1 }}
                  src="https://fonts.gstatic.com/s/i/short-term/release/googlesymbols/summarize_auto/default/20px.svg"
                />
              </button>
            </div>
            : <></>}
          <div style={{ boxShadow: '0px', position: 'absolute', bottom: '0px', height: '10vh', paddingRight: '1rem', paddingLeft: '1rem', zIndex: 1, backgroundColor: 'white', width: '-webkit-fill-available' }}>
            <div className='layoutBottom'>
              <span style={{ fontSize: '0.9rem', opacity: !loading ? 0.8 : 0.2, width: '30%' }}>Actions</span>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '70%', opacity: !loading ? 1 : 0.2 }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', opacity: !loading ? 0.8 : 0.2, paddingRight: '0.8rem' }}>Export</span>
                  <button disabled={loading || data.length <= 0} onClick={workspaceOauth} className='button' style={{ borderRadius: '50%', padding: '0.5rem' }}>
                    <img height={20} width={20} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Google_Chat_icon_%282020%29.svg/1024px-Google_Chat_icon_%282020%29.svg.png" />
                  </button>
                  <button disabled={loading || data.length <= 0} onClick={slackOauth} className='button' style={{ borderRadius: '50%', padding: '0.5rem', marginLeft: '2vw' }}>
                    <img height={20} width={20} src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg" />
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '1rem' }}>
                  <span style={{ fontSize: '0.9rem', opacity: !loading ? 0.8 : 0.2, paddingRight: '0.8rem' }}>Edit</span>
                  <button
                    disabled={loading || data.length <= 0}
                    onClick={() => {
                      const summaryText = data.join('\n');
                      setLoading(true);
                      socket.emit("refine", JSON.stringify(summaryText));
                    }}
                    className='button'
                    style={{ borderRadius: '20%', padding: '0.5rem' }}
                  >
                    Refine
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {data.length > 0 
          ? 
          <div style={{ height: '90%', width: '90%', marginBottom: '1rem', paddingLeft: '1rem' }}>
            <div className="summary-scroll" >
              <div className='progress'></div>
              <MarkdownComponent data={data} />
            </div>
          </div>
          :
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: loading ? '70vh' : '90%',
            width: '100%',
            padding: '0.8rem',
            marginTop: '1rem'
          }}>
            {loading && data.length <= 0 ? <GenerativeLogo /> : <LandingPage />}
          </div>
        }
      </div>
    </div>
  );
}
