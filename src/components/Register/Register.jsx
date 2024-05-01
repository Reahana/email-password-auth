import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, applyActionCode } from "firebase/auth";
import app from '../../Firebase/firebase.config';
const Register = () => {
 const [error, setError] = useState('');
 const [success,setSuccess] = useState('');

    const auth = getAuth(app);

    const handleSubmit = (event) => {

        // 1. prevent page refresh
        event.preventDefault();
        setSuccess('')
        // 2. collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        //3. create user in firebase
        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setError(' ');
            event.target.reset();
            setSuccess('user has create successfully')
        })
        .catch(error =>{
    console.error(error.message);
    setError(error.message)
        })
        
    }
    const handleEmailChange = (event) => {
       // console.log(event.target.value);
        // setEmail(event.target.value);
    }

    const handlePasswordBlur = (event) => {
        //console.log(event.target.value);
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='email'  required/>
                <br />
                <input className='w-50 mb-4' onBlur={handlePasswordBlur} type="password" name="password" id="password"  placeholder='password' required/>
                  <br />
                 <input type="submit" value="Register" />
            </form>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;