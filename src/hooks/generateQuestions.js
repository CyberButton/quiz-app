import { postServerData } from '../helper/helper';
import { setIDOFMCQ } from '../redux/temp_reducer';

export const CallGenerativeAPI = async (resultData, dispatch) => {

    try {
        const newQuiz = await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/mcq-gen`, resultData, data => data)
        dispatch(setIDOFMCQ(newQuiz))
    } catch (error) {
        console.log(error)
    }
}