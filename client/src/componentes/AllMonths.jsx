import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";
import caneca from './assets/caneca.png';
import lapiz from './assets/lapiz.png';
import styles from './Register.module.css'



const Allmonths = () => {

    const [months, setMonths] = useState([]);
    const [ahorros, setAhorros] = useState(0);

    const [user, setUser] = useState({});
    const [cookies, setCookies] = useCookies();

    const history = useHistory()

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/" + jwt_decode(cookies.usertoken)._id, { withCredentials: true })
            .then(res => {
                setUser(res.data)
                console.log(res.data)
            })

            .catch(err => {
                if (err.response.status === 401) {
                    history.push('/login');
                }
            });
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/api/months", { withCredentials: true })
            .then(res => {
                setMonths(res.data)
                let total = 0;
                res.data.forEach(element => {
                    console.log(element)
                total += element.ingresos-element.gastos;
                });
                setAhorros(total)
            })
            .catch(err => {
                if (err.response.status === 401) {
                    history.push('/login');
                }
            });
    }, [history])

    const deleteMonths = id => {
        axios.delete("http://localhost:8000/api/months/" + id)
            .then(res => {
                //Actualizar la lista de autores por medio de filter
                let nuevaLista = months.filter(month => month._id !== id);
                setMonths(nuevaLista);
            })
    }

    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => history.push('/login'))
            .catch(err => console.log(err));
    }

    return (
        <div className="justify-content-center mt-5">
            <h1 className="text-center">Hi {user.firstName} This Is Your Annual Report</h1>
            <div className="row d-flex justify-content-center border border-1 rounded-5 p-4 mt-4">
                {
                    months.map((month, index) => {

                        return (
                            <div className={`col-2 justify-content-center border border-3 rounded-5 p-3 me-4 mt-4 ${styles.camp}`} key={index}>
                                <h2 className="border-bottom">{month.numero} {month.mes}</h2>
                                <h5>Income</h5>
                                $ <NumericFormat displayType="text" value={month.ingresos} allowLeadingZeros thousandSeparator="," />
                                <h5>Bills</h5>
                                $ <NumericFormat displayType="text" value={month.gastos} allowLeadingZeros thousandSeparator="," />
                                <h5>Saving</h5>
                                $ <NumericFormat displayType="text" value={month.ingresos - month.gastos} allowLeadingZeros thousandSeparator="," />
                                <div className={styles.cont}>
                                    <Link className={styles.icon} to={`/month/update/${month._id}`}><img src={lapiz} alt="Edit" /></Link>
                                    <Link className={styles.icon} onClick={() => deleteMonths(month._id)} ><img src={caneca} alt="Delete" /> </Link>
                                </div>
                            </div>
                        )
                    })
                }
                <h5>Your total annual saving is : $ <NumericFormat displayType="text" value={ahorros} allowLeadingZeros thousandSeparator="," /> </h5>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Link to="/nuevo" className="btn btn-light me-3">New Month</Link>
                <button className="btn btn-light ms-3" onClick={cerrarSesion}>Log Out</button>
            </div>
        </div>
    )

}

export default Allmonths;