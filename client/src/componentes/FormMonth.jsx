import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";



const FormMonth = () => {

    const [mes, setMes] = useState("");
    const [numero, setNumero] = useState();
    const [ingresos, setIngresos] = useState("");
    const [gastos, setGastos] = useState("");


    const [user, setUser] = useState({});
    const [cookies, setCookies] = useCookies();

    const [errors, setErrors] = useState({});

    const history = useHistory();

    //NUEVO
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/"+ jwt_decode(cookies.usertoken)._id, {withCredentials: true})
            .then(res => {
                setUser(res.data)
                console.log(res.data)
            })
            
            .catch(err => {
                if(err.response.status === 401) {
                    history.push('/login');
                }
            });
    },[])

    const savemonth = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/months',{
            mes,
            numero,
            ingresos,
            gastos,
        }, {withCredentials: true})
            .then(res => history.push('/months'))
            .catch(err => setErrors(err.response.data.errors));
    }


    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="col-5 justify-content-center">
                <h2>Hi {user.firstName} Can you create a Month?</h2>
                <form className="border border-3 rounded-5 p-4 mt-4" onSubmit={savemonth}>
                    <div className="form-group mt-3">
                        <label htmlFor="mes">Month</label>
                        <input  type="text" 
                                name="mes" 
                                id="mes" 
                                className="form-control" 
                                value={mes} 
                                onChange={e=> setMes(e.target.value)}  />
                        {errors.mes ? <span className="text-danger">{errors.mes.message}</span> : null}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="numero">Numb</label>
                        <input type="number" name="numero" id="numero" className="form-control" value={numero} onChange={e=> setNumero(e.target.value)}  />
                        {errors.numero ? <span className="text-danger">{errors.numero.message}</span> : null}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="ingresos">Income</label>
                        <input type="number" name="ingresos" id="ingresos" className="form-control"   value={ingresos} onChange={e=> setIngresos(e.target.value)}  />
                        {errors.ingresos ? <span className="text-danger">{errors.ingresos.message}</span> : null}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="gastos">Bills</label>
                        <input type="number" name="gastos" id="gastos" className="form-control" value={gastos} onChange={e=> setGastos(e.target.value)}  />
                        {errors.gastos ? <span className="text-danger">{errors.gastos.message}</span> : null}
                    </div>
                    <div className={`col d-flex justify-content-center mt-3`}>
                        <input className="btn btn-light me-3" type="submit" value="Send" />
                        <Link className="btn btn-light ms-3" to="/months">Visualize</Link>
                    </div>
                </form>
            </div>
        </div>
)
}

export default FormMonth;