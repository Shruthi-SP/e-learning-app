const coursesIntialValue = []

const coursesReducer = (state=coursesIntialValue, action) => {
    switch (action.type) {
        case 'GET_ALL_COURSES': {
            return [...action.payload]
        }        
        case 'ADD_COURSE' : {
            return [...state, action.payload]
        }
        case 'UPDATE_COURSE': {
            return state.map((ele)=>{
                if(ele._id === action.payload._id){
                    return { ...ele, ...action.payload }
                }else{
                    return {...ele}
                }
            })
        }
        case 'DELETE_COURSE': {
            return state.filter(ele => {
                return ele._id !== action.payload._id
            })
        }
        default : {
            return [...state]
        }
    }
}
export default coursesReducer