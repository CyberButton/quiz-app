// Main.js
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserId } from '../redux/result_reducer';
import '../styles/Main.css';

export default function Main() {
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    function startQuiz() {
        if (inputRef.current?.value) {
            dispatch(setUserId(inputRef.current?.value));
        }
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>AI Quiz Application</h1>

            <ol>
                <li>Log in with your Username.</li>
                <li>Select one of your previously generated quizzes.</li>
                <li>Or make a new AI generated quiz.</li>
                <li>Name your quiz, provide source and number of questions you want.</li>
                <li>Good luck on taking your AI quizzes!</li>
            </ol>

            <form id="form">
                <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
            </form>

            <div className='start container-pohuy'>
                {/* <Link className='btn' to={'select'} onClick={startQuiz}>Start Quiz</Link> */}
                <button className='btn'><Link to={'select'} onClick={startQuiz}>Start Quiz</Link></button>
            </div>
        </div>
    );
}
