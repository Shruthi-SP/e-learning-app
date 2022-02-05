import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetAllCourses } from "../../actions/coursesAction"
import { asyncGetAllStudents } from "../../actions/studentsAction"

const StudentAccount = (props) => {

    const student = useSelector(state=>{
        return state.user
    })

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(asyncGetAllStudents())
        dispatch(asyncGetAllCourses())
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