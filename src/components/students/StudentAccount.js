import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetAllCourses, asyncGetMyCourses } from "../../actions/coursesAction"

const StudentAccount = (props) => {

    const student = useSelector(state=>{
        return state.user
    })

    const getResult = (arr) => {
        //console.log(arr)
    }

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(asyncGetAllCourses())
        dispatch(asyncGetMyCourses(getResult))
    }, [])

    return (
        <div>
            {
                Object.keys(student).length > 0 && <>
                    <h2>{student.name} Info</h2>
                    <p>Name: <b>{student.name}</b></p>
                    <p>ID: <b>{student._id}</b></p>
                    <p>Email: <b>{student.email}</b></p>
                    <p>Role: <b>{student.role}</b></p>
                    <p>Number of Courses enrolled: <b>{student.courses.length}</b></p>
                    <p>CreatedBy: <b>{student.user}</b></p>
                </>
            }
        </div>
    )
}
export default StudentAccount