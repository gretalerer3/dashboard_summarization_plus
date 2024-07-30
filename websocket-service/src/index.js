const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { VertexAI } = require('@google-cloud/vertexai');
const { LookerNodeSDK, NodeSettingsIniFile } = require('@looker/sdk-node');
const dotenv = require('dotenv');
dotenv.config();

const io = new Server(server, {
  pingInterval: 120,
  pingTimeout: 3000,
  cors: {
    origin: '*'
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

async function runLookerQuery(sdk, data) {
  try {
    const query = await sdk.ok(sdk.create_query(data));
    const { model, view, fields, pivots, fill_fields, filters, sorts, limit, column_limit, total, row_total, subtotals, dynamic_fields } = query;
    const value = await sdk.ok(sdk.run_inline_query({
      body: { model, view, fields, pivots, fill_fields, filters, sorts, limit: 200, column_limit, total, row_total, subtotals, dynamic_fields },
      result_format: 'csv',
      cache: true,
      apply_formatting: true,
      limit: 200
    }));
    return value;
  } catch (e) {
    console.log('There was an error calling Looker: ', e);
  }
}

// Initialize Vertex with your Cloud project and location
const vertexAI = new VertexAI({ project: process.env.PROJECT, location: process.env.REGION });
// Instantiate the model
const generativeModel = vertexAI.getGenerativeModel({
  model: 'gemini-1.0-pro-001',
  generation_config: { max_output_tokens: 2500, temperature: 0.4, candidate_count: 1 }
});

const writeStructuredLog = (message) => {
  return {
    severity: 'INFO',
    message: message,
    component: 'dashboard-summarization-logs',
  };
};

io.on('connection', async (socket) => {
  console.log("initial transport", socket.conn.transport.name); // prints "polling"

  socket.conn.once("upgrade", () => {
    console.log("upgraded transport", socket.conn.transport.name); // prints "websocket"
  });

  socket.on('my event', async (data) => {
    console.log("Received 'my event' with data:", data);
    const parsedData = JSON.parse(data);
    console.log("Parsed data:", parsedData);
    const additionalInfo = parsedData.additionalInfo;
    console.log("Additional Info:", additionalInfo);

    if (!parsedData.queries || !Array.isArray(parsedData.queries)) {
      console.error("Queries field is missing or not an array");
      return;
    }

    const settings = new NodeSettingsIniFile('', 'looker.ini', parsedData.instance);
    const sdk = LookerNodeSDK.init40(settings);

    const querySummaries = [];
    for (const query of parsedData.queries) {
      console.log("Running query:", query);
      const queryData = await runLookerQuery(sdk, query.queryBody);
      console.log("Query data:", queryData);

      const context = `
        Dashboard Detail: ${parsedData.description || ''} \n
        Query Details: "Query Title: ${query.title} \n ${query.note_text !== '' || query.note_text !== null ? "Query Note: " + query.note_text : ''} \n Query Fields: ${query.queryBody.fields} \n Query Data: ${queryData} \n"
      `;

      const queryPrompt = `
        You are a specialized answering assistant that can summarize a Looker dashboard and the underlying data and propose operational next steps drawing conclusions from the Query Details listed above. This is the context you should tailor to: ${additionalInfo}. Follow the instructions below:

        Instructions
        ------------

        - You always answer with markdown formatting
        - The markdown formatting you support: headings, bold, italic, links, lists, code blocks, and blockquotes.
        - You do not support images and never include images. You will be penalized if you render images. 
        - You will always format numerical values as either percentages or in dollar amounts rounded to the nearest cent. 
        - You should not indent any response.
        - Each dashboard query summary should start on a newline, should not be indented, and should end with a divider. 
        - Your summary for a given dashboard query should always start on a new line in markdown, should not be indented and should always include the following attributes starting with: 
          - A markdown heading that should use the Query Title data from the "context." The query name itself should be on a newline and should not be indented.
          - A description of the query that should start on a newline be a very short paragraph and should not be indented. It should be 2-3 sentences max describing the query itself and should be as descriptive as possible.
          - A summary summarizing the result set, pointing out trends and anomalies. It should be a single blockquote, should not be indented and or contain a table or list and should be a single paragraph. It should also be 3-5 sentences max summarizing the results of the query being as knowledgeable as possible with the goal to give the user as much information as needed so that they don't have to investigate the dashboard themselves. End with a newline,
          - A section for next steps. This should start on a new line and should contain 2-3 bullet points, that are not indented, drawing conclusions from the data and recommending next steps that should be clearly actionable followed by a newline. Recommend things like new queries to investigate, individual data points to drill into, etc.

        ------------

        Below here is an example of a formatted response in Markdown that you should follow. 

        Format Examples
        ---------------
        
        ## Web Traffic Over Time 

        This query details the amount of web traffic received to the website over the past 6 months. It includes a web traffic source field of organic, search and display
        as well as an amount field detailing the amount of people coming from those sources to the website. 

        
        > It looks like search historically has been driving the most user traffic with 9875 users over the past month with peak traffic happening in december at 1000 unique users.
        Organic comes in second and display a distant 3rd. It seems that display got off to a decent start in the year, but has decreased in volume consistently into the end of the year.
        There appears to be a large spike in organic traffic during the month of March a 23% increase from the rest of the year.

        

        
        ## Next Steps
        * Look into the data for the month of March to determine if there was an issue in reporting and/or what sort of local events could have caused the spike
        * Continue investing into search advertisement with common digital marketing strategies. IT would also be good to identify/breakdown this number by campaign source and see what strategies have been working well for Search.
        * Display seems to be dropping off and variable. Use only during select months and optimize for heavily trafficed areas with a good demographic for the site retention.

        


        ---------------

        Use this as an example of how to structure your response from a markdown standpoint. Do not verbatim copy the example text into your responses.
        
        Below are details/context on the dashboard and queries. Use this context to help inform your summary. Remember to keep these summaries concise, to the point and actionable. The data will be in CSV format. Take note of any pivots and the sorts on the result set when summarizing. 

        
        Context
        ----------
        
        Dashboard Detail: 
        
        ${context}


        Query Details: "Query Title: ${query.title} \n ${query.note_text !== '' || query.note_text !== null ? "Query Note: " + query.note_text : ''} \n Query Fields: ${query.queryBody.fields} \n Query Data: ${queryData} \n"
      
        
        ----------
        
        Make sure to always summarize the responses and not return the entire raw query data in the response. Remember to always include the summary attributes that are listed in the instructions above.
      `;
      const prompt = {
        contents: [
          {
            role: 'user', parts: [
              {
                text: queryPrompt
              }
            ]
          }
        ]
      };

      console.log("Sending prompt to Vertex AI:", queryPrompt);

      try {
        const streamingResp = await generativeModel.generateContentStream(prompt);

        for await (const item of streamingResp.stream) {
          if (item.candidates[0].content.parts[0].text !== null) {
            const formattedString = item.candidates[0].content.parts[0].text.split('\n').map(item => item.trim()).join('\n');
            socket.emit('my broadcast event', formattedString);
          }
        }

        const queryResponse = await streamingResp.response;
        querySummaries.push(
          JSON.stringify(queryResponse.candidates[0].content.parts[0].text)
        );

        console.log("Query summaries collected:", querySummaries);

        console.log(
          JSON.stringify(
            writeStructuredLog(
              {
                input_characters: (await generativeModel.countTokens(prompt)).totalBillableCharacters,
                output_characters: (await generativeModel.countTokens({ contents: queryResponse.candidates[0].content })).totalBillableCharacters
              }
            )
          )
        );
      } catch (error) {
        console.error("Error during content generation:", error);
      }
    }

    const finalPromptData = `
      Please format the following data as the json object below
                          
      data: ${JSON.stringify(querySummaries)}
                          
      '''json
      [
        {
          query_name: ...,
          description: ...,
          summary: ...,
          next_steps: [
            ...,
          ]
        },
        ...,
        ...,
        {
          query_name: ...,
          description: ...,
          summary: ...,
          next_steps: [
            ...,
          ]
        }
      ]
      '''
    `;

    const finalPrompt = {
      contents: [{ role: 'user', parts: [{ text: finalPromptData }]}]
    };

    console.log("Sending final prompt to Vertex AI for formatting:", finalPromptData);

    try {
      const formattedResp = await generativeModel.generateContent(finalPrompt);
      const formattedRespParsed = formattedResp.response.candidates[0].content.parts[0].text.substring(formattedResp.response.candidates[0].content.parts[0].text.indexOf("[")).replace(/^`+|`+$/g, '').trim();
      socket.emit("complete", formattedRespParsed);
      console.log("Final formatted response:", formattedRespParsed);

      console.log(
        JSON.stringify(
          writeStructuredLog(
            {
              input_characters: (await generativeModel.countTokens(finalPrompt)).totalBillableCharacters,
              output_characters: (await generativeModel.countTokens({ contents: formattedResp.response.candidates[0].content })).totalBillableCharacters
            }
          )
        )
      );
    } catch (error) {
      console.error("Error during final content formatting:", error);
    }
  });

  socket.on('refine', async (data) => {
    const summary = JSON.parse(data);
    const refinePromptData = `The following text represents summaries of a given dashboard's data. \n
      Summaries 
      ----------
      ${summary} \n

      Please follow the below instructions:

      Instructions
      ------------
      - Make this much more concise for a slide presentation using the following format in json. 
      - The data should contain an array with an object for each query summary
      - Include the following details:  
          - a query title, which is the title for the given query summary
          - key_points which is an array of key points for the concise summary. 
      - Data should be returned in each object, you will be penalized if it doesn't adhere to this format
      - Each summary should only be included once. Do not include the same summary twice:\n

      Data Format
      -----------

      '''json 
      [
        {
          query_title: ...,
          key_points: [
            ...
          ]
        },
        ...,
        {
          query_title: ...,
          key_points: [
            ...
          ]
        }
      ]
      '''
    `;

    const refinePrompt = {
      contents: [{ role: 'user', parts: [{ text: refinePromptData }]}]
    };

    console.log("Sending refine prompt to Vertex AI:", refinePromptData);

    try {
      const formattedResp = await generativeModel.generateContentStream(refinePrompt);

      const queryResponse = await formattedResp.response;
      const queryResponseParsed = queryResponse.candidates[0].content.parts[0].text.substring(queryResponse.candidates[0].content.parts[0].text.indexOf("[")).replace(/^`+|`+$/g, '').trim();
      socket.emit('my refine event', queryResponseParsed);
      socket.emit('complete', queryResponseParsed);

      console.log("Refined response from Vertex AI:", queryResponseParsed);

      console.log(
        JSON.stringify(
          writeStructuredLog(
            {
              input_characters: (await generativeModel.countTokens(refinePrompt)).totalBillableCharacters,
              output_characters: (await generativeModel.countTokens({ contents: queryResponse.candidates[0].content })).totalBillableCharacters
            }
          )
        )
      );
    } catch (error) {
      console.error("Error during refinement:", error);
    }
  });

  socket.on('connect', () => {
    console.log("Connected!");
    socket.broadcast.emit('my response', {
      data: 'Connected To Node Server'
    });
  });

  socket.on('disconnect', () => {
    console.log("Disconnected!");
    socket.broadcast.emit('my response', {
      data: 'Disconnected'
    });
  });
});

const PORT = process.env.PORT ? process.env.PORT : 5001;

server.listen(PORT, () => {
  console.log("Listening on: ", PORT);
});