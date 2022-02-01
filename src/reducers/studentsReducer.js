const studentsIntialValue = []

const studentsReducer = (state=studentsIntialValue, action) => {
    switch (action.type) {
        case 'GET_ALL_STUDENTS': {
            return [...action.payload]
        }        
        case 'ADD_STUDENT' : {
            return [...state, action.payload]
        }
        case 'UPDATE_STUDENT': {
            return state.map((ele)=>{
                if(ele._id === action.payload._id){
                    return { ...ele, ...action.payload }
                }else{
                    return {...ele}
                }
            })
        }
        case 'DELETE_STUDENT': {
            return state.filter(ele => {
                return ele._id !== action.payload._id
            })
        }
        default : {
            return [...state]
        }
    }
}
export default studentsReducer