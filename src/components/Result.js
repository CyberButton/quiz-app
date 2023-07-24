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
import { PublishResults } from '../hooks/setResult';


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

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Results</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>Username</span>
                <span className='bold'>{userId}</span>
            </div>
            <div className='flex'>
                <span>Number of Qusetions</span>
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

        <div className="start">
            <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
        </div>

        <div className="container">
            {/* result table */}
            <ResultTable></ResultTable>
        </div>
    </div>
  )
}
