import React from 'react'
import { Link } from 'react-router-dom'
import '../Login/Login.scss'
import Background from '../../Asserts/download (4).jpeg'
import Navbar from '../Navbar/Navbar'

const GuestLogin = ({ loginTabs, setLoginTab }) => {

    return (
        <div className='Log in'>
            <Navbar />
            <img src={Background} alt="background Kota" />
            <div className="login-header">
                <h2 className=''>Guest Login</h2>
            </div>
            <div className='login-form'>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <div className="login-form-guest-forgotPassword">
                        {loginTabs.map((tab) => {
                            return (
                                <Link to={`/${tab}`}>
                                    <p style={{ display: tab === "Forgot password" && "none" }} onClick={() => setLoginTab(tab)}>{tab}</p>
                                </Link>
                            )
                        })}
                    </div>
                    <div className="login-form-button">
                        <button type="button" className='login-form-btn'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default GuestLogin