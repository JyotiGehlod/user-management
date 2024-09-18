import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialValue = {
    user : [],
    loading :true,
}

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
      const response = await axios.get('http://localhost:9000/api/v1/users')
      return response.data
    },
  )
  
const userSlice = createSlice ({
    name : 'userSlice',
    initialState : initialValue,
    reducers : {},
    extraReducers: (builder) => {
     builder.addCase(getAllUsers.pending, (state, action) => {
        state.loading = true ;
      })
      .addCase(getAllUsers.fulfilled,  (state, action) =>{
          state.users = action.payload;
          state.loading = false ;
        })   
    }
})

export default userSlice.reducer