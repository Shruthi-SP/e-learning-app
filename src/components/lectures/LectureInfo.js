import { Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncAddComment, asyncGetLecture, asyncMarkCompleted, asyncUncomment } from "../../actions/lecturesAction"
import { Grid } from "@mui/material"
import { Link } from "react-router-dom"
import { Tooltip } from "@material-ui/core"
import { AddCommentOutlined, KeyboardDoubleArrowLeft, } from "@mui/icons-material"
import { asyncGetAllStudents } from "../../actions/studentsAction"
import LectureMarkAsComplete from "./LectureMarkAsComplete"
import { asyncGetCourse } from "../../actions/coursesAction"

const LectureInfo = (props) => {
    const lectureId = props.match.params.id
    const courseId = props.match.params.courseId

    const user = useSelector(state => {
        return state.user
    })
    const students = useSelector(state => {
        return state.students
    })

    const [lecture, setLecture] = useState({})
    const [completed, setCompleted] = useState(false)
    const [mark, setMark] = useState(false)
    const [comment, setComment] = useState('')
    const [toggle, setToggle] = useState(false)
    const [enrolledStudents, setEnrolledStudents] = useState([])
    const [course, setCourse] = useState({})

    const getResult = (obj) => {
        if (Object.keys(obj).length > 0 && typeof (obj) === 'object') {
            setLecture(obj)
        }
    }
    const getCourse = (obj) => {
        if (Object.keys(obj).length > 0 && typeof (obj) === 'object') {
            setCourse(obj)
            const es = obj.students.map(ele => students.find(e => e._id === ele.student))
            const r = es.filter(ele=>ele!==undefined)
            setEnrolledStudents(r)
        }
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetLecture(courseId, lectureId, getResult))
        dispatch(asyncGetCourse(courseId, getCourse))

        if (user.role === 'admin') {
            dispatch(asyncGetAllStudents())
        }
    }, [mark, completed, toggle])

    const getStudentName = (id) => {
        if (students.length > 0) {
            const student = students.find(ele => ele._id === id)
            if (student) {
                return student.name
            }
            else return 'Unknown'
        }
    }

    const handleMarkComplete = () => {
        if (user.role === 'admin') {
            setMark(!mark)
        }
        else {
            dispatch(asyncMarkCompleted(lecture._id, user._id))
        }
    }
    const handleStudentsCompleted = () => {
        setCompleted(!completed)
    }
    const reset = () => {
        setComment('')
        setToggle(!toggle)
    }
    const handlePostComment = () => {
        const body = {
            body: comment
        }
        dispatch(asyncAddComment(lecture._id, body, reset))
    }
    const handleUnComment = (e, commentId) => {
        dispatch(asyncUncomment(lecture._id, commentId, reset))
    }

    return (
        <div>
            {
                Object.keys(lecture).length > 0 && <>

                    <Grid container >
                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-start" }}>
                            <Typography variant="h5" >{course.name} - {lecture.title}</Typography>
                        </Grid>
                        <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
                            <Link style={{ margin: '5px', marginTop: '10px', textDecoration: 'none' }} to={`/courses/${courseId}/lectures`}><Tooltip title="All Lectures" ><KeyboardDoubleArrowLeft color="primary" /></Tooltip></Link>
                        </Grid>
                    </Grid>

                    <Grid container >
                        <Grid item xs={12} sm={9} >
                            {lecture.assetType === 'video' && <iframe width="560" height="315" src={lecture.assetURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}

                            {lecture.assetType === 'audio' && <audio src={lecture.assetURL} controls autoPlay />}

                            {lecture.assetType === 'pdf' && <object data={lecture.assetURL} width="600" height="300" ></object>}

                            {lecture.assetType === 'text' && <object data={lecture.assetURL} width="600" height="150"></object>}

                            {lecture.assetType === 'img' && <img src={lecture.assetURL} width="500" height="300" />}
                            <br />
                            <Tooltip sx={{ mt: 1 }} title='Add comment'><AddCommentOutlined /></Tooltip>
                            <Grid container >
                                <Grid item xs={12} sm={9} >
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={2}
                                        label='write a comment here...'
                                        name='comment'
                                        value={comment}
                                        onChange={(e) => { setComment(e.target.value) }}
                                    />
                                    <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
                                        <Button variant="contained" size="small" sx={{ mt: 1 }} color='success' onClick={handlePostComment}>Post</Button>
                                    </Grid>
                                    {
                                        lecture.comments.length > 0 && <>{
                                            lecture.comments.map(ele => {
                                                return <Box key={ele._id} sx={{ m: 1, ml: 0, mr: 0, p: 1, pr: 0 }} border='1px solid rgba(0, 0, 0, 0.1)' borderRadius='5px'>
                                                    <Typography variant="h6">{getStudentName(ele.student)}</Typography>
                                                    <Typography variant="body" sx={{ m: 1 }}>{ele.body}</Typography>
                                                    <Grid container >
                                                        <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
                                                            {(user.role === 'admin' || user._id === ele.student) && <Button variant="contained" size="small" sx={{ m: 1, mr: 0 }} color='warning' onClick={(e) => { handleUnComment(e, ele._id) }}>Uncomment</Button>}
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            })
                                        }</>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Button variant="contained" sx={{ m: 1, ml: 0 }} onClick={handleMarkComplete} >Mark as complete</Button>
                            {user.role === 'admin' && <Button variant="contained" sx={{ m: 0, mt: 3 }} onClick={() => { setCompleted(!completed) }}>Students completed</Button>}
                        </Grid>

                        {mark && <LectureMarkAsComplete enrolledStudents={enrolledStudents} lecture={lecture} mark={mark} handleMarkComplete={handleMarkComplete} />}

                        {completed && <Dialog open={completed} onClose={handleStudentsCompleted} fullWidth={true}>
                            <DialogTitle>Students completed <b>{lecture.title}</b></DialogTitle>
                            <DialogContent>
                                {
                                    lecture.students.length > 0 ? <ol>{
                                        lecture.students.map(ele => {
                                            return <li key={ele._id}>{getStudentName(ele.student)}</li>
                                        })
                                    }</ol> : <Typography>No students completed yet</Typography>
                                }
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleStudentsCompleted}>Close</Button>
                            </DialogActions>
                        </Dialog>}
                    </Grid>
                </>
            }
        </div>
    )
}
export default LectureInfo

