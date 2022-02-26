import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetAllCourses } from "../../actions/coursesAction"
import { asyncGetAllStudents } from "../../actions/studentsAction"
import { Grid, Typography, Divider } from "@mui/material";
import DashboardCard from "./DashboardCard"
import DashboardSelect from "./DashboardSelect"
import Helmet from "react-helmet"
import { asyncGetCounts } from "../../actions/countsAction"

const AdminDashboard = (props) => {

    const [allCourses, setAllCourses] = useState([])
    const [allStudents, setAllStudents] = useState([])
    const [totalLectures, setTotalLectures] = useState([])

    let tlec = []

    const dispatch = useDispatch()

    const getAll = (arr) => {
        //console.log('async response', arr)
        arr.forEach(element => {
            tlec.push(element)
        });
        //setTotalLectures(tlec)
        console.log('lec arr', tlec.length, totalLectures)
    }

    useEffect(() => {
        dispatch(asyncGetAllStudents())
        dispatch(asyncGetAllCourses())
    }, [])

    const user = useSelector(state => {
        return state.user
    })

    const courses = useSelector(state => {
        return state.courses
    })
    // if(courses.length > 0){
    //     courses.map(ele => dispatch(asyncAllLectures(ele._id, getAll)))
    // }
    const students = useSelector(state => {
        return state.students
    })

    useEffect(() => {
        //courses.map(ele => dispatch(asyncAllLectures(ele._id, getAll)))
        setAllCourses(courses)
        setAllStudents(students)
    }, [])
    useEffect(() => {
        setAllCourses(courses)
        setAllStudents(students)
        // dispatch(asyncGetCounts(courses))
    }, [courses, students]) //will work on initial render of the compt and reload of the compt
    //}, []) // will not work on reload 

    useEffect(()=>{
        // if(tlec.length > 0){
        //     setTotalLectures(tlec)
        // }
        // dispatch(asyncGetCounts())
        dispatch(asyncGetCounts(courses))
    //}, [courses]) // will not work at any time
    }, []) // will work on first render of the compnt, but not on reload

    const allLecs = useSelector(state=>{
        return state.counts
    })
    useEffect(()=>{
        setTotalLectures(allLecs)
    }, [allLecs])

    console.log('courses, students', courses, students, totalLectures)

    return (
        <div>
            <Helmet>
                <title>E-Learning| Admin | Dashboard</title>
            </Helmet>
            <Typography variant="h5">{user.username} Dashboard</Typography>
            <Grid container direction='row' >
                <DashboardCard heading='Total Courses' number={allCourses.length} />
                <DashboardCard heading='Total Students' number={allStudents.length} />
                <DashboardCard heading='Total Lectures' number={totalLectures.length} />
            </Grid>
            <Divider sx={{ m: 2, ml: 0 }} />
            <Grid container>
                <Grid item xs={12} sm={6}><>
                    <Typography variant="h6">Recently added Students:</Typography>
                    <DashboardSelect data={students} dataType='students' />
                </>
                </Grid>
                <Grid item xs={12} sm={6}><>
                    <Typography variant="h6" >Recently added Courses:</Typography>
                    <DashboardSelect data={courses} dataType='courses' />
                </>
                </Grid>
            </Grid>
            
        </div>
    )
}
export default AdminDashboard