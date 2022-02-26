import axios from "../config/axios-config"

export const asyncGetCounts = (courses) => {
    return(dispatch) => {
        console.log('para', courses.length)
        // const stateVar = useSelector(state=>{
        //     return state
        // })
         // let store = configureStore()
        // let storeVars = store.getState()
        
        // console.log('storeVars', storeVars)

        // const res = []
        // cosnt count = 0
        // for(){
        //     axios(){
        //         then({
        //             res.push(res,data)
        //             count += res.data.length
        //         })
        //     }
        // }
        // courseIds.map((id)=>{

        // })
        const totalLecs = []
        const count = 0
        for(let i=0 ; i< courses.length; i++){
            axios.get(`/courses/${courses[i]._id}/lectures`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.hasOwnProperty('errors')) {
                        //console.log('then', result)
                    }
                    else {   
                        //console.log('result',result)
                        totalLecs.push(result)
                                     
                        //dispatch(allLectures(result))
                    }
                })
                .catch((err) => {
                    //console.log('catch', err)
                })
        }
        let allLecs = []
        setTimeout(()=>{
            console.log('total=', totalLecs) 
            totalLecs.map(ele=>ele.map(e=>allLecs.push(e)))
            console.log('totalAlllecs',allLecs)
            dispatch(allLectures(allLecs))
        }, 3000)
        

    }
}
export const allLectures = (arr) => {
    return {type: 'ALL_LECTURES', payload: arr}
}