
import './login.css';
import {useContext, useRef} from 'react';
import {loginCall} from '../../apiCalls';
import {AuthContext} from '../../context/AuthContext';
import {CircularProgress} from '@material-ui/core';

const Login = () => {
    const email = useRef();
    const password = useRef();

    const {user, isFetching, errors, dispatch} = useContext(AuthContext);

    const handleClick = (e) =>  {
        e.preventDefault();
        loginCall({email: email.current.value, password : password.current.value}, dispatch);
    }

    console.log(user)
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Feisbuk</h3>
                <span className ="loginDesc">Conectate con el mundo</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input type='email' 
                            placeholder='Email'
                            required 
                            className="loginInput" 
                            ref={email} />
                    <input type='password' 
                            placeholder='Password' 
                            required
                            minLength='6'
                            className="loginInput" 
                            ref={password} />
                    <button className='loginButton' type='submit' disabled={isFetching}>
                        {isFetching ? <CircularProgress color='white' size='20px' /> : 'Log in'}
                    </button>
                    <span className='loginForgot'>Forgot Password?</span>
                    <button className="loginRegisterButton">
                        {isFetching ? <CircularProgress color='white' size='20px' /> : 'Create a New Account'}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login