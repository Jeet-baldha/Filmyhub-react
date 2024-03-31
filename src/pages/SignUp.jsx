import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
const SignUpForm = () => {

    const [inputData,setInpiutdata] = useState({
        username:"",
        email:"",
        password:"",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(inputData);
        try {
            const response = await axios.post('http://localhost:3000/signup',inputData);
    
            if(response.status === 200){
                alert(response.data.message);
                const userId = response.data.userID
                const userName = response.data.userName
                console.log(userName);
                dispatch(login({userId,userName}));
                navigate('/');
            }
            else{
                alert(response.data.message);
                navigate('/auth/signup');    
            }
        } catch (error) {
            alert(error.message);
            navigate('/auth/signup');  
        }

    };

    const handleInputChange = (event) => {
        const {name,value}= event.target;
        
        setInpiutdata((prev) => {
            return {...prev, [name]: value}
        })
    }

    const googleAuth = async() => {
        try {
            const response = await axios.get('http://localhost:3000/auth/google');
    
            if(response.status === 200){
                alert('login suessess')
                navigate('/');
            }
            else{
                alert(response.data.message);
                navigate('/auth/signup');    
            }
        } catch (error) {
            alert(error.message);
            navigate('/auth/signup');  
        }


    }

    return (
        <div style={{width:"100vw",height:"100vh"}}>
            <div className="form-container">
                <p className="title">Hey Moviegoer !</p>
                <form className="form"  id="signup-form" onSubmit={handleSubmit}>
                    <input type="text" className="input" placeholder="Username" onChange={handleInputChange} value={inputData.username} name="username" style={{ marginTop: 0 }} />
                    <input type="email" className="input" placeholder="Email" onChange={handleInputChange} value={inputData.email} name="email" />
                    <input type="password" className="input" placeholder="Password" onChange={handleInputChange} value={inputData.password} name="password" />
                    <button type="submit" className="form-btn">Sign up</button>
                </form>
                <p className="sign-up-label">
                    Already have an account? <a href="/login"><span className="sign-up-link">Login</span></a>
                </p>
                <div className="buttons-container">
                    <a href="/auth/facebook">
                        <button className="social-button facebook">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z">
                                </path>
                            </svg>
                            <span>Sign up with Facebook</span>
                        </button>
                    </a>
                    <div onClick={ () => googleAuth()}>
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
                            Sign up with Google
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
