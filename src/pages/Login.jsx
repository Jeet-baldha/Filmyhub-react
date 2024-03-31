// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
const LoginForm = () => {
    const navigate = useNavigate();
    const [inputData,setInpiutdata] = useState({
        username:"",
        password:"",
    });
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login',inputData);
    
            if(response.data.authenticated !== false) {
                alert(response.data.message);
                    const userId = response.data.userId
                    const userName = response.data.username
                    console.log(response.data);
                    dispatch(login({userId,userName}));
                    navigate('/');
            }
            else{
                console.log(response);
                alert(response.data.message);
                navigate('/auth/login');
            }
        } catch (error) {
            alert(error.message);   
        }
    };

    const handleInputChange = (event) => {
        const {name,value}= event.target;
        
        setInpiutdata((prev) => {
            return {...prev, [name]: value}
        })
    }

    return (
        <div style={{width:"100vw",height:"100vh"}}>
        <div className="form-container">
            <p className="title">Hey Moviegoer!</p>
            <form className="form" id="login-form" onSubmit={handleSubmit}>
                <input type="text" className="input"  onChange={handleInputChange} value={inputData.username} placeholder="Email or Username" name="username" />
                <input type="password" className="input" placeholder="Password" onChange={handleInputChange} value={inputData.password} name="password" />
                <input type="submit" className="form-btn" name="submit" />
            </form>
            <p className="sign-up-label">
                Don't have an account? <a href="/signup"><span className="sign-up-link">Sign up</span></a>
            </p>
            <div className="buttons-container">
                <a href="/auth/facebook">
                    <button className="social-button facebook">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z">
                            </path>
                        </svg>
                        <span>Sign in with Facebook</span>
                    </button>
                </a>
                <a href="/auth/google">
                    <div className="google-login-button">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            version="1.1"
                            x="0px"
                            y="0px"
                            className="google-icon"
                            viewBox="0 0 48 48"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* ... Google SVG path data ... */}
                        </svg>
                        Sign in with Google
                    </div>
                </a>
            </div>
        </div>
    </div>
    );
};

export default LoginForm;
