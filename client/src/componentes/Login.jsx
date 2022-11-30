import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom"
//import  styles from "./Login.module.css"

const Login = () => {

    //Para Formulario de Inicio de Sesión
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const history = useHistory();

    const login = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/login', {
            email: emailLogin,
            password: passwordLogin
        }, {withCredentials: true})
            .then(res => {
                if(res.data.error) {
                    setErrorLogin(res.data.message);
                } else {
                    history.push('/nuevo');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className=" d-flex justify-content-center mt-5">
            <div className="col-5 justify-content-center">
                <div className="text-center">
                    <h2>Hi Welcome To Your Financial App </h2>
                    <h3>Login</h3>
                </div>
                <form className="border border-3 rounded-5 p-4 mt-4" onSubmit={login}>
                    <div className="form-group mt-3">
                        <label htmlFor="emailLogin">E-mail</label>
                        <input type="email" name="emailLogin" id="emailLogin" className="form-control" value={emailLogin} onChange={e=>setEmailLogin(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="passwordLogin">Password</label>
                        <input type="password" name="passwordLogin" id="passwordLogin" className="form-control" value={passwordLogin} onChange={e=>setPasswordLogin(e.target.value)} />
                    </div>
                    <div>
                        {errorLogin !== "" ? <span className="text-danger">{errorLogin}</span> : null }
                    </div>
                    <div className=" col d-flex justify-content-center mt-3">
                        <input className="btn btn-light" type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login;