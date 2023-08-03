//import React, { useEffect } from 'react'
import '../styles/Result.css';
import { Link } from 'react-router-dom';

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

/** import actions  */
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { resetIDOFMCQ } from '../redux/temp_reducer'
import { generatePDF } from '../hooks/generatePDFs';

/**pdf */
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

import { useTranslation } from 'react-i18next';


export default function Result() {

    const dispatch = useDispatch()
    const { questions : { queue ,answers}, result : { result, userId, nameOfMCQ}}  = useSelector(state => state)

    const totalPoints = queue.length; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 1)
    const flag = flagResult(totalPoints, earnPoints)

    const { t } = useTranslation();

    //useEffect(() => {
        // PublishResults({
        //     results : result, 
        //     username : userId, 
        //     attempts, 
        //     correct: earnPoints, 
        //     achived: flag ? "Passed" : "Failed",
        //     nameOfMCQ: nameOfMCQ
        // })
        // console.log(nameOfMCQ)
    //}, [])

    function onRestart(){
        dispatch(resetAllAction())
        dispatch(resetResultAction())
        dispatch(resetIDOFMCQ())
    }

    Font.register({
      family: "Roboto",
      src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
    });

    const styles = StyleSheet.create({
        page: {
          padding: 40,
        },
        header: {
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 20,
          fontFamily : "Roboto"
        },
        questionContainer: {
          marginBottom: 20,
        },
        question: {
          fontSize: 15,
          fontWeight: 'bold',
          marginBottom: 10,
          fontFamily : "Roboto"
        },
        option: {
          fontSize: 12,
          marginBottom: 5,
          fontFamily : "Roboto"
        },
        correctAnswersContainer: {
          marginTop: 40,
        },
        correctAnswersTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 10,
          fontFamily : "Roboto"
        },
        correctAnswer: {
          fontSize: 12,
          marginBottom: 5,
          fontFamily : "Roboto"
        },
      });
      
      const PdfDocument = () => {
        const optionLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      
        return (
          <Document>
            <Page style={styles.page}>
              <View style={styles.header}>
                <Text >{nameOfMCQ}</Text>
              </View>
      
              {queue.map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                  <Text style={styles.question}>{`${index + 1}. ${question.question}`}</Text>
                  {question.options.map((option, optIndex) => (
                    <Text key={optIndex} style={styles.option}>
                      {`${optionLetters[optIndex]}) ${option}`}
                    </Text>
                  ))}
                </View>
              ))}
      
              <View style={styles.correctAnswersContainer}>
                <Text style={styles.correctAnswersTitle}>{t("list of correct answers")}:</Text>
                {queue.map((question, index) => (
                  <Text key={index} style={styles.correctAnswer}>
                    {`${index + 1}. ${optionLetters[answers[index]]}) ${question.options[answers[index]]}`}
                  </Text>
                ))}
              </View>
            </Page>
          </Document>
        );
      };
      
      

    // function onDownload(){
    //     const questions = queue
    //     generatePDF({questions, answers})
    // }

  return (
    <div className='container'>
        <h1 className='title text-light'>{t("quiz results")}</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>{t("username r")}</span>
                <span className='bold'>{userId}</span>
            </div>
            <div className='flex'>
                <span>{t("number of questions r")}</span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>{t("attempted questions")}</span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>{t("correct answers")}</span>
                <span className='bold'>{earnPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>{t("quiz result")}</span>
                <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }} className='bold'>{flag ? t("passed") : t("failed")}</span>
            </div>
        </div>

        <div className="start container-pohuy-2">
            <div onClick={onRestart}>
            <Link className='btn' to={'/'}>{t("restart")}</Link>
            </div>
            {/* Use PDFDownloadLink to download the PDF */}
            <PDFDownloadLink className='btn' document={<PdfDocument />} fileName={nameOfMCQ}>
            {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : t("download pdf")
            }
            </PDFDownloadLink>
        </div>

        <div className="container">
            {/* result table */}
            <ResultTable></ResultTable>
        </div>
    </div>
  )
}
