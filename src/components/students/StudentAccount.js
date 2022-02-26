import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetAllCourses, asyncGetMyCourses } from "../../actions/coursesAction"
import Helmet from 'react-helmet'

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

    const courses = useSelector(state=>{
        return state.courses
    })

    const getCourseName = (id) => {
        if(courses.length > 0){
            const course = courses.find(ele => ele._id === id)
            return course.name 
        }
        else return 'course unavailable'
    }

    return (
        <div>
            <Helmet>
                <title>E-Learning | Admin | Student Account</title>
            </Helmet>
            {
                Object.keys(student).length > 0 && <>
                    <h2>{student.name} Info</h2>
                    <p>Name: <b>{student.name}</b></p>
                    <p>Email: <b>{student.email}</b></p>
                    <p style={{marginBottom:'0px'}}>Courses enrolled:</p>
                    <ol style={{marginBottom:'0px'}}>
                        {student.courses.map(ele=>{
                            return <li key={ele._id}>
                                <b>{getCourseName(ele.course)}</b>
                            </li>
                        })}
                    </ol>
                    <p>Role: <b>{student.role}</b></p>
                </>
            }
        </div>
    )
}
export default StudentAccount