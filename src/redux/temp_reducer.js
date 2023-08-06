import { createSlice } from "@reduxjs/toolkit";

/** create reducer */
export const tempReducer = createSlice({
    name: 'temp',
    initialState: {
        IDOFMCQ: {}
    },
    reducers: {
        setIDOFMCQ: (state, action) => {
            state.IDOFMCQ = action.payload
        },
        resetIDOFMCQ: () => {
            return {
                IDOFMCQ: {}
            }
        }
    }
})

export const { setIDOFMCQ, resetIDOFMCQ } = tempReducer.actions;

export default tempReducer.reducer;