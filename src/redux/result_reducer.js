import { createSlice } from "@reduxjs/toolkit"

export const resultReducer = createSlice({
    name: 'result',
    initialState : {
        userId : null,
        result : [],
        nameOfMCQ : null
    },
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload
        },
        pushResultAction : (state, action) => {
            state.result.push(action.payload)
        },
        updateResultAction : (state, action) => {
            const { trace, checked } = action.payload;
            state.result.fill(checked, trace, trace + 1)
        },
        setNameOfMCQ : (state, action) => {
            state.nameOfMCQ = action.payload
        },
        resetResultAction : () => {
            return {
                userId : null,
                result : [],
                nameOfMCQ : null
            }
        }
    }
})

export const { setUserId, pushResultAction, resetResultAction, updateResultAction, setNameOfMCQ } = resultReducer.actions;

export default resultReducer.reducer;
