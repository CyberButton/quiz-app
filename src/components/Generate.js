import React, { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/Main.css';
import { CallGenerativeAPI } from '../hooks/generateQuestions';
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function Generate() {
  const userId = useSelector(state => state.result.userId);
  const dispatch = useDispatch();

  const prompt = useRef(null);
  const [selectedNumber, setSelectedNumber] = useState('');
  const sourceType = useRef(null);
  const nameOfMCQ = useRef(null);

  const [go, setGo] = useState(false);
  const [loading, setLoading] = useState(false); // New state for the loading screen

  const startQuiz = async () => {
    console.log('start quiz 1');

    if (
      prompt.current?.value &&
      sourceType.current?.value &&
      nameOfMCQ.current?.value &&
      selectedNumber !== ''
    ) {
      // const prompt = (prompt.current?.value)
      // function needs { promt, numberOfMCQ, sourceType, userID, nameOfMCQ }

      console.log(userId);

      const resultData = {
        prompt: prompt.current.value,
        numberOfMCQ: selectedNumber,
        sourceType: sourceType.current.value,
        userID: userId,
        nameOfMCQ: nameOfMCQ.current.value,
      };

      console.log('start quiz 2');

      // Show the loading screen
      setLoading(true);

      await CallGenerativeAPI(resultData, dispatch);

      console.log('start quiz 3');

      setGo(true);

      console.log('start quiz 4');
    }
  };

  const handleDropdownChange = event => {
    setSelectedNumber(event.target.value);
  };

  if (go) {
    return <Navigate to={{ pathname: '/quiz' }} replace={true}></Navigate>;
  }

  const headerStyle = {
    //textAlign: 'left', // Align text to the most left
    color: 'white',
    padding: '20px',
    margin: '0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
    },
    label: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: 'white',
    },
    select: {
      padding: '8px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      outline: 'none',
      cursor: 'pointer',
    },
    selected: {
      marginTop: '10px',
      fontSize: '16px',
      color: 'white',
    },
  };

  return (
    <div className="container">
              {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              border: '4px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              borderTop: '4px solid #ffffff',
              width: '50px',
              height: '50px',
              animation: 'spin 2s linear infinite',
            }}
          ></div>
          {/* Keyframes for the spin animation */}
          <style>
            {`
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </div>
      )}
      <h1 className="title text-light">New AI Generated Quiz</h1>

      <h2 style={headerStyle}>Provide data for AI to generate a new quiz</h2>

      <form id="form">
        <input ref={nameOfMCQ} className="userid" type="text" placeholder="Name your quiz*" />
      </form>

      <form id="form">
        <input ref={sourceType} className="userid" type="text" placeholder="Source type*" />
      </form>

      <div style={styles.container}>
        <label style={styles.label}>How many questions do you want?</label>
        <select value={selectedNumber} onChange={handleDropdownChange} style={styles.select}>
          <option value="">Choose a number</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        {selectedNumber && <p style={styles.selected}>You selected: {selectedNumber}</p>}
      </div>

      <form id="form">
        <input ref={prompt} className="userid" type="text" placeholder="Source to make quiestions go here*" />
      </form>

      <div className="start">
        <button className="btn" onClick={startQuiz}>
          Generate Quiz
        </button>
      </div>
    </div>
  );
}
