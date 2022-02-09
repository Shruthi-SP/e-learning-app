const lecturesIntialValue = []

const lecturesReducer = (state=lecturesIntialValue, action) => {
    switch (action.type) {
        case 'GET_ALL_LECTURES': {
            return [...action.payload]
        }        
        case 'ADD_LECTURES' : {
            return [...state, action.payload]
        }
        case 'UPDATE_LECTURES': {
            return state.map((ele)=>{
                if(ele._id === action.payload._id){
                    return { ...ele, ...action.payload }
                }else{
                    return {...ele}
                }
            })
        }
        case 'DELETE_LECTURES': {
            return state.filter(ele => {
                return ele._id !== action.payload._id
            })
        }
        default : {
            return [...state]
        }
    }
}
export default lecturesReducer