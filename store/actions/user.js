export const GET_USER = "GET_USER";

export const getUser = (token, user) => {
    return {
        type: GET_USER,
        token,
        user,
    };
};