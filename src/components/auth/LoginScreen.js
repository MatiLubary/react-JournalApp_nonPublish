import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {  startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {


    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        email: 'mati@test.com',
        password: 'random123'
    })


    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password))
    }


    const handleGoogleLogin = () => {
        dispatch (startGoogleLogin() )
    }


    return (
        <div className="centerT">
            
            <h2 className="auth__title mb-5">Login</h2>

            <form onSubmit={handleLogin} className="animate__animated animate__fadeIn animate__faster">
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-one"
                    disabled={ loading }
                >
                Login
                </button>

                <div className="auth__social-networks">
                    <p className="mb-1">Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    className="link"
                    to="/auth/register"
                >
                    Create new Account
                </Link>
            </form>

        </div>
    )
}
