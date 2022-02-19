import {Link} from "react-router-dom";

const Logout=()=>{


    localStorage.removeItem('accessToken')

    return <Link to={{pathname: '/'}} />
};

export default Logout;
