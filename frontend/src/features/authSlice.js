import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const user =JSON.parse(localStorage.getItem('user'))
const initialState={
    user: user ? user : null,
    isAuthenticated:false,
    loading:false,
    success:false,
    error:false,
    message:''
}

export const register=createAsyncThunk('auth/register',async(credintialData,ThunkAPI)=>{

    try {
        
        const response=await axios.post(`/api/user/register`,credintialData)
        if(response)
        {
            localStorage.setItem('user',JSON.stringify(response.data))
            return response.data //user information
        }
        
    } catch (error) {
        const  message=(error.response && error.response.data && error.response.data.message) ||error.message || error.toString()
        return ThunkAPI.rejectWithValue(message)
        
    }
})
export const login=createAsyncThunk('auth/login',async(credintialData,ThunkAPI)=>{

    try {
        const response=await axios.post(`/api/user/login`,credintialData)
       
        if(response)
            {
                localStorage.setItem('user',JSON.stringify(response.data))
                return response.data //user information
            }
        
    } catch (error) {
      const  message=(error.response && error.response.data && error.response.data.message) ||error.message || error.toString()
     
      return   ThunkAPI.rejectWithValue(message)
        
    }
})
export const logout=createAsyncThunk('auth/logout',async(ThunkAPI)=>{
    localStorage.removeItem('user')
})


export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.error=false
            state.isAuthenticated=false
            state.loading=false
            state.success=false
            state.message=''
            state.user=null
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.loading=true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.user=action.payload
            state.isAuthenticated=true
            state.message=''
            state.error=false
        })
        .addCase(register.rejected,(state,action)=>{
            state.error=true
            state.user=null
            state.success=false
            state.isAuthenticated=false
            state.message=action.payload
            state.loading=false
        })
        .addCase(login.pending,(state)=>{
            state.loading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.user=action.payload
            state.isAuthenticated=true
            state.message=''
            state.error=false
           
        })
        .addCase(login.rejected,(state,action)=>{
            state.error=true
            state.user=null
            state.success=false
            state.isAuthenticated=false
            state.message=action.payload
            state.loading=false
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=null
        })

    }
})

export const {reset}=authSlice.actions
export default authSlice.reducer