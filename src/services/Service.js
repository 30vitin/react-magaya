import axios from "../api/axios";

export default class Service {

    async list(guid) {
        const TRANSACTION_ID_URL = '/api/get-transacctions-id';
        try {
            const result = await axios.post(TRANSACTION_ID_URL,JSON.stringify({guid: guid}),{
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}
