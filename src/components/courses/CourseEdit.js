import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { asyncGetCourse, asyncUpdateCourse } from "../../actions/coursesAction"
import { Typography } from "@mui/material"
import CourseForm from "./CourseForm"

const CourseEdit = (props) => {
    const { id, edit, handleEdit } = props
    const [course, setCourse] = useState({})

    const getResult = (obj) => {
        if (Object.keys(obj).length > 0) {
            setCourse(obj)
        }
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetCourse(id, getResult))
    }, [id])

    const formSubmission = (formData) => {
        dispatch(asyncUpdateCourse(course._id, formData))
        handleEdit()
    }

    return (
        <div style={{width:'625px', margin:'20px auto', padding:'10px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
            {
                Object.keys(course).length > 0 && <>
                    <Dialog open={edit} onClose={handleEdit} fullWidth={true}>
                        <DialogTitle>Edit {course.name}</DialogTitle>
                        <DialogContent>
                            <div>
                                <Typography variant="h5" sx={{ mt: 1, mb: 3, textAlign:'center' }}>Edit</Typography>
                                <CourseForm {...course} handleClose={handleEdit} edit={edit} formSubmission={formSubmission} />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleEdit}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        </div>
    )
}
export default CourseEdit