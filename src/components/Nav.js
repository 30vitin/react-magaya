import React from "react";
import logo from "../img/undraw_profile_2.svg";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const Nav =()=>{
    const {auth } = useAuth()
    const user = auth?.user?.toUpperCase();
    const navigate = useNavigate()
  //  const logout =
    return(
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user}</span>
                        <img src={logo} className="img-profile rounded-circle" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                         aria-labelledby="userDropdown">
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item"  onClick={() => {navigate('/logout', { replace: true });}}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Salir
                        </button>
                    </div>
                </li>

            </ul>

        </nav>

    )

}

export default Nav
