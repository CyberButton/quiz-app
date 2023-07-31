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
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export default function Result() {

    const dispatch = useDispatch()
    const { questions : { queue ,answers}, result : { result, userId, nameOfMCQ}}  = useSelector(state => state)

    const totalPoints = queue.length; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 1)
    const flag = flagResult(totalPoints, earnPoints)

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

    const styles = StyleSheet.create({
        page: {
          padding: 40,
        },
        header: {
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 20,
        },
        questionContainer: {
          marginBottom: 20,
        },
        question: {
          fontSize: 15,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        option: {
          fontSize: 12,
          marginBottom: 5,
        },
        correctAnswersContainer: {
          marginTop: 40,
        },
        correctAnswersTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        correctAnswer: {
          fontSize: 12,
          marginBottom: 5,
        },
      });
      
      const PdfDocument = () => {
        const optionLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      
        return (
          <Document>
            <Page style={styles.page}>
              <View style={styles.header}>
                <Text>{nameOfMCQ}</Text>
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
                <Text style={styles.correctAnswersTitle}>List of Correct Answers:</Text>
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
        <h1 className='title text-light'>Quiz Results</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>Username</span>
                <span className='bold'>{userId}</span>
            </div>
            <div className='flex'>
                <span>Number of Questions</span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Attempted Questions</span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>Correct Answers</span>
                <span className='bold'>{earnPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Quiz Result</span>
                <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }} className='bold'>{flag ? "Passed" : "Failed"}</span>
            </div>
        </div>

        <div className="start container-pohuy-2">
            <button className='btn'><Link to={'/'}>Restart</Link></button>
            {/* Use PDFDownloadLink to download the PDF */}
            <button className='btn'>
            <PDFDownloadLink document={<PdfDocument />} fileName="AIquiz.pdf">
            {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download PDF'
            }
            </PDFDownloadLink>
            </button>
        </div>

        <div className="container">
            {/* result table */}
            <ResultTable></ResultTable>
        </div>
    </div>
  )
}
