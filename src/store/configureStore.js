import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk'
import countsReducer from "../reducers/countsReducer";
import coursesReducer from "../reducers/coursesReducer";
import lecturesReducer from "../reducers/lecturesReducer";
import studentsReducer from "../reducers/studentsReducer";
import userReducer from "../reducers/userReducer"

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        students: studentsReducer,
        courses: coursesReducer,
        lectures: lecturesReducer,
        counts: countsReducer
    }), applyMiddleware(thunk))
    return store
}
export default configureStore