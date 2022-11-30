import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";
import axios from "axios";

const UpdateMonth = () => {

    const {id} = useParams();

    const [mes, setMes] = useState("");
    const [numero, setNumero] = useState("");
    const [ingresos, setIngresos] = useState("");
    const [gastos, setGastos] = useState("");
    const [errors, setErrors] = useState({});

    const [user, setUser] = useState({});
    const [cookies, setCookies] = useCookies();

    const history = useHistory();

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

    useEffect(() => {
        axios.get("http://localhost:8000/api/months/"+id)
            .then(res => {
                setMes(res.data.mes);
                setNumero(res.data.numero);
                setIngresos(res.data.ingresos);
                setGastos(res.data.gastos);
            })
            .catch(err => history.push('/error'));
    }, [id, history])

    const UpdateMonth = e => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/months/"+id, {
            mes,
            numero,
            ingresos,
            gastos,
        })
            .then(res => history.push('/months'))
            .catch(err => setErrors(err.response.data.errors));
    }

    return (
        <div className="row">
            <div className="col-6">
                <h2>hi {user.firstName} </h2>
                <form onSubmit={UpdateMonth}>
                    <div className="form-group">
                        <label htmlFor="mes">Mes</label>
                        <input  type="text"
                                name="mes" 
                                id="mes" 
                                className="form-control" 
                                value={mes} 
                                onChange={e=> setMes(e.target.value)}  />
                        {errors.mes ? <span className="text-danger">{errors.mes.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="numero">Numero</label>
                        <input type="number" name="numero" id="numero" className="form-control" value={numero} onChange={e=> setNumero(e.target.value)}  />
                        {errors.numero ? <span className="text-danger">{errors.numero.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingresos">Ingresos</label>
                        <input type="number" name="ingresos" id="ingresos" className="form-control" value={ingresos} onChange={e=> setIngresos(e.target.value)}  />
                        {errors.ingresos ? <span className="text-danger">{errors.ingresos.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="gastos">Gastos</label>
                        <input type="number" name="gastos" id="gastos" className="form-control" value={gastos} onChange={e=> setGastos(e.target.value)}  />
                        {errors.gastos ? <span className="text-danger">{errors.gastos.message}</span> : null}
                    </div>
                    <input type="submit" value="Send" className="btn btn-primary" />
                </form>
            </div>
        </div>
    )

}

export default UpdateMonth;