const inititalState = {

    payload: [],
};

 const QuotesDetails = (state = inititalState, action) => {
    switch (action.type) {
        case "findCurrentGuid":
            return { ...state, payload: action.payload };
        default:
            return state;
    }
};
export default QuotesDetails;
