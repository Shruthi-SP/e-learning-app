import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Autocomplete, TextField, Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncEnrollCourseAdmin } from "../../actions/coursesAction"

const CourseEnroll = (props) => {
    const { course, enroll, handleEnroll } = props
    const students = useSelector(state => {
        return state.students
    })

    const [student, setStudent] = useState(null)
    console.log('selected student', student)

    const getResult = (obj) => {
        console.log(obj)
    }

    const defaultProps = {
        options: students,
        getOptionLabel: (option) => option.name,
    }
    const dispatch = useDispatch()
    const handleEnrollCourse = (e, cid, sid) => {
        console.log('modal', cid, sid)
        dispatch(asyncEnrollCourseAdmin(cid, sid, getResult))
        handleEnroll()
    }

    return (
        <div >
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
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props} key={option._id}>
                                            {option.name}
                                        </Box>
                                    )}
                                    renderInput={(params) => <TextField {...params} label="Select the Student" />}
                                />
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => { handleEnrollCourse(e, course._id, student._id) }}>Enroll</Button>
                            <Button onClick={handleEnroll}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        </div>
    )
}
export default CourseEnroll