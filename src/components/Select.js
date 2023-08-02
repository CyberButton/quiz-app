import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { getServerData } from '../helper/helper'
import { setIDOFMCQ } from '../redux/temp_reducer'
import { deleteQuestion } from '../hooks/deleteQuestions'
import { resetAllAction } from '../redux/question_reducer';
import { resetResultActionExceptName } from '../redux/result_reducer'
import { resetIDOFMCQ } from '../redux/temp_reducer'
import { useTranslation } from 'react-i18next'


export default function Select() {

    const [go, setGo] = useState(0)
    const [serverData, setServerData] = useState([]);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.result.userId)  
    const { t } = useTranslation();
          
    const fetchData = async () => {
      try {
        const data = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`);
        setServerData(data);
        console.log(serverData)
      } catch (error) {
        console.error(error);
      }
    };

        useEffect(() => {   
          fetchData();
        }, []);
        
        function onNewClick() {
            console.log("click new quiz")
            dispatch(resetAllAction())
            dispatch(resetResultActionExceptName())
            dispatch(resetIDOFMCQ())
            setGo(2);
        }
    
        if(go === 1) {
            return <Navigate to={{ pathname: '/quiz'}} replace={true}></Navigate>
        }

        if(go === 2) {
          return <Navigate to={{ pathname: '/generate'}} replace={true}></Navigate>
        }

        const handleQuestionClick = (item) => {
            dispatch(setIDOFMCQ(item))
            console.log(item)
            // console.log(IDOFMCQ)
            setGo(1)
          };

          const headerStyle = {
            textAlign: 'left', // Align text to the most left
            color: 'white',
            padding: '20px',
            margin: '0',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          };

          
      // Function to delete a quiz by its ID
  const handleDeleteQuiz = (quizId) => {
    const confirmed = window.confirm('Are you sure you want to delete this quiz?');
    if (confirmed) {
      try {
        console.log(quizId)
        // Make the DELETE request to the server
        deleteQuestion(quizId)
        
      // Wait for 1 second before refreshing the data
      setTimeout(() => {
        fetchData();
      }, 1000); // 1000 milliseconds = 1 second

      } catch (error) {
        console.error(error);
      }
    }
  };

//     return(
//         <div className="container">
//             <h1 className='title text-light'>Select Quiz/Generate New Quiz</h1>

//             <div className='start'>
//                 <button className='btn' onClick={onNewClick}>Start New Quiz</button>
//             </div>
        
//         <h2 style={headerStyle}>List of Questions</h2>
        

//         <table>
//   <thead className='table-header'>
//     <tr className='table-row'>
//       <td>quiz name</td>
//       <td>number of questions</td>
//     </tr>
//   </thead>
//   <tbody>
//     {serverData.length === 0 ? (
//       <tr className='table-body'>
//         <td colSpan="2">NO DATA FOUND</td>
//       </tr>
//     ) : (
//       serverData
//         .filter((v) => v.userID === userId)
//         .map((v, i) => (
//           <tr className='table-body' key={i}>
//             <td>
//               <a href="#" onClick={() => handleQuestionClick(v)}>
//                 {v.nameOfMCQ}
//               </a>
//             </td>
//             <td>{v.numberOfMCQ || 0}</td>
//           </tr>
//         ))
//     )}
//   </tbody>
// </table>


//         </div>
//     )





return (
  <div className="container">
    <h1 className='title text-light'>{t("select/generate quiz")}</h1>

<div className='start'>
    <button className='btn' onClick={onNewClick}>{t("generate quiz button")}</button>
</div>

<h2 style={headerStyle}>{t("list of questions")}</h2>

    <table>
    <thead className='table-header'>
    <tr className='table-row'>
      <td>{t("quiz name")}</td>
      <td>{t("number of questions")}</td>
      <td>{t("delete")}</td>
    </tr>
  </thead>
      <tbody>
        {serverData.length === 0 ? (
          <tr className='table-body'>
            <td colSpan="2">{t("no data")}</td>
          </tr>
        ) : (
          serverData
            .filter((v) => v.userID === userId)
            .map((v, i) => (
              <tr className='table-body' key={i}>
                <td>
                  <a href="#" onClick={() => handleQuestionClick(v)}>
                    {v.nameOfMCQ}
                  </a>
                </td>
                <td>{v.numberOfMCQ || 0}</td>
                {/* Add the delete button */}
                <td>
                  <button onClick={() => handleDeleteQuiz(v._id)}>X</button>
                </td>
              </tr>
            ))
        )}
      </tbody>
    </table>
  </div>
);

}