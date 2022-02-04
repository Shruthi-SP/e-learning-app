import { Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetAllCourses } from '../../actions/coursesAction'
import CourseCard from './CourseCard'

const CoursesList = (props) => {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(asyncGetAllCourses())
    }, [])

    const courses = useSelector(state=>{
        return state.courses
    })
    return (
        <div>
            {
                courses.length > 0 && <>
                    <Typography variant='h5'>Courses - {courses.length}</Typography>
                    <Grid container >
                    {
                        courses.map(ele=>{
                            return <Grid item key={ele._id} xs={12} sm={6} md={4} >
                                <CourseCard course={ele} />
                            </Grid>
                        })
                    }
                    </Grid>
                </>
            }
        </div>
    )
}
export default CoursesList