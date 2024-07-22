import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';

function GenerativeLogo(){
    const search = false;
    const SVG = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="248" height="248" viewBox="0 0 248 248" fill="none">
        {/* SVG content here */}
      </svg>
    );
    return (
      <div style={{display:'flex',flexDirection:'column', alignItems:'center',height:'90%',width:'100%'}}>
        {SVG()}
      </div>
    );
}

function LandingPage (){
  const [selectedRole, setSelectedRole] = useState('');
  const [labelInput, setLabelInput] = useState('');
  const [debouncedLabelInput, setDebouncedLabelInput] = useState('');

  const handleOptionClick = (option) => {
      setSelectedRole(option);
      console.log(`Selected role: ${option}`);
  };

  const handleInputChange = (event) => {
      setLabelInput(event.target.value);
  };

  const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          setDebouncedLabelInput(labelInput);
          console.log(`Label input recorded: ${labelInput}`);
      }
  };

  const docs = [
      {
          title: 'No Code Prompt Tuning',
          model: 'Vertex AI Generative AI Studio',
          description:
              'No code prompt tuning of foundational model with generated Python code for engineer hand off.',
          doc: 'https://cloud.google.com/vertex-ai/docs/generative-ai/learn/generative-ai-studio',
      },
      {
          title: 'Generative Summarization',
          model: 'gemini-pro',
          description:
              'Multi-modal model by Google. Used to generate summaries for each dashboard query and stream the results to the extension',
          doc: 'https://cloud.google.com/vertex-ai/docs/generative-ai/start/quickstarts/quickstart-multimodal',
      },
  ];

  return (
      <>
          <div
              style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  zIndex: 1,
                  overflowY: 'scroll'
              }}
          >
              <DropdownMenu selectedOption={selectedRole} handleOptionClick={handleOptionClick} />
              <label>
                  What are the actions you wanna take from this dashboard? What questions are you asking?  
                  <input
                      value={labelInput}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                  />
              </label>
              {docs.map((doc, index) => (
                  <a
                      href={doc.doc}
                      style={{ textDecoration: 'none' }}
                      target="_blank"
                      rel="noreferrer"
                      key={index}
                  >
                      <div
                          style={{
                              cursor: 'pointer',
                              width: '70vw',
                              maxWidth: '75vw',
                              height: 'auto',
                              marginTop: '2rem',
                          }}
                          className="summaryCard"
                      >
                          <div
                              style={{
                                  width: 'auto',
                                  height: 'auto',
                                  borderRight: '1px solid #ccc',
                                  display:'flex',
                                  flexDirection: 'column',
                                  justifyContent:'center'
                              }}
                          >
                              <img
                                  height="auto"
                                  width={60}
                                  src={
                                      index === 0
                                          ? 'https://lh3.googleusercontent.com/-1brN-k2sapOWO4gfdJKGEH8kZbfFjrzEMjNs1dl4u64PBH-yxVmB5vG2aHDatRudSByL3lwViUg1w'
                                          : 'https://lh3.googleusercontent.com/-1brN-k2sapOWO4gfdJKGEH8kZbfFjrzEMjNs1dl4u64PBH-yxVmB5vG2aHDatRudSByL3lwViUg1w'
                                  }
                              />
                          </div>
                          <div
                              style={{
                                  paddingTop: '0.2rem',
                                  paddingLeft: '1rem',
                                  width: '80%',
                                  height: 'auto',
                                  display: 'flex',
                                  flexDirection: 'column',
                              }}
                          >
                              <span
                                  style={{
                                      height: 'auto',
                                      fontSize: '1vh',
                                      fontWeight: 'bold',
                                      fontFamily: 'sans-serif',
                                      letterSpacing: '0.01rem',
                                      display: 'block',
                                      textAlign: 'left',
                                      width: '100%',
                                      color: 'black',
                                      border: 'none',
                                  }}
                              >
                                  {doc.title}
                              </span>
                              <p
                                  style={{ color: 'rgb(26, 115, 232)', fontSize: '0.8vh', margin: 0 }}
                              >
                                  {doc.model}
                              </p>
                              <p
                                  style={{
                                      fontSize: '0.9vh',
                                      width: 'auto',
                                      height: 'auto',
                                      color: 'black',
                                      opacity: 0.8,
                                  }}
                              >
                                  {doc.description}
                              </p>
                          </div>
                      </div>
                  </a>
              ))}
              <div style={{
                  position:'absolute',
                  bottom:'2rem',
                  right:'2rem'
              }}>
              </div>
          </div>
      </>
  );
}

export { GenerativeLogo, LandingPage };