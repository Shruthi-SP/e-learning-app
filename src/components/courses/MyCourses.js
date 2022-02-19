import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { asyncGetAllCourses, asyncGetMyCourses } from '../../actions/coursesAction'
import CourseCard from './CourseCard'

const MyCourses = (props) => {

    const user = useSelector(state=>{
        return state.user
    })
    const courses = useSelector(state => {
        return state.courses
    })

    const [myCourses, setMyCourses] = useState({})
    const [enrolled, setEnrolled] = useState(false)

    const getResult = (arr) => {
        setMyCourses(arr)
        setEnrolled(true)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetMyCourses(getResult))
        dispatch(asyncGetAllCourses())
    }, []) 

    const handleEnrolled = () => {
        setEnrolled(false)
        dispatch(asyncGetMyCourses(getResult))
        dispatch(asyncGetAllCourses())
    }

    return (
        <div>
            {
                myCourses.length > 0 && <Grid container>
                    <Grid container direction="row" sx={{ mt: 1, mb: 1 }}>

                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", pt:1}}><Typography variant='h5'>Courses - {courses.length}</Typography></Grid>

                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                            {(Object.keys(user).length > 0) && <> 
                            {user.role==='admin' ? <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '22px' }} to={`/courses-create`}>Add Course</Link>: <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '22px' }} to={`/courses`}>All Courses</Link> } 
                            </>}
                        </Grid>
                    </Grid>
                    <Grid container >
                        {
                            myCourses.map(ele => {
                                return <Grid item key={ele._id} xs={12} sm={6} md={4} >
                                    <CourseCard course={ele} enrolled={enrolled} handleEnrolled={handleEnrolled} />
                                </Grid>
                            })
                        }
                    </Grid>
                </Grid>
            }
        </div>
    )
}
export default MyCourses