import React, { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/Main.css';
import { CallGenerativeAPI } from '../hooks/generateQuestions';
import { useSelector, useDispatch } from 'react-redux';

import FROM_TEXT_en from '../images/FROM_TEXT_en.png'
import FROM_KEY_WORDS_en from '../images/FROM_KEY_WORDS_en.png'
import FROM_TEXT_ru from '../images/FROM_TEXT_ru.png'
import FROM_KEY_WORDS_ru from '../images/FROM_KEY_WORDS_ru.png'

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export default function Generate() {

  const userId = useSelector(state => state.result.userId);
  const dispatch = useDispatch();

  const prompt = useRef(null);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [sourceType, setSourceType] = useState('full text'); // Default value is 'full text'
  const nameOfMCQ = useRef(null);

  const [go, setGo] = useState(false);
  const [loading, setLoading] = useState(false); // New state for the loading screen

  const { t } = useTranslation();

  let imageSrc;
  if (sourceType === 'key words') {
    imageSrc = i18next.language === 'en' ? FROM_KEY_WORDS_en : FROM_KEY_WORDS_ru;
  } else if (sourceType === 'full text') {
    imageSrc = i18next.language === 'en' ? FROM_TEXT_en : FROM_TEXT_ru;
  }

  const startQuiz = async () => {
    console.log('start quiz 1');

    if (
      prompt.current?.value &&
      nameOfMCQ.current?.value &&
      selectedNumber !== ''
    ) {

      const resultData = {
        prompt: prompt.current.value,
        numberOfMCQ: selectedNumber,
        sourceType: sourceType,
        userID: userId,
        nameOfMCQ: nameOfMCQ.current.value,
        lang: i18next.language
      };

      // Show the loading screen
      setLoading(true);

      await CallGenerativeAPI(resultData, dispatch);

      setGo(true);
    }
  };

  const handleDropdownChange = event => {
    setSelectedNumber(event.target.value);
  };

  if (go) {
    return <Navigate to={{ pathname: '/quiz' }} replace={true}></Navigate>;
  }

  const headerStyle = {
    textAlign: 'center', // Align text to the most left
    color: 'white',
    padding: '20px',
    margin: '0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 1)',
  };

  const optionStyle = {
    textAlign: 'center', // Align text to the most left
    color: 'white',
    marginLeft: '20px',
    marginTop: '25px'
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
    },
    label: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
      marginTop: '30px',
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
      <h1 className="title text-light">{t("new ai generated quiz")}</h1>

      <h2 style={headerStyle}>{t("provide data for ai")}</h2>

      <form id="form">
        <input ref={nameOfMCQ} className="userid" type="text" placeholder={t("name your quiz")} />
      </form>

      <div style={styles.container}>
        <label style={styles.label}>{t("how many questions?")}</label>
        <select value={selectedNumber} onChange={handleDropdownChange} style={styles.select}>
          <option value="">{t("choose a number")}</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        {selectedNumber && <p style={styles.selected}>{"you selected"} {selectedNumber}</p>}
      </div>

      {/* Switch for Source Type */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <label style={styles.label}>{t("source type")}:</label>
        <label style={optionStyle}>
          <input
            type="radio"
            name="sourceType"
            value="full text"
            onChange={(e) => setSourceType(e.target.value)}
            checked={sourceType === 'full text'}
          />{' '}
          {t("full text")}
        </label>
        <label style={optionStyle}>
          <input
            type="radio"
            name="sourceType"
            value="key words"
            onChange={(e) => setSourceType(e.target.value)}
            checked={sourceType === 'key words'}
          />{' '}
          {t("key words")}
        </label>
      </div>

      {/* Images to illustrate each method */}
      <div style={{ display: 'flex' }}>
        {/* Display the Key Words image if 'key words' is selected */}
        {sourceType === 'key words' && (
          <div style={{ maxWidth: '70vw', maxHeight: '70vh' }}>
            <img src={imageSrc} alt="Key Words Example" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        )}
        {/* Display the Full Text image if 'full text' is selected */}
        {sourceType === 'full text' && (
          <div style={{ maxWidth: '70vw', maxHeight: '70vh' }}>
            <img src={imageSrc} alt="Full Text Example" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        )}
      </div>

      <form id="form">
        <input ref={prompt} className="userid" type="text" placeholder={(sourceType === 'key words' ? t("write key words") : t("copy & paste"))} />
      </form>

      <div className="start container-pohuy">
        <button className="btn" onClick={startQuiz}>
          {t("generate quiz")}
        </button>
      </div>
    </div>
  );
}
