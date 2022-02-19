import axios from 'axios';
import {Apiurl} from "../services/utils";

export default axios.create({
    baseURL: Apiurl,

});
export const axiosPrivate = axios.create({
    baseURL: Apiurl,
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization"},
    withCredentials: true
});
