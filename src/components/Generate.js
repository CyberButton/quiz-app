import React, { useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import '../styles/Main.css'
import { CallGenerativeAPI } from '../hooks/generateQuestions'
import { useSelector, useDispatch } from 'react-redux'


export default function Generate() {
    const userId = useSelector(state => state.result.userId)
    const dispatch = useDispatch()

    const prompt = useRef(null)
    const [selectedNumber, setSelectedNumber] = useState('');
    const sourceType = useRef(null)
    const nameOfMCQ = useRef(null)

    const [go, setGo] = useState(false)

    const startQuiz = () => {

        console.log("start quiz 1")

        if(prompt.current?.value && sourceType.current?.value && nameOfMCQ.current?.value && (selectedNumber !== '')){
        // const prompt = (prompt.current?.value)
        // function needs { promt, numberOfMCQ, sourceType, userID, nameOfMCQ }
        
        console.log(userId)

        const resultData = {
            prompt: prompt.current.value,
            numberOfMCQ: selectedNumber,
            sourceType: sourceType.current.value,
            userID: userId,
            nameOfMCQ: nameOfMCQ.current.value
          };

        console.log("start quiz 2")
        
        CallGenerativeAPI(resultData, dispatch)
        
        console.log("start quiz 3")
        
        setGo(true)

        console.log("start quiz 4")
        }
    }

    const handleDropdownChange = (event) => {
        setSelectedNumber(event.target.value);
      };

    if(go) {
        return <Navigate to={{ pathname: '/quiz'}} replace={true}></Navigate>
    }

    return (

        <div className="container">
            <h1 className='title text-light'>Quiz Application</h1>

            <ul>
                <li>Enter the source from wich to make new set of questions</li>
            </ul>

            <form id="form">
            <input ref={nameOfMCQ} className="userid" type="text" placeholder='Name your quiz*' />
            </form>

            <form id="form">
            <input ref={sourceType} className="userid" type="text" placeholder='Source type*' />
            </form>

            <div>
            <label>Select a number:</label>
            <select value={selectedNumber} onChange={handleDropdownChange}>
                <option value="">Choose a number</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
            {selectedNumber && <p>You selected: {selectedNumber}</p>}
            </div>

            <form id="form">
            <input ref={prompt} className="userid" type="text" placeholder='Source to make quiestions go here*' />
            </form>

            <div className='start'>
            <button className='btn' onClick={startQuiz}>Generate Quiz</button>
        </div>

        </div>
    )

}