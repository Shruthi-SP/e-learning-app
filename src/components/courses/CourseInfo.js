import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { asyncGetCourse, asyncEnrollCourseStudent, asyncUnenrollCourseAdmin } from "../../actions/coursesAction"
import { asyncGetAllStudents } from "../../actions/studentsAction"
import CourseEnroll from "./CourseEnroll"

const CourseInfo = (props) => {
    const courseId = props.match.params.id

    const [course, setCourse] = useState({})
    const [enroll, setEnroll] = useState(false)

    const user = useSelector(state => {
        return state.user
    })
    const students = useSelector(state => {
        return state.students
    })

    const getResult = (obj) => {
        if (Object.keys(obj).length > 0) {
            setCourse(obj)
        }
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetCourse(courseId, getResult))
        if(user.role==='admin'){
            dispatch(asyncGetAllStudents())
        }
    }, [courseId])

    const getStudentsName = (id) => {
        if (students.length > 0) {
            const student = students.find(ele => ele._id === id)
            return student.name
        }
    }
    const getData = (obj) => {
        console.log(obj)
    }
    const handleEnroll = () => {
        console.log('enrolling')
        if (user.role === 'admin') {
            setEnroll(!enroll)
        }
        else {
            dispatch(asyncEnrollCourseStudent(course._id, getData))
        }
    }
    const handleUnenroll = (e, studentId) => {
        dispatch(asyncUnenrollCourseAdmin(courseId, studentId, getData))
    }

    return (
        <div>
            {
                Object.keys(course).length > 0 && <>
                    <Typography variant="h5">Course - <b>{course.name}</b></Typography><br />
                    <Typography variant="body" >Description: <b>{course.description}</b></Typography><br />
                    <Typography variant="body" >Duration: <b>{course.duration}</b></Typography><br />
                    <Typography variant="body" >Category: <b>{course.category}</b></Typography><br />
                    <Typography variant="body" >Author: <b>{course.author}</b></Typography><br />
                    <Typography variant="body" >Level: <b>{course.level}</b></Typography><br />
                    {(course.students && user.role === 'admin') && <>
                        {<Typography variant="body" >Students Enrolled: {course.students.length > 0 ? <>
                            {course.students.map(ele => {
                                return <li key={ele.student}><b>{getStudentsName(ele.student)}</b><Button variant="outlined" size="small" sx={{ml:1}} onClick={(e)=>{handleUnenroll(e, ele._id)}}>unenroll</Button></li>
                            })}</> : <>
                            <Typography variant="body"><b>No students enrolled</b></Typography><br/></>}</Typography>
                        }
                    </>}
                    <Typography variant="body" >Validity: <b>{course.validity}</b></Typography><br />
                    <Typography variant="body" >ID: <b>{course._id}</b></Typography><br />
                    <Typography variant="body" >Created At: <b>{course.createdAt.slice(0, 10).split('-').reverse().join('-')}</b></Typography><br />
                    <Typography variant="body" >Updated At: <b>{course.updatedAt.slice(0, 10).split('-').reverse().join('-')}</b></Typography><br />
                    {(Object.keys(user).length > 0 && user.role === 'admin') && <>
                    <Typography variant="body" >Created By: <b>{user.username}</b></Typography><br />
                    <Button variant="outlined" size="small" sx={{m:1, ml:0}} onClick={()=>{handleEnroll()}} >enroll</Button> 
                    </>}
                    {user.role==='student' && <br />}
                    <Link style={{ textDecoration: 'none', color: 'blueviolet', fontSize: '0.8800rem', padding: '3px 10px', paddingBottom:'6px',marginTop:'5px', marginBottom: '2px', border:'1px solid blueviolet', borderRadius:'5px' }} to={`/courses`} >BACK</Link> 
                    {enroll && <CourseEnroll course={course} enroll={enroll} handleEnroll={handleEnroll} />}                                    
                </>
            }
        </div>
    )
}
export default CourseInfo