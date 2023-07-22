import { postServerData } from '../helper/helper';
import { setIDOFMCQ } from '../redux/temp_reducer';

export const CallGenerativeAPI = async (resultData, dispatch) => {
    console.log("callgen 1")

    try {
        const newQuiz = await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/mcq-gen`, resultData, data => data)
        console.log("callgen 2")

        dispatch(setIDOFMCQ(newQuiz))
        console.log(newQuiz)

        console.log("callgen 3")
    } catch (error) {
        console.log(error)
    }
}