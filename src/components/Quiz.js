import React, { useState } from 'react'
import Questions from './Questions'

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';

/** redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next';

export default function Quiz() {

    const [check, setChecked] = useState(undefined)

    const result = useSelector(state => state.result.result);
    const nameOfMCQ = useSelector(state => state.result.nameOfMCQ);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch()

    // Calculate the current question number
    const currentQuestion = trace + 1;
    const totalQuestions = queue.length;

    const { t } = useTranslation();

    /** next button event handler */
    function onNext() {
        if (trace < queue.length) {
            /** increase the trace value by one using MoveNextAction */
            dispatch(MoveNextQuestion());

            /** insert a new result in the array.  */
            if (result.length <= trace) {
                dispatch(PushAnswer(check))
            }
        }

        /** reset the value of the checked variable */
        setChecked(undefined)
    }

    /** Prev button event handler */
    function onPrev() {
        if (trace > 0) {
            /** decrease the trace value by one using MovePrevQuestion */
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check) {
        setChecked(check)
    }

    /** finished exam after the last question */
    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true}></Navigate>
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>{nameOfMCQ}</h1>

            {/* Display the current question number */}
            <p className='text-light'>{t("current question")} {currentQuestion}/{totalQuestions}</p>

            {/* display questions */}
            <Questions onChecked={onChecked} />

            <div className='grid'>
                {trace > 0 ? <button className='btn prev' onClick={onPrev}>{t("prev")}</button> : <div></div>}
                <button className='btn next' onClick={onNext}>{t("next")}</button>
            </div>
        </div>
    )
}
