import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Email, Lock } from '@mui/icons-material';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email,
                password,
            });
            const { jwt, userRole, userId } = response.data;
            localStorage.setItem('token', jwt);
            localStorage.setItem('role', userRole);
            localStorage.setItem('userId', userId);
            if (userRole === 'ADMIN') {
                navigate('/admin/dashboard');
            } else if (userRole === 'USER') {
                navigate('/user/courses');
            } else if (userRole === 'TEACHER') {
                navigate(`/teacher/teacher_courses/${userId}`);
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <div className={styles.inputContainer}>
                    <Email className={styles.icon} />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <Lock className={styles.icon} />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={styles.input}
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.loginButton}>Login</button>
                <p className={styles.signupLink}>Don't have an account? <Link to="/signup">Signup</Link></p>
            </form>
        </div>
    );
};

export default Login;