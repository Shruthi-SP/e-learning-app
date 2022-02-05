import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetCourse } from "../../actions/coursesAction"

const CourseInfo = (props) => {
    const courseId = props.match.params.id
    console.log('course id=', courseId)

    const [course, setCourse] = useState({})
    const [userRole, setUserRole] = useState('')

    const user = useSelector(state => {
        return state.user
    })

    const getResult = (obj) => {
        if (Object.keys(obj).length > 0) {
            setCourse(obj)
        }
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetCourse(courseId, getResult))
        if (Object.keys(user).length > 0) {
            setUserRole(user.role)
        }
    }, [courseId])

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
                    {course.students && <Typography variant="body" >Students Enrolled: {course.students.map(ele => {
                        return <li key={ele._id}><b>{ele.student}</b></li>
                    })}</Typography>}
                    <Typography variant="body" >Validity: <b>{course.validity}</b></Typography><br />
                    <Typography variant="body" >ID: <b>{course._id}</b></Typography><br />
                    <Typography variant="body" >Created At: <b>{course.createdAt.slice(0, 10).split('-').reverse().join('-')}</b></Typography><br />
                    <Typography variant="body" >Updated At: <b>{course.updatedAt.slice(0, 10).split('-').reverse().join('-')}</b></Typography><br />
                    <Typography variant="body" >Created By: <b>{course.user}</b></Typography><br />
                    {userRole === 'admin' && <Button variant="contained" size="small" sx={{ m: 1, ml: 0 }}>Update</Button>}
                </>
            }
        </div>
    )

}
export default CourseInfo