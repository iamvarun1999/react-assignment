import { createSlice } from "@reduxjs/toolkit";
import { TOKEN } from "../../Modals/Modals";

let initialState: TOKEN = {
    token: null
}

export const loginDataSlice = createSlice({
    name: 'LoginToken',
    initialState,
    reducers: {
        updateToken: (state, action) => {
            state.token = action.payload.token
        }
    }

})

export const { updateToken } = loginDataSlice.actions