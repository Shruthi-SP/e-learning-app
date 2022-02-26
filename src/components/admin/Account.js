import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetAllCourses } from "../../actions/coursesAction"
import { asyncGetAllStudents } from "../../actions/studentsAction"
import ModalAdmin from "./ModalAdmin"
import Helmet from "react-helmet"

const Account = (props) => {

    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(asyncGetAllStudents())
        dispatch(asyncGetAllCourses())
    }, [])
    
    const handleClose = () => {
        setOpen(false)
    }

    const user = useSelector(state => {
        return state.user
    })

    const handleUpdate = () => {
        setOpen(true)
    }

    return (
        <div>
            <Helmet>
                <title>E-Learning App|Admin|Account</title>
            </Helmet>
            {Object.keys(user).length > 0 && <>
                <p>Name: <b>{user.username}</b></p>
                <p>Email: <b>{user.email}</b></p>
                <p>Role: <b>{user.role}</b></p>
                <p>Academy Name: <b>{user.academy.name}</b></p>
                <p>Academy Website: <b>{user.academy.website}</b></p>
                <Button variant="contained" size="small" onClick={handleUpdate}>Update</Button>
                {open && <ModalAdmin user={user} handleClose={handleClose} open={open} />}
            </>}
        </div>
    )
}
export default Account