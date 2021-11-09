import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { removeError, setError } from '../../actions/ui';
import { startRegEmailPwName } from '../../actions/auth';


export const RegisterScreen = () => {


    const dispatch = useDispatch();
    const {msgError} = useSelector( state => state.ui );
    console.log(msgError)


    const [formValues, handleInputChange] = useForm({
        name: 'mati',
        email: 'mati@test.com',
        password: 123456,
        password2: 123456
    })

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault()

        if (isFormValid()) {
            dispatch (startRegEmailPwName(email, password, name))

        }
    }
    

    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch(setError("Name is required"))
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError("Email is not valid"))
            return false 
        } else if (password !== password2 || password.length < 5 ) {
            dispatch(setError("Passwords must match and be over 5 chars"))
            return false
        }

        dispatch(removeError());
        return true

    }


    return (
        <div className="centerT">
            
            <h2 className="auth__title mb-5">Register</h2>

            <form onSubmit={handleRegister} className="animate__animated animate__fadeIn animate__faster">

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

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

                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            {msgError}    
                        </div>
                    )
                }

                <button
                    type="submit"
                    className="btn btn-one mb-5"
                >
                Register
                </button>


                <Link 
                    className="link"
                    to="/auth/login"
                >
                    Already registered?
                </Link>
            </form>

        </div>
    )
}
