import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from 'react'
import {toast} from 'react-hot-toast'
const LoginSignUp = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
      username: "",
      password: "",
      email: "",
  })
 
  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }


  // login function 

  const login = async ()=>{
      console.log("login func", formData);
      let responseData;
      await fetch('http://localhost:4000/login',{
           method: 'POST',
           headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
           },
           body:JSON.stringify(formData),
      }).then((response)=> response.json()).then((data)=> responseData=data)
        
      if(responseData.success){
        localStorage.setItem('auth-token', responseData.token);
        toast.success("Logged In Successfully !!")
        setTimeout(()=>{
           window.location.replace('/');
        },1500)

      }else{
        toast.error(responseData.message)
      }
  }

  //signup function

const signUp = async ()=>{
 console.log("signup function executed", formData);
 let responseData;
 await fetch('http://localhost:4000/signup',{
   method: 'POST',
   headers:{
    Accept: 'application/json',
    'Content-Type':'application/json'
   },
   body: JSON.stringify(formData),
 }).then((response)=> response.json()).then((data)=>responseData = data)

 if(responseData.success){
  localStorage.setItem('auth-token', responseData.token);
  toast.success("SignUp Successful");
  setTimeout(() => {
  window.location.replace('/');
}, 1500);
 }
else{
  toast.error(responseData.errors)
}

  } 


  return (
    <div className='loginsignup'> 
         <div className="loginsignup-container">
           <h1>{state}</h1>
           <div className="loginsignup-fields">

            {state === "Sign Up" && <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> }

            <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
            <input name='password' value={formData.password} onChange={changeHandler} type="password"  placeholder='Password'/>
           </div>
           <button onClick={()=> (state === "Login" ? login() : signUp()) }>{state}</button>

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