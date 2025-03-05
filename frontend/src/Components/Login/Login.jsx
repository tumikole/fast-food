import React from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'
import Background from '../../Asserts/download (4).jpeg'
import Navbar from '../Navbar/Navbar'
import ForgorPassword from '../ForgotPassword/ForgotPassword'
import GuestLogin from '../GuestLogin/GuestLogin'

const Login = ({ loginTabs, setLoginTab, loginTab, loginUser, setUsername, setPassword, username, password }) => {


    if (loginTab && loginTab === "Login") {
        return (
            <div className='Login'>
                <Navbar />
                <img src={Background} alt="background Kota" />
                <div className="login-header">
                    <h2>Login</h2>
                </div>
                <div className='login-form'>
                    <form action="" onSubmit={loginUser}>
                        <div className="form-group">
                            <label htmlFor="">Username</label>
                            <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} value={username}/>
                            

                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} />
                           
                        </div>
                        <div className="login-form-guest-forgotPassword">
                            {loginTabs.map((tab) => {
                                return (
                                    <Link to={`/${tab === "Forgot password" ? "forgot_password" : tab}`}>
                                        <p style={{ display: tab === loginTab && "none" }} onClick={() => setLoginTab(tab)}>{tab}</p>
                                    </Link>
                                )
                            })}
                        </div>
                        <div className="login-form-button">
                            <button type="submit" className='login-form-btn'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    } else if (loginTab === "Forgot password") {
        <ForgorPassword />
    } else if (loginTab && loginTab === "Guest") {
        return (
            <GuestLogin />

        )
    }
}

export default Login