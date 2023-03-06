import React, { useState, useEffect } from 'react'
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Notetake from './Notetake';

export default function Authenticate() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedin, setIsLoggedin] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            console.log('Sign in Successful!');
            setIsLoggedin(true);
        }).catch((error) => alert(error.message));
    }

    const handleLogOut = () => {
        signOut(auth).then(() => {
            setIsLoggedin(false);
            console.log('Sign Out Successful!')
        }).catch(error => alert(error.message));
    }

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            console.log('Account has been created!');
        }).catch((error) => alert(error.message));
    }

    return (
        <div>
            <input type="email" placeholder="Email" value={email} onChange={handleEmailChange}></input>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleRegister}>Create an Account</button>
            {isLoggedin ? (
                <button onClick={handleLogOut}>Log Out</button>
            ):(
                <></>
            )}
            {isLoggedin ? (
                <div>
                Logged in as {auth.currentUser.email}
                </div>
            ):(
                <></>
            )}
            {isLoggedin ? (
                <div>
                <Notetake/>
                </div>
            ):(
                <></>
            )}
        </div>
    )
}
