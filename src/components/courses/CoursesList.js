import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { asyncGetAllCourses } from '../../actions/coursesAction'
import { asyncGetAllStudents } from '../../actions/studentsAction'
import CourseCard from './CourseCard'

const CoursesList = (props) => {

    const user = useSelector(state=>{
        return state.user
    })
    const courses = useSelector(state => {
        return state.courses
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetAllCourses())
        if(user.role==='admin'){
            dispatch(asyncGetAllStudents())
        }
    }, []) 

    return (
        <div>
            {
                courses.length > 0 && <Grid container>
                    <Grid container direction="row" sx={{ mt: 1, mb: 1 }}>

                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", pt:1}}><Typography variant='h5'>Courses - {courses.length}</Typography></Grid>

                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                            {(Object.keys(user).length > 0) && <> 
                            {user.role==='admin' && <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '22px' }} to={`/courses-create`}>Add Course</Link>} 
                            </>}
                        </Grid>
                    </Grid>
                    <Grid container >
                        {
                            courses.map(ele => {
                                return <Grid item key={ele._id} xs={12} sm={6} md={4} >
                                    <CourseCard course={ele} />
                                </Grid>
                            })
                        }
                    </Grid>
                </Grid>
            }
        </div>
    )
}
export default CoursesList