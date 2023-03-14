import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  isUserLoggedIn: false
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserLogin: (state, action)=>{
      state.isUserLoggedIn = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUserLogin} = loginSlice.actions
export const selectIsUserLogged = (state) => state.LoginReducer.isUserLoggedIn
export default loginSlice.reducer