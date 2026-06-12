import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from 'react'
import {toast} from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { serverUrl } from '../App';


const LoginSignUp = () => {
  const {userData} = useSelector(state=> state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [role, setRole] = useState("Customer");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
 


  // login function 


  const login = async () => {
     try {
        const {data} = await axios.post(`${serverUrl}/api/auth/login`,
          {email,password},
          {withCredentials:true})
          navigate('/');
          toast.success("Login successful")
          console.log(data)
          dispatch(setUserData(data))


     } catch (error) {
       console.log(error.message,"login error")
          toast.error(error.response?.data.message);
            dispatch(setUserData(null))
     }
  }


  //signup function
  const signUp = async () => {
     try {
        const {data} = await axios.post(`${serverUrl}/api/auth/signup`,
          {username,email,role,password},
          {withCredentials:true})
          navigate('/');
          toast.success("Signup successful")
          console.log(data);
          dispatch(setUserData(data))


     } catch (error) {
       console.log(error.message,"signUp error")
       toast.error(error.response?.data?.message || "Something went wrong");
         dispatch(setUserData(null))
     }
  }



  return (
    <div className='loginsignup'> 
         <div className="loginsignup-container">
           <h1>{state}</h1>
           <div className="loginsignup-fields">

            {state === "Sign Up" && <input name='username' onChange={(e)=> setUsername(e.target.value)} value={username}
             type="text" placeholder='Your Name' /> }

            <input name='email' type="email" placeholder='Email Address'
              onChange={(e)=> setEmail(e.target.value)} value={email} />
            <input name='password'  type="password"  placeholder='Password' 
               onChange={(e)=> setPassword(e.target.value)} value={password} />
           </div>
           {state === "Sign Up" && <div className='role'>
                <span></span>
               <button onClick={()=> setRole("Customer")} className={`${role === 'Customer'  ? 'hovered': 'unHovered'} `}>Customer</button>
                <button onClick={()=> {setRole("Admin")}} className={`${role === 'Admin'  ? 'hovered': 'unHovered'}`} >Admin</button>
            </div>}
           <button className='bg-amber-600 w-full py-3 text-xl mt-6 cursor-pointer' onClick={()=> (state === "Login" ? login() : signUp()) }>{state}</button>

           {state === "Login" 
           ?  <p className='loginsignup-login'>Don't have an account? <span onClick={()=> setState("Sign Up")} >Click here</span> </p> 
           :  <p className='loginsignup-login'>Already have an account? <span onClick={()=> setState("Login")}>Login here</span> </p>}

        
           {/* <p className='loginsignup-signup' >Don't have an account? <span>Click here</span> </p> */}
              <div className="loginsignup-agree">
                <input type="checkbox"/>
                <p>By continuing, i agree to the terms of use & privacy policy</p>
                </div>      

         </div>
    </div>
  )
}

export default LoginSignUp