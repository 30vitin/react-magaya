import useAuth from "./useAuth";
import {useState} from "react";

const useLogout = () =>{

    const {setAuth} = useAuth();
    const [setIsLoading] = useState(true);
    const logout = async()=>{

        setAuth({})
        localStorage.removeItem('accessToken')
        setIsLoading(false)
    }

    return logout;
}

export default useLogout;
