import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { asyncGetStudent, asyncUpdateStudent } from "../../actions/studentsAction"
import StudentRegisterForm from "./StudentRegisterForm"
import { Typography } from "@mui/material"
import Helmet from 'react-helmet'

const StudentEdit = (props) => {
    const { id, edit, handleEdit } = props
    const [student, setStudent] = useState({})

    const getStudent = (obj) => {
        setStudent(obj)
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetStudent(id, getStudent))
    }, [])

    const formSubmission = (formData) => {
        dispatch(asyncUpdateStudent(student._id, formData))
        handleEdit()
    }

    return (
        <div>
            <Helmet>
                <title>E-Learning | Admin | Edit-Student</title>
            </Helmet>
            {
                Object.keys(student).length > 0 && <>
                    <Dialog open={edit} onClose={handleEdit}>
                        <DialogTitle>Edit {student.name}</DialogTitle>
                        <DialogContent>
                            <div style={{ width: '300px', height: '350px', margin: '20px auto', padding: '10px', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                                <Typography variant="h5" sx={{ mt: 1, mb: 3 }}>Edit</Typography>
                                <StudentRegisterForm {...student} handleClose={handleEdit} edit={edit} formSubmission={formSubmission} />
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
export default StudentEdit