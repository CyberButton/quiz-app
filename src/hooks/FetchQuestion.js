import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

/** redux actions */
import * as Action from '../redux/question_reducer'
import { setNameOfMCQ } from "../redux/result_reducer";

/** fetch question hook to fetch api data and set value to store */
export const useFetchQuestion = (isLoading, setIsLoading, serverError, setServerError) => {
    const dispatch = useDispatch();
    const IDOFMCQ = useSelector(state => state.temp.IDOFMCQ)

    useEffect(() => {
        setIsLoading(true);

        /** async function fetch backend data */
        const fetch = async () => {
            try {
                setIsLoading(true);

                const { questions, answers, nameOfMCQ } = IDOFMCQ

                if (questions.length) {
                    setIsLoading(false);
                    dispatch(setNameOfMCQ(nameOfMCQ))
                    /** dispatch an action */
                    dispatch(Action.startExamAction({ question: questions, answers }))
                }

            } catch (error) {
                setIsLoading(false);
                console.log(isLoading)
                console.log(error)
                setServerError(error)
                console.log(serverError)
            }
        }
        fetch();
    }, [dispatch, setIsLoading, IDOFMCQ]);

    return [];
}


/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.log(error)
    }
}