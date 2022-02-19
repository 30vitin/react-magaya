import {useRef, useState, useEffect} from 'react';
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import {useNavigate, useLocation } from "react-router-dom";
const LOGIN_URL = '/api/login';

//styles



const Login = () => {

    const { setAuth, persist } = useAuth();


    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/list";


    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        var basicAuth = 'Basic ' + btoa(user + ':' + pwd);

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({user, pwd}),
                {
                    mode: 'no-cors',
                    headers: {
                        'Authorization': basicAuth,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
                    }
                }
            );

            const accessToken  = response?.data.accessToken ;

            setAuth({user,pwd,accessToken});
            setUser('');
            setPwd('');
            localStorage.setItem('accessToken',accessToken)
            navigate(from, { replace: true });


        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }




    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));

    }, [persist])

    return (
        <div className="d-flex justify-content-center">

            <div className="col-xl-4 col-lg-12 col-md-7">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Magaya</h1>
                                    </div>

                                    <form className="user" onSubmit={handleSubmit}>
                                        <p ref={errRef}
                                           className={errMsg ? "invalid-feedback d-block invalid" : "offscreen"}
                                           aria-live="assertive">{errMsg}</p>

                                        <div className="form-group">


                                            <label htmlFor="username" className="form-label">Usuario</label>
                                            <input type="text" className={`form-control `}
                                                   name="username"
                                                   ref={userRef}
                                                   autoComplete="off"
                                                   placeholder="Usuario"
                                                   onChange={(e) => setUser(e.target.value)}
                                                   value={user}
                                                   required/>

                                            <div className={`valid-feedback `}></div>

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="form-label">Contraseña</label>

                                            <input autoComplete="on" type="password"

                                                   className={`form-control`}
                                                   name="password"
                                                   placeholder="Contraseña" onChange={(e) => setPwd(e.target.value)}
                                                   value={pwd}
                                                   required/>
                                            <div className={`valid-feedback`}></div>

                                        </div>

                                        <button className="btn btn-primary btn-user btn-block">Acceder</button>

                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )


}
export default Login;
