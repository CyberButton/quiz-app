import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function ResultTable() {
  
    const { result } = useSelector(state => state.result)
    const questions = useSelector(state => state.temp.IDOFMCQ).questions
    // correct answers
    const answers = useSelector(state => state.questions.answers)

    console.log(questions)

    // useEffect(() => {
    //   const delay = setTimeout(() => {
    //     getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/results`, (res) => {
    //       setData(res);
    //     });
    //   }, 1000);
    
    //   return () => clearTimeout(delay); // Cleanup function to clear the timeout on unmounting
    // }, []);
    
    // console.log(data)

  return (
    <div>
        <table>
            <thead className='table-header'>
                <tr className='table-row'>
                    <td>Questions</td>
                    <td>Correct Answers</td>
                    <td>Submitted Answer</td>
                </tr>
            </thead>
            <tbody>
                { questions
                .map((v, i) => (
                <tr className='table-body' key={i}>
                <td><strong>{v.question}</strong></td>
                <td>{v.options[Number(answers[i])]}</td>
                <td style={{ color : `${v.options[Number(answers[i])] === v.options[Number(result[i])] ? "green" : "#ff2a66" }` }}>{v.options[Number(result[i])] || "--"}</td>
            </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}
