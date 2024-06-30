import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';

import 'react-toastify/dist/ReactToastify.css';
import {Email, Person, Lock} from "@mui/icons-material";

const Signup = () => {
    const [name, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/signup', {
                name,
                lastName,
                email,
                password,
            });
            console.log('User created', response.data);
            localStorage.setItem('signupSuccess', 'true');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <div className={styles.signupContainer}>
            <p className={styles.formHeader}>Registration Form</p>
            <form onSubmit={handleSubmit} className={styles.signupForm}>
                <div className={styles.inputContainer}>
                    <Person className={styles.icon}/>
                    <input type="text" value={name} onChange={(e) => setFirstName(e.target.value)} required
                           placeholder="First Name" className={styles.input}/>
                </div>
                <div className={styles.inputContainer}>
                    <Person className={styles.icon}/>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required
                           placeholder="Last Name" className={styles.input}/>
                </div>
                <div className={styles.inputContainer}>
                    <Email className={styles.icon}/>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                           placeholder="Email" className={styles.input}/>
                </div>
                <div className={styles.inputContainer}>
                    <Lock className={styles.icon}/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                           placeholder="Password" className={styles.input}/>
                </div>
                <button type="submit" className={styles.button}>Signup</button>
            </form>
        </div>
    );
};

export default Signup;