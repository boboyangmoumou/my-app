export const ADD_SHOPCART = 'ADD_SHOPCART';
export const DELETE_GOOD = 'DELETE_GOOD';
export const LOGINSUBMIT = 'LOGINSUBMIT'
export function loginSubmit(userName){
    return {
        type: LOGINSUBMIT,
        userName
    }
}