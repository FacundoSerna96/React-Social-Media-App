import './register.css'

const Register = () => {
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
                    <input type='text' placeholder='Username' className="loginInput" />
                    <input type='password' placeholder='Password' className="loginInput" />
                    <input type='email' placeholder='Password again' className="loginInput" />
                    <button className='loginButton'>Sign Up</button>
               
                    <button className="loginRegisterButton">Log into Account</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register