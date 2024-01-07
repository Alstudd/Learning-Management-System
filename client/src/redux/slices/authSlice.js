import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
    isLogged:  localStorage.getItem("isLoggedin") || false ,
    role: localStorage.getItem("role") || "",
    data:localStorage.getItem("data") || {}
} 

export const createAccount = createAsyncThunk("/auth/signup", async (data)=>{
    try {
        const responsePromise =  axiosInstance.post("user/register",data);
        console.log('response from authSlice , axiosInstance from post',responsePromise);
        toast.promise(responsePromise,{
            loading:"Creating account...",
            success:(res)=>{
                console.log('data from authSlice , axiosInstance from post',res);
                return res.data?.message || "error in handling response from server";
            },
            error:(err)=>{
                return err?.response?.data?.message || "Something went wrong";
            }
        })

        const response = await responsePromise;
        
        return  response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{}
});

export default authSlice.reducer; 