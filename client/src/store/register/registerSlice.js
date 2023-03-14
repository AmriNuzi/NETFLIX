import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isUserRegister: false
  }

export const registerSlice = createSlice({
    name:'register',
    initialState,
    reducers: {
        setUserRegister: (state, action)=>{
            state.isUserRegister = action.payload
        }
    }
})


export const {setUserRegister} = registerSlice.actions
export const selectIsUserRegister = (state) => state.RegisterReducer.isUserRegister
export default registerSlice.reducer