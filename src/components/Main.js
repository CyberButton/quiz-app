// Main.js
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserId } from '../redux/result_reducer';
import '../styles/Main.css';
import { useTranslation } from 'react-i18next';

export default function Main() {

    const { t, i18n } = useTranslation();

    const changeLanguage = (languange) => {
        i18n.changeLanguage(languange);
    };

    const inputRef = useRef(null);
    const dispatch = useDispatch();

    function startQuiz() {
        if (inputRef.current?.value) {
            dispatch(setUserId(inputRef.current?.value));
        }
    }

    return (
        <div className='container'>

            {/* Language Selector */}
            <div className='language-selector'>
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('ru')}>Русский</button>
                {/* <button onClick={() => changeLanguage('kz')}>Қазақша</button> */}
            </div>

            <h1 className='title text-light'>{t("main title")}</h1>

            <ol>
                <li>{t("list1")}</li>
                <li>{t("list2")}</li>
                <li>{t("list3")}</li>
                <li>{t("list4")}</li>
                <li>{t("list5")}</li>
            </ol>

            <form id="form">
                <input ref={inputRef} className="userid" type="text" placeholder={t("username")} />
            </form>

            <div className='start container-pohuy'>
                <Link className='btn' to={'select'} onClick={startQuiz}>{t("start button")}</Link>
                {/* <button className='btn' onClick={startQuiz}><Link to={'select'}>{t("start button")}</Link></button> */}
            </div>
        </div>
    );
}
