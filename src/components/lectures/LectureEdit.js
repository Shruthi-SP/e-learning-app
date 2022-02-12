import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useDispatch } from "react-redux"
import { Typography } from "@mui/material"
import { asyncGetLecture, asyncUpdateLecture } from "../../actions/lecturesAction"
import LectureForm from "./LectureForm"

const LectureEdit = (props) => {
    const { courseId, lecture, edit, handleEdit } = props
    console.log('lec edit props', props)

    const dispatch = useDispatch()

    const formSubmission = (courseId, formData, resetForm) => {
        console.log(courseId, lecture._id, formData)
        dispatch(asyncUpdateLecture(courseId, lecture._id, formData))
        handleEdit()
    }

    return (
        <div style={{width:'625px', margin:'20px auto', padding:'10px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
            {
                Object.keys(lecture).length > 0 && <>
                    <Dialog open={edit} onClose={handleEdit} fullWidth={true}>
                        <DialogTitle>Edit {lecture.title}</DialogTitle>
                        <DialogContent>
                            <div>
                                <Typography variant="h5" sx={{ mt: 1, mb: 3, textAlign:'center' }}>Edit</Typography>
                                <LectureForm courseId={courseId} {...lecture} handleClose={handleEdit} edit={edit} formSubmission={formSubmission} />
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
export default LectureEdit