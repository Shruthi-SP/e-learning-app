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
    const [unenrolledCourses, setUnerolledCourses] = useState([])

    useEffect(()=>{
        if(courses.length > 0){
            const cid = courses.map(ele=>ele._id)
            const scid = student.courses.map(ele=>ele.course)
            const r = cid.filter(ele=>!scid.includes(ele))
            const ne = r.map(ele=>courses.find(el=>ele===el._id))
            console.log('snen',ne)
            setUnerolledCourses(ne)            
        }
    }, [])

    const getResult = (obj) => {
        //console.log(obj)
    }

    const defaultProps = {
        options: unenrolledCourses,
        getOptionLabel: (option) => option.name
    }
    const dispatch = useDispatch()
    const handleEnrollCourse = (e, cid, sid) => {
        dispatch(asyncEnrollCourseAdmin(cid, sid, getResult))
        handleEnroll()
    }

    return (
        <div >
            {
                unenrolledCourses.length > 0 && <>
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