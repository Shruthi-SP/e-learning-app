import PropTypes from 'prop-types';
import { Grid, Box, Tabs, Tab, Typography, Button } from '@mui/material'
import { Link, Redirect } from 'react-router-dom';
import { Tooltip } from "@material-ui/core"
import { KeyboardDoubleArrowLeft } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetCourse, asyncEnrollCourseStudent, asyncUnenrollCourseAdmin, asyncGetAllCourses } from "../../actions/coursesAction"
import { asyncGetAllStudents } from "../../actions/studentsAction"
import CourseEnroll from "./CourseEnroll"
import { asyncAllLectures } from '../../actions/lecturesAction';
import Helmet from 'react-helmet';

const CourseShowPage = (props) => {
    const courseId = props.match.params.id
    const [value, setValue] = useState(0);

    const [course, setCourse] = useState({})
    const [enroll, setEnroll] = useState(false)
    const [isEnrolled, setIsEnrolled] = useState(false)

    const user = useSelector(state => {
        return state.user
    })
    const students = useSelector(state => {
        return state.students
    })

    const getResult = (obj) => {
        if (Object.keys(obj).length > 0 && typeof (obj) === 'object') {
            setCourse(obj)
        }
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetCourse(courseId, getResult))
        dispatch(asyncGetAllCourses())
        dispatch(asyncAllLectures(courseId))
        if (user.role === 'admin') {
            dispatch(asyncGetAllStudents())
        }

    }, [courseId, enroll])
    useEffect(() => {
        if (Object.keys(course).length > 0) {
            const s = course.students.find(ele => ele.student === user._id)
            if (s) {
                setIsEnrolled(true)
            }
        }
    })

    const getStudentsName = (id) => {
        if (students.length > 0) {
            const student = students.find(ele => ele._id === id)
            if (student) {
                return student.name
            }
            else return 'unavailable'
        }
    }
    const getData = (obj) => {
        if (typeof (obj) === 'object') {
            setCourse(obj)
        }
    }
    const handleEnroll = () => {
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography component='div'>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <>
            <Helmet>
                <title>E-Learning | Course</title>
            </Helmet>
            {(Object.keys(course).length > 0) ? <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Grid container direction="row" >
                        <Grid item xs={10} sx={{ display: "flex", justifyContent: "flex-start", pt: 1 }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Course Details" {...a11yProps(0)} />
                                {user.role === 'admin' && <Tab label="Students Enrolled" {...a11yProps(1)} />}
                                {(user.role === 'admin' || isEnrolled) && <Tab label='lectures' {...a11yProps(2)} />}
                            </Tabs>
                        </Grid>
                        <Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
                            {(user.role === 'admin' || isEnrolled) && <Link style={{ margin: '12px', textDecoration: 'none', fontSize: '15px', color: '#357EC7' }} to={`/courses/${courseId}/lectures`}>LECTURES</Link>}
                            <Link style={{ margin: '5px', marginTop: '10px', textDecoration: 'none' }} to={`/courses`} ><Tooltip title="All Courses" ><KeyboardDoubleArrowLeft color="primary" /></Tooltip></Link>
                        </Grid>
                    </Grid>
                </Box>
                <TabPanel value={value} index={0}>
                    <div>
                        <Typography variant="body" >Course Name: <b>{course.name}</b></Typography><br />
                        <Typography variant="body" >Category: <b>{course.category}</b></Typography><br />
                        <Typography variant="body" >Duration: <b>{course.duration} months</b></Typography><br />
                        <Typography variant="body" >Author: <b>{course.author}</b></Typography><br />
                        <Typography variant="body" >Level: <b>{course.level}</b></Typography><br />
                        <Typography variant="body" >Validity: <b>{course.validity} months</b></Typography><br />
                        <Typography variant="body" >Release Date: <b>{course.releaseDate.slice(0, 10).split('-').reverse().join('-')}</b></Typography><br />
                        <Typography variant="body" >Created At: <b>{course.createdAt.slice(0, 10).split('-').reverse().join('-')}</b></Typography><br />
                        <Typography variant="body" >Updated At: <b>{course.updatedAt.slice(0, 10).split('-').reverse().join('-')}</b></Typography><br />
                        {(Object.keys(user).length > 0 && user.role === 'admin') && <>
                            <Typography variant="body" >Created By: <b>{user.username}</b></Typography><br />
                        </>}
                        {(user.role === 'student' && !isEnrolled) && <><Button variant="contained" color='success' size="small" sx={{ m: 1, ml: 0 }} onClick={handleEnroll} >enroll</Button><span style={{ color: '#22bb33' }}>Enroll to the course to view lectures</span></>}
                    </div>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    {isEnrolled ? <Redirect to={`/courses/${courseId}/lectures`} /> :
                        <><Typography variant="body" >Students Enrolled: {course.students.length > 0 ? <>
                            {course.students.map(ele => {
                                return <li key={ele.student}>
                                    <Link style={{ textDecoration: 'none', color: '#2B547E' }} to={`/admin/students/${ele.student}`}><b>{getStudentsName(ele.student)}</b></Link>
                                    <Button variant="outlined" color='error' size="small" sx={{ ml: 1 }} onClick={(e) => { handleUnenroll(e, ele.student) }}>unenroll</Button></li>
                            })}</> : <>
                            <Typography variant="body"><b>No students enrolled yet.</b></Typography><br /></>}</Typography>
                            <Button variant="contained" color='success' size="small" sx={{ m: 1, ml: 0 }} onClick={handleEnroll} >enroll students</Button></>}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Redirect to={`/courses/${courseId}/lectures`} />
                </TabPanel>
                {enroll && <CourseEnroll course={course} enroll={enroll} handleEnroll={handleEnroll} />}
            </Box> : <Grid container direction='row'>
                <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", pt: 1 }}><Typography variant='h6' color='error'>Course record not found</Typography></Grid>
                <Grid item xs sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}><Link style={{ margin: '5px', marginTop: '5px', textDecoration: 'none' }} to={`/courses`} ><Tooltip title="All Courses" ><KeyboardDoubleArrowLeft color="primary" /></Tooltip></Link></Grid>
            </Grid>}
        </>
    );
}
export default CourseShowPage