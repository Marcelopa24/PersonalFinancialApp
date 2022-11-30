import React, {useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
//import  styles from "./Register.module.css"

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorRegistro, setErrorsRegistro] = useState({});

    const history = useHistory();

    const registro = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register',{
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }, {withCredentials: true})
            .then(res => history.push('/login'))
            .catch(err => setErrorsRegistro(err.response.data.errors));
    }

    return (
        <div className=" d-flex justify-content-center mt-5">
            <div className="col-5 justify-content-center">
                <div className="text-center">
                    <h2>Hi Welcome To Your Financial App </h2>
                    <h3>Sign In</h3>
                </div>
                <form className={ `border border-3 rounded-5 p-4 mt-4`} onSubmit={registro}>
                    <div className="form-group">
                        <label htmlFor="firstName">Name</label>
                        <input  type="text" 
                                name="firstName" 
                                id="firstName" 
                                className="form-control" 
                                value={firstName} 
                                onChange={e=> setFirstName(e.target.value)}  />
                        {errorRegistro.firstName ? <span className="text-danger">{errorRegistro.firstName.message}</span> : null}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" className="form-control" value={lastName} onChange={e=> setLastName(e.target.value)}  />
                        {errorRegistro.lastName ? <span className="text-danger">{errorRegistro.lastName.message}</span> : null}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" className="form-control" value={email} onChange={e=> setEmail(e.target.value)}  />
                        {errorRegistro.email ? <span className="text-danger">{errorRegistro.email.message}</span> : null}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="form-control" value={password} onChange={e=> setPassword(e.target.value)}  />
                        {errorRegistro.password ? <span className="text-danger">{errorRegistro.password.message}</span> : null}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}  />
                        {errorRegistro.confirmPassword ? <span className="text-danger">{errorRegistro.confirmPassword.message}</span> : null}
                    </div>
                    <div className={`d-flex justify-content-center mt-3`}>
                        <input className="btn btn-light me-3" type="submit" value="Send"/>
                        <Link className="btn btn-light ms-3" to="/login">Longin</Link>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Register;