import React from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function ResultTable() {

    const { result } = useSelector(state => state.result)
    const questions = useSelector(state => state.temp.IDOFMCQ).questions
    // correct answers
    const answers = useSelector(state => state.questions.answers)

    const { t } = useTranslation();

    return (
        <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>{t("questions")}</td>
                        <td>{t("correct answers")}</td>
                        <td>{t("submitted answers")}</td>
                    </tr>
                </thead>
                <tbody>
                    {questions
                        .map((v, i) => (
                            <tr className='table-body' key={i}>
                                <td><strong>{v.question}</strong></td>
                                <td>{v.options[Number(answers[i])]}</td>
                                <td style={{ color: `${v.options[Number(answers[i])] === v.options[Number(result[i])] ? "green" : "#ff2a66"}` }}>{v.options[Number(result[i])] || "--"}</td>
                            </tr>
                        ))}

                </tbody>
            </table>
        </div>
    )
}
