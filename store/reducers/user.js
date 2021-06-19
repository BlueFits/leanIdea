import { GET_USER } from "../actions/user";

const initState = {
    token: null,
    user: {},
};

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_USER:  
            return { 
                token: action.token,
                user: action.user,
            };
        default:
            return state;
    }
};

export default userReducer;