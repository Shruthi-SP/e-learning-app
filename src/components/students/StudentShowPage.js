import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { asyncGetStudent } from "../../actions/studentsAction"
import { asyncGetAllCourses, asyncUnenrollCourseAdmin } from "../../actions/coursesAction"
import { Typography, Grid, Tooltip, Button } from "@mui/material"
import { KeyboardDoubleArrowLeft } from "@mui/icons-material"
import StudentEnroll from "./StudentEnroll"

const StudentShowPage = (props) => {
    const id = props.match.params.id
    const courses = useSelector(state => {
        return state.courses
    })
    const [student, setStudent] = useState({})
    const [enroll, setEnroll] = useState(false)

    const getStudent = (obj) => {
        setStudent(obj)
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetStudent(id, getStudent))
        dispatch(asyncGetAllCourses())
    }, [])

    const user = useSelector(state => {
        return state.user
    })

    const getCourseName = (id) => {
        if (courses.length > 0) {
            const course = courses.find(ele => ele._id === id)
            return course.name
        }
        else return 'course unavailable'
    }

    const getData = (obj) => {
        console.log('getting enrolled/unenroll obj=',obj)
        setEnroll(false)
    }
    const handleEnroll = () => {
        console.log('enrolling', (!enroll))
        setEnroll(!enroll)
    }
    const handleUnenroll = (e, courseId) => {
        console.log('unerolling by admin cid and sid', courseId, id)
        dispatch(asyncUnenrollCourseAdmin(courseId, id, getData))
    }

    return (
        <div>
            <Grid container direction="row" sx={{ mt: 1, mb: 1 }}>
                <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", pt: 1 }}><Typography variant='h5'>{student.name}'s details:</Typography></Grid>

                <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '22px' }} to={`/admin/students`}><Tooltip title="Back" ><KeyboardDoubleArrowLeft /></Tooltip></Link>
                </Grid>
            </Grid>
            {
                Object.keys(student).length > 0 && <>
                    <Typography>Name: <b>{student.name}</b></Typography>
                    <Typography>ID: <b>{student._id}</b></Typography>
                    <Typography>Email: <b>{student.email}</b></Typography>
                    <Typography>Role: <b>{student.role}</b></Typography>
                    <Typography sx={{ mb: 0 }}>Courses enrolled:</Typography>
                    {
                        student.courses.length > 0 ?
                            <ol style={{ margin: '0px' }}>
                                {student.courses.map(ele => {
                                    return <li key={ele._id}>
                                        <b>{getCourseName(ele.course)}</b>
                                        <Button variant="outlined" size="small" sx={{ ml: 1 }} onClick={(e) => { handleUnenroll(e, ele.course) }}>unenroll</Button>
                                    </li>
                                })}
                            </ol> : <b>Not enrolled to any course</b>
                    }
                    <Typography sx={{ m: 1 }}>CreatedBy: <b>{user.username}</b></Typography>
                </>
            }
            <Button variant="outlined" size="small" sx={{ ml: 1 }} onClick={handleEnroll}>enroll</Button>
            {enroll && <StudentEnroll student={student} enroll={enroll} handleEnroll={handleEnroll} />}
        </div>
    )
}
export default StudentShowPage