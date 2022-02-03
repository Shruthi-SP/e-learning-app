import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { asyncGetStudent } from "../../actions/studentsAction"

const ModalView = (props) => {
    const { id, view, handleView } = props
    const [student, setStudent] = useState({})

    const getStudent = (obj) => {
        setStudent(obj)
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetStudent(id, getStudent))
    }, [])

    return (
        <div>
            {
                Object.keys(student).length > 0 && <>
                    <Dialog open={view} onClose={handleView}>
                        <DialogTitle>{student.name}'s Info</DialogTitle>
                        <DialogContent>
                            <p>Name: <b>{student.name}</b></p>
                            <p>ID: <b>{student._id}</b></p>
                            <p>Email: <b>{student.email}</b></p>
                            <p>Role: <b>{student.role}</b></p>
                            <p>Number of Courses enrolled: <b>{student.courses.length}</b></p>
                            <p>CreatedBy: <b>{student.user}</b></p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleView}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        </div>
    )
}
export default ModalView