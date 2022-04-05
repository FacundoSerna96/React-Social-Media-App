import './login.css'

const Login = () => {
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Feisbuk</h3>
                <span className="loginDesc">Conectate con el mundo</span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input type='email' placeholder='Email' className="loginInput" />
                    <input type='password' placeholder='Password>' className="loginInput" />
                    <button className='loginButton'>Log in</button>
                    <span className='loginForgot'>Forgot Password?</span>
                    <button className="loginRegisterButton">Create a New Account</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login