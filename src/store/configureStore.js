import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk'
import studentsReducer from "../reducers/studentsReducer";
import userReducer from "../reducers/userReducer"

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        students: studentsReducer
    }), applyMiddleware(thunk))
    return store
}
export default configureStore