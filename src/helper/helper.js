import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios'

export function attempts_Number(result) {
  return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point) {
  return result.map((element, i) => answers[i] === element).filter(i => i).map(i => point).reduce((prev, curr) => prev + curr, 0);
}

export function flagResult(totalPoints, earnPoints) {
  return (totalPoints / 2) < earnPoints; /** earn 50% marks */
}

/** check user auth  */
export function CheckUserExist({ children }) {
  const auth = useSelector(state => state.result.userId)
  return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

/** get server data */
export async function getServerData(url, callback) {
  const data = (await (axios.get(url))).data;
  return callback ? callback(data) : data
}

export async function postServerData(url, result, callback) {
  try {
    const response = await axios.post(url, result);
    const data = response.data;
    return callback ? callback(data) : data;
  } catch (error) {
    console.error('Error in postServerData:', error);
    return null; // Return a default value or handle the error in your component
  }
}

export async function deleteServerData(url, callback) {
  try {
    const response = await axios.delete(url);
    const data = response.data;
    return callback ? callback(data) : data;
  } catch (error) {
    console.error('Error in deleteServerData:', error);
    return null; // Return a default value or handle the error in your component
  }
}