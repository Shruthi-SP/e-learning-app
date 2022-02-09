import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Autocomplete, TextField, Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncEnrollCourseAdmin } from "../../actions/coursesAction"

const StudentEnroll = (props) => {
    const { student, enroll, handleEnroll } = props
    const courses = useSelector(state => {
        return state.courses
    })

    const [course, setCourse] = useState(null)

    const getResult = (obj) => {
        //console.log(obj)
    }

    const defaultProps = {
        options: courses,
        getOptionLabel: (option) => option.name
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
                courses.length > 0 && <>
                    <Dialog open={enroll} onClose={handleEnroll} fullWidth={true}>
                        <DialogTitle>Enrolling {student.name} to a course </DialogTitle>
                        <DialogContent>
                            <Grid>
                                <Autocomplete
                                    {...defaultProps}
                                    sx={{ width: 300, m: 2 }}
                                    value={course}
                                    onChange={(event, newValue) => {
                                        setCourse(newValue);
                                    }}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props} key={option._id}>
                                            {option.name}
                                        </Box>
                                    )}
                                    renderInput={(params) => <TextField {...params} label="Select the Course" />}
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
export default StudentEnroll