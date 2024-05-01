import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification,updateProfile  } from "firebase/auth";
import app from '../../Firebase/firebase.config';
import { Link } from 'react-router-dom';
const Register = () => {
 const [error, setError] = useState('');
 const [success,setSuccess] = useState('');

    const auth = getAuth(app);

    const handleSubmit = (event) => {

        // 1. prevent page refresh
        event.preventDefault();
        setSuccess('')
        setError('');
        // 2. collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(email, password,name);

 // validate
 if (!/(?=.*[A-Z])/.test(password)) {
    setError('Please add at least one uppercase');
    return;
}
else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
    setError('Please add at least two numbers');
    return
}
else if (password.length < 6) {
    setError('Please add at least 6 characters in your password')
    return;
}

        //3. create user in firebase
        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setError(' ');
            event.target.reset();
            setSuccess('user has create successfully')
            sendVerificationEmail(result.user);
            updateUserData(result.user, name);
      
        })
        .catch(error =>{
    console.error(error.message);
    setError(error.message)
        })


        
    }

    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('Please verify your email address')
            })
    }
    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
                console.log('user name updated')
            })
            .catch(error => {
                setError(error.message);
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
            <input className='w-50 mb-4 rounded ps-2' type="text" name="name" id="name" placeholder='Your Name' required />
                <br />
                <input className='w-50 mb-4' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='email'  required/>
                <br />
                <input className='w-50 mb-4' onBlur={handlePasswordBlur} type="password" name="password" id="password"  placeholder='password' required/>
                  <br />
                 <input type="submit" value="Register" />
            </form>
            <p><small>Already have an account? Please <Link to="/login">Login</Link> </small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;