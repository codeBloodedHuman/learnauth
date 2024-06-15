import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

const userSignup = () => {

const {login} = useAuth();
const [error,setError ]=useState(null);
const [loading, setLoading]= useState(null);

const registerUser =async (values)=>{
    if(values.password !== values.cpassword){
        return setError("Password is not matching")
    }
    try{
        setError(null);
        setLoading(false);
        const res = await fetch('http://localhost:3000/api/auth/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(values),
        });  
        const data =await res.json();
        if(res.status ===201){
            message.success(data.message);
            login(data.token, data.user);
        }else {
            setError(data.message);
        }
        //  else{
        //     message.error('Registration failed');
        //}

    } catch(error){
        message.error(error);
    }
}


  return {loading, error, registerUser };

}

export default userSignup