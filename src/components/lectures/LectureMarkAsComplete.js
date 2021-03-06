import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Autocomplete, TextField, Box } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncMarkCompleted } from "../../actions/lecturesAction"

const LectureMarkAsComplete = (props) => {
    const { enrolledStudents, lecture, mark, handleMarkComplete } = props
    const students = useSelector(state => {
        return state.students
    })

    const [student, setStudent] = useState(null)

    const defaultProps = {
        options: enrolledStudents,
        getOptionLabel: (option) => option.name,
    }
    const dispatch = useDispatch()
    const handleMark = (e, sid) => {
        dispatch(asyncMarkCompleted(lecture._id, sid))
        handleMarkComplete()
    }

    return (
        <div >
            {
                // students.length > 0 && <>
                    <Dialog open={mark} onClose={handleMarkComplete} fullWidth={true}>
                        <DialogTitle>{lecture.title}</DialogTitle>
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
                            <Button onClick={(e) => { handleMark(e, student._id) }}>Complete</Button>
                            <Button onClick={handleMarkComplete}>Close</Button>
                        </DialogActions>
                    </Dialog>
                // </>
            }
        </div>
    )
}
export default LectureMarkAsComplete