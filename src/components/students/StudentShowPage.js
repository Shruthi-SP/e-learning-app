import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { asyncGetStudent } from "../../actions/studentsAction"
import { asyncGetAllCourses, asyncUnenrollCourseAdmin } from "../../actions/coursesAction"
import { Typography, Grid, Tooltip, Button, Card, CardContent, CardMedia, Box } from "@mui/material"
import { KeyboardDoubleArrowLeft } from "@mui/icons-material"
import StudentEnroll from "./StudentEnroll"
import { CardActions } from "@material-ui/core"

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
    }, [id, enroll])

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
        dispatch(asyncGetStudent(id, getStudent))
    }
    const handleEnroll = () => {
        setEnroll(!enroll)
    }
    const handleUnenroll = (e, courseId) => {
        dispatch(asyncUnenrollCourseAdmin(courseId, id, getData))
    }

    return (
        <div>
            <Grid container direction="row" sx={{ mt: 1, mb: 1 }}>
                <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", pt: 1 }}><Typography variant='h5'>Student details:</Typography></Grid>

                <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '22px' }} to={`/admin/students`}><Tooltip title="Back" ><KeyboardDoubleArrowLeft /></Tooltip></Link>
                </Grid>
            </Grid>
            {
                Object.keys(student).length > 0 ? <Card sx={{ display: 'flex', maxWidth: 600 }} >
                    <CardMedia
                        component="img"
                        sx={{ width: 250 }}
                        image="https://previews.123rf.com/images/stalkerstudent/stalkerstudent1601/stalkerstudent160101173/50961996-user-icon-vector-flat-design-style-eps-10.jpg"
                        alt="user profile image"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent >
                            <Typography>Name: <b>{student.name}</b></Typography>
                            <Typography>Email: <b>{student.email}</b></Typography>
                            <Typography>Role: <b>{student.role}</b></Typography>
                            <Typography sx={{ mb: 0 }}>Courses enrolled:</Typography>
                            {
                                student.courses.length > 0 ?
                                    <ol>
                                        {student.courses.map(ele => {
                                            return <li key={ele._id}>
                                                <Link style={{ textDecoration: 'none', color: '#2B547E' }} to={`/courses/${ele.course}`}><b>{getCourseName(ele.course)}</b></Link>
                                                <Button color="warning" size="small" sx={{ ml: 1 }} onClick={(e) => { handleUnenroll(e, ele.course) }}>unenroll</Button>
                                            </li>
                                        })}
                                    </ol> : <b>Not enrolled to any course</b>
                            }
                            <Typography>CreatedBy: <b>{user.username}</b></Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" size="small" color="success" onClick={() => { setEnroll(!enroll) }}>enroll</Button>
                        </CardActions>
                    </Box>
                </Card> : <Typography variant="h6" color='error'>Student record is deleted</Typography>
            }
            {enroll && <StudentEnroll student={student} enroll={enroll} handleEnroll={handleEnroll} />}
        </div>
    )
}
export default StudentShowPage
