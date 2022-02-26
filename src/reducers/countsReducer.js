const countIntitalValue = []
const countsReducer = (state = countIntitalValue, action) => {
    switch (action.type) {
        case 'ALL_LECTURES': {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}
export default countsReducer