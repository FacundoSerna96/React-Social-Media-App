import axios from 'axios';
import { useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import './register.css'

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) =>  {
        e.preventDefault();

        if(passwordAgain.current.value  !== password.current.value){
            passwordAgain.current.setCustomValidity("Password don't match!")
        }else{
            const user ={
                username:username.current.value,
                email : email.current.value,
                password: password.current.value,
            }

        try {
            await axios.post('/auth/register', user);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
}


  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Feisbuk</h3>
                <span className="loginDesc">Conectate con el mundo</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input 
                        type='email' 
                        placeholder='Email' 
                        required 
                        ref={email} 
                        className="loginInput" 
                    />
                    <input 
                        type='text' 
                        placeholder='Username' 
                        required 
                        ref={username} 
                        className="loginInput" 
                    />
                    <input 
                        type='password' 
                        placeholder='Password' 
                        required 
                        ref={password} 
                        className="loginInput" 
                        minLength='6'
                    />
                    <input 
                        type='password' 
                        placeholder='Password again' 
                        required 
                        ref={passwordAgain} 
                        className="loginInput" 
                        minLength='6'
                    />

                    <button className='loginButton' type='submit'>Sign Up</button>
               
                    <button className="loginRegisterButton">Log into Account</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register