import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetStudent } from "../../actions/studentsAction"
import jwtDecode from "jwt-decode"

const StudentAccount = (props) => {

    //const [student, setStudent] = useState({})

    // var token = localStorage.getItem('token')
    // var decoded = jwtDecode(token);
    // console.log(decoded);

    // const getStudent = (obj) => {
    //     setStudent(obj)
    // }
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(asyncGetStudent(id, getStudent))
    // }, [])

    const student = useSelector(state=>{
        return state.user
    })

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