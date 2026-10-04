import {createSlice} from '@reduxjs/toolkit'

//store starting state
const  initialState={
    userData: null
}
//create slice reducer ka bda version,reducer functionality//reducer m ata h properties+function
export  const userSlice = createSlice({
    name:"user",
     initialState,
    reducers:{
        setUserData:(state, action) =>{
      state.userData = action.payload;
  }
    }
  
})
export const { setUserData}  = userSlice.actions

export default userSlice.reducer;