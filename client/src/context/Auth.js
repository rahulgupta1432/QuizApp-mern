import { useState,useContext,createContext,useEffect } from "react";
import axios from "axios";


const AuthContext=createContext();

const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:''
    });
    if(auth.token){
        axios.defaults.headers.common['x-authorization']=auth?.token
    }
    useEffect(()=>{
        const data=localStorage.getItem("auth");
        if(data){
            const parseData=JSON.parse(data);
            setAuth({
                ...auth,
                user:{
                    _id:parseData._id,
                    email:parseData?.email,
                    tokenVersion:parseData.tokenVersion,
                    createdAt:parseData.createdAt,
                    updatedAt:parseData.updatedAt,
                    __v:parseData.__v
                },
                token:parseData.token
            })
        }
    },[]);
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuth=()=>useContext(AuthContext);

export {AuthProvider,useAuth}