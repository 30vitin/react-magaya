import {Outlet, useNavigate} from "react-router-dom";
import{useState,useEffect} from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersisLogin=()=>{
    const [isLoading, setIsLoading] = useState(true);

    const refresh = useRefreshToken()
    const {auth } = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        let isMounted = true;
        const verifyRefreshToken = async()=>{

            try{
                await refresh();
            }catch (e) {
                console.log(e);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken(): setIsLoading(false);

        return () => isMounted = false;

    },[refresh,setIsLoading,auth])

    //is ronning any time
    useEffect(()=>{

        if(localStorage.getItem('accessToken') === null){
            setIsLoading(false)
            localStorage.removeItem('accessToken')
            navigate("/", { replace: true });
        }

    },[isLoading,auth,navigate])


    return (
        <div>
            <Outlet />
        </div>
    )
}

export default PersisLogin;
