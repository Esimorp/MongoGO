import {handleActions} from "redux-actions";
import {combineReducer} from "redux";

const databases = handleActions({
    ['databases/connected'](state) {
        return {...state, connected: true};
    },
}, {
    connected: false,
});

export default databases;
