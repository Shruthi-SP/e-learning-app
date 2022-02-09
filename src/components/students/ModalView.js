import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetStudent } from "../../actions/studentsAction"

const ModalView = (props) => {
    const { id, view, handleView } = props
    const [student, setStudent] = useState({})

    const courses = useSelector(state => {
        return state.courses
    })

    const getCourseName = (id) => {
        if (courses.length > 0) {
            const course = courses.find(ele => ele._id === id)
            return course.name
        }
        else return 'course unavailable'
    }

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
                            <p style={{ marginBottom: '0px' }}>Courses enrolled:</p>
                            {
                                student.courses.length > 0 ? <>
                                    
                                    <ol style={{ marginBottom: '0px' }}>
                                        {student.courses.map(ele => {
                                            return <li key={ele._id}><b>{getCourseName(ele.course)}</b></li>
                                        })}
                                    </ol>
                                </> : <b>Not enrolled to any course</b>
                            }
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