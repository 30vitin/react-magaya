import {combineReducers} from 'redux'
import QuotesDetails from './quotes-details'
const allReaducers = combineReducers({
    data:QuotesDetails
})

export default allReaducers;
