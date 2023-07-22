import React, { useEffect, useState } from 'react'
import { getServerData } from '../helper/helper'
import { useSelector } from 'react-redux';

export default function ResultTable() {

    const [data, setData] = useState([]);
    const userId = useSelector(state => state.result.userId)

    useEffect(() => {
      const delay = setTimeout(() => {
        getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/results`, (res) => {
          setData(res);
        });
      }, 1000);
    
      return () => clearTimeout(delay); // Cleanup function to clear the timeout on unmounting
    }, []);
    
    console.log(data)
    //console.log(data)

  return (
    <div>
        <table>
            <thead className='table-header'>
                <tr className='table-row'>
                    <td>Attempted Questions</td>
                    <td>Correct Answers</td>
                    <td>Result</td>
                </tr>
            </thead>
            <tbody>
                { !data ?? <div>NO DATA FOUND</div>}
                { 
                data
                .filter((v) => v.username === userId) // Filter the data by the specific username
                .map((v, i) => (
                <tr className='table-body' key={i}>
                <td>{v.attempts || 0}</td>
                <td>{v.correct || 0}</td>
                <td>{v.achived || ""}</td>
            </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}
