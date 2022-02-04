import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk'
import coursesReducer from "../reducers/coursesReducer";
import studentsReducer from "../reducers/studentsReducer";
import userReducer from "../reducers/userReducer"

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        students: studentsReducer,
        courses: coursesReducer
    }), applyMiddleware(thunk))
    return store
}
export default configureStore