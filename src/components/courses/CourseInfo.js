import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { asyncGetCourse } from "../../actions/coursesAction"
import { asyncGetAllStudents } from "../../actions/studentsAction"


const CourseInfo = (props) => {
    const courseId = props.match.params.id

    const [course, setCourse] = useState({})

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
                                return <li key={ele._id}><b>{getStudentsName(ele.student)}</b><Button variant="outlined" size="small" sx={{ml:1}}>unenroll</Button></li>
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
                    <Button variant="outlined" size="small" sx={{m:1, ml:0}} >enroll</Button>
                    <Link style={{ textDecoration: 'none', color: 'blueviolet', fontSize: '0.8800rem', padding: '4px 10px', paddingBottom:'6px', marginBottom: '2px', border:'1px solid blueviolet', borderRadius:'5px' }} to={`/courses`} >BACK</Link>
                    </>}                  
                </>
            }
        </div>
    )
}
export default CourseInfo