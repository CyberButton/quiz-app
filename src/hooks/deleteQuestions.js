import { deleteServerData } from "../helper/helper"

export const deleteQuestion = async(quizId) => {
    try {
        console.log("inside hook")
        await deleteServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions/${quizId}`, data => data)            
    } catch (error) {
        console.log(error)
    }
}