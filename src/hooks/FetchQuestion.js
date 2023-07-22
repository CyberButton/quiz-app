import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
// import data, { answers } from "../database/data";

/** redux actions */
import * as Action from '../redux/question_reducer'
import { setNameOfMCQ } from "../redux/result_reducer";

/** fetch question hook to fetch api data and set value to store */
export const useFetchQuestion = (setIsLoading) => {
    const dispatch = useDispatch();   
    const [getData, setGetData] = useState({serverError: null});    
    
    const IDOFMCQ = useSelector(state => state.temp.IDOFMCQ)

    useEffect(() => {
        setIsLoading(true)

        /** async function fetch backend data */
        const fetch = async () => {
            try {
                setIsLoading(true)
                //let question = await data;
                //const serverData = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data)
                
                //const amir = serverData.find((item) => item._id === IDOFMCQ._id)
                
                console.log("1")

                const { questions, answers, nameOfMCQ } = IDOFMCQ
                console.log('questions', questions)

                if(questions.length){
                    setIsLoading(false);
                    dispatch(setNameOfMCQ(nameOfMCQ))
                    /** dispatch an action */
                    dispatch(Action.startExamAction({question : questions, answers}))
                }

            } catch (error) {
                setIsLoading(false);
                setGetData(prev => ({...prev, serverError : error}));
            }
        }
        fetch();
    }, [dispatch, setIsLoading, IDOFMCQ]);

    return [getData, setGetData];
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