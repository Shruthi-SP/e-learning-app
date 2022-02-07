import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Autocomplete, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncEnrollCourseAdmin } from "../../actions/coursesAction"

const CourseEnroll = (props) => {
    const { course, enroll, handleEnroll } = props
    const students = useSelector(state => {
        return state.students
    })

    //const [course, setCourse] = useState({})
    const [student, setStudent] = useState(null)
    console.log('selected student', student)

    const getResult = (obj) => {
        if (Object.keys(obj).length > 0) {
            //setCourse(obj)
            console.log(obj)
        }
    }
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(asyncGetAllStudents())
    // }, [courseId])

    //const formSubmission = (formData) => {
    // console.log(course._id, formData)
    // dispatch(asyncUpdateCourse(course._id, formData))
    // handleEdit()
    //}
    const defaultProps = {
        options: students,
        getOptionLabel: (option) => option.name,
    }
    const dispatch = useDispatch()
    const handleEnrollCourse = (cid, sid) => {
        dispatch(asyncEnrollCourseAdmin(cid, sid, getResult))
        handleEnroll()
    }

    return (
        <div >
            {/* style={{width:'625px', margin:'20px auto', padding:'10px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius:'10px'}} */}
            {
                students.length > 0 && <>
                    <Dialog open={enroll} onClose={handleEnroll} fullWidth={true}>
                        <DialogTitle>Enroll to the course {course.name} </DialogTitle>
                        <DialogContent>
                            <Grid>
                                <Autocomplete
                                    {...defaultProps}
                                    sx={{ width: 300, m: 2 }}
                                    value={student}
                                    onChange={(event, newValue) => {
                                        setStudent(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Select the Student" />}
                                />
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>{handleEnrollCourse(course._id, student._id)}}>Enroll</Button>
                            <Button onClick={handleEnroll}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        </div>
    )
}
export default CourseEnroll