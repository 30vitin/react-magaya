import axios from "../../api/axios";

const TRANSACTION_ID_URL = '/api/get-transacctions-id';
export const type = 'findCurrentGuid';

export const fetchQuoteDetail = (guid) => {

    return (dispatch) => {
        dispatch(fetchQuoteDetailSuccess([]))
        axios
            .post(TRANSACTION_ID_URL, JSON.stringify({guid: guid}), {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
                }
            })
            .then(response => {
                // response.data is the users
                const payload = response.data.Quotation
                dispatch(fetchQuoteDetailSuccess(payload))
            })
            .catch(error => {
                // error.message is the error message
                console.log(error)
            })
    }
}


export const fetchQuoteDetailSuccess = payload => {
    return {
        type,
        payload: payload
    }
}

