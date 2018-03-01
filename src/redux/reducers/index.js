import {
    ADD_SHOPCART,
    DELETE_GOOD,
    LOGINSUBMIT
} from '../actions';
const initialState = {
    updateUserInfo: ''
}

function changeMnunt(state = initialState,action){
    switch(action.type){
        case LOGINSUBMIT:
        return action.userName
        default:
        return state
    }
}

export default changeMnunt;