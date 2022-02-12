// import { Grid, Typography, Button } from "@mui/material"
// import { useEffect, useState } from "react"
// import { useDispatch } from "react-redux"
// import { asyncGetLecture } from "../../actions/lecturesAction"
// import { Link } from "react-router-dom"
// import { Tooltip } from "@material-ui/core"
// import { SummarizeOutlined } from "@mui/icons-material"

// const LectureInfo = (props) => {
//     const lectureId = props.match.params.id
//     const courseId = props.match.params.courseId
//     console.log('lec info props', props, lectureId, courseId)

//     const [lecture, setLecture] = useState({})

//     const getResult = (obj) => {
//         if (Object.keys(obj).length > 0 && typeof (obj) === 'object') {
//             console.log('got lec info', obj)
//             setLecture(obj)
//         }
//     }
//     const dispatch = useDispatch()
//     useEffect(() => {
//         dispatch(asyncGetLecture(courseId, lectureId, getResult))
//     }, [])


//     return (
//         <div>
//             {
//                 Object.keys(lecture).length > 0 && <>                    
//                     <Grid container >
//                         <Grid item xs sx={{ display: "flex", justifyContent: "flex-start" }}>
//                             <Typography variant="h4" >{lecture.title}</Typography>
//                         </Grid>
//                         <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
//                             <Link style={{ margin: '5px', marginTop: '10px', textDecoration: 'none' }} to={`/courses/${courseId}/lectures`}><Tooltip title="All Lectures" ><SummarizeOutlined color="primary" /></Tooltip></Link>
//                         </Grid>
//                     </Grid>
//                     <Grid container >
//                         <Grid item xs={12} sm={9} >
//                             {lecture.assetType === 'video' && <iframe width="560" height="315" src={lecture.assetURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}

//                             {lecture.assetType === 'audio' && <audio src={lecture.assetURL} controls autoPlay />}

//                             {lecture.assetType === 'pdf' && <object data={lecture.assetURL} width="600" height="300"></object>}

//                             {lecture.assetType === 'text' && <object data={lecture.assetURL} width="600" height="150"></object>}

//                             {lecture.assetType === 'img' && <img src={lecture.assetURL} width="600" height="150" />}
//                         </Grid>
//                         <Grid item xs={12} sm={3} >
//                             <Button variant="contained">Mark as complete</Button>
//                         </Grid>
//                     </Grid>


//                 </>
//             }
//         </div>
//     )
// }
// export default LectureInfo
import { Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncAddComment, asyncGetLecture, asyncMarkCompleted, asyncUncomment } from "../../actions/lecturesAction"
import { Grid } from "@mui/material"
import { Link } from "react-router-dom"
import { Tooltip } from "@material-ui/core"
import { AddCommentOutlined, SummarizeOutlined } from "@mui/icons-material"
import { asyncGetAllStudents } from "../../actions/studentsAction"
import LectureMarkAsComplete from "./LectureMarkAsComplete"

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
    console.log('lec info props, lecId, cid, user, lec', props, lectureId, courseId, user.role, lecture)

    const getResult = (obj) => {
        if (Object.keys(obj).length > 0 && typeof (obj) === 'object') {
            console.log('got lec info', obj)
            setLecture(obj)
        }
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetLecture(courseId, lectureId, getResult))
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
            else return 'unknown'
        }
    }

    const handleMarkComplete = () => {
        if (user.role === 'admin') {
            console.log('mark complete by admin')
            setMark(!mark)
        }
        else {
            console.log('mark complete by student', lecture._id, user._id)
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
        console.log('posting commment')
        dispatch(asyncAddComment(lecture._id, body, reset))
    }
    const handleUnComment = (e, commentId) => {
        console.log('uncommmentting')
        dispatch(asyncUncomment(lecture._id, commentId, reset))
    }

    return (
        <div>
            {
                Object.keys(lecture).length > 0 && <>

                    <Grid container >
                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-start" }}>
                            <Typography variant="h4" >{lecture.title}</Typography>
                        </Grid>
                        <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
                            <Link style={{margin: '5px', marginTop: '10px', textDecoration: 'none' }} to={`/courses/${courseId}/lectures`}><Tooltip title="All Lectures" ><SummarizeOutlined color="primary" /></Tooltip></Link>
                        </Grid>
                    </Grid>

                    <Grid container >
                        <Grid item xs={12} sm={9} >
                            {lecture.assetType === 'video' && <iframe width="560" height="315" src={lecture.assetURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}

                            {lecture.assetType === 'audio' && <audio src={lecture.assetURL} controls autoPlay />}

                            {lecture.assetType === 'pdf' && <object data={lecture.assetURL} width="600" height="300" ></object>}

                            {lecture.assetType === 'text' && <object data={lecture.assetURL} width="600" height="300"></object>}

                            {lecture.assetType === 'img' && <img src={lecture.assetURL}  width="500" height="300" />}
                            <br />
                            <Tooltip sx={{mt:1}} title='Add comment'><AddCommentOutlined /></Tooltip>
                            <Grid container >
                                <Grid item xs={12} sm={9} >
                                    <TextField style={{ minWidth: '475px' }}
                                        multiline
                                        rows={2}
                                        label='write a comment here...'
                                        name='comment'
                                        value={comment}
                                        onChange={(e) => { setComment(e.target.value) }}
                                    />
                                    <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
                                        <Button variant="contained" size="small" sx={{ mt: 1, mr: 1 }} color='success' onClick={handlePostComment}>Post</Button>
                                    </Grid>
                                    {
                                        lecture.comments.length > 0 && <>{
                                            lecture.comments.map(ele => {
                                                return <Box key={ele._id} sx={{ m: 1, ml: 0, p: 1, pr: 0 }} border='1px solid rgba(0, 0, 0, 0.1)' borderRadius='10px'>
                                                    <Typography variant="h6">{getStudentName(ele.student)}</Typography>
                                                    <Grid container >
                                                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-start" }}>
                                                            <Typography variant="body" sx={{ m: 1 }}>{ele.body}</Typography>
                                                        </Grid>
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
                        {mark && <LectureMarkAsComplete lecture={lecture} mark={mark} handleMarkComplete={handleMarkComplete} />}
                        {completed && <Dialog open={completed} onClose={handleStudentsCompleted} fullWidth={true}>
                            <DialogTitle>Students completed <b>{lecture.title}</b></DialogTitle>
                            <DialogContent>
                                {
                                    lecture.students.length > 0 ? <ol>{
                                        lecture.students.map(ele => {
                                            return <li key={ele.student}>{getStudentName(ele.student)}</li>
                                        })
                                    }</ol> : <Typography>No students yet</Typography>
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

