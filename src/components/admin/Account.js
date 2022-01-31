import { Button } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import ModalAdmin from "./ModalAdmin"

const Account = (props) => {

    const [edit, setEdit] = useState(false)
    const [open, setOpen] = useState(false)
    
    const handleClose = () => {
        setOpen(false)
    }

    const user = useSelector(state => {
        return state.user
    })

    const handleUpdate = () => {
        console.log('clicked', user)
        setEdit(!edit)
        setOpen(true)
    }

    return (
        <div>
            {Object.keys(user).length > 0 && <>
                <p>Name: <b>{user.username}</b></p>
                <p>Email: <b>{user.email}</b></p>
                <p>Role: <b>{user.role}</b></p>
                <p>Academy Name: <b>{user.academy.name}</b></p>
                <p>Academy Website: <b>{user.academy.website}</b></p>
                <Button variant="contained" size="small" onClick={handleUpdate}>Update</Button>
                {/* {edit && <EditAdmin handleUpdate={handleUpdate} user={user} /> } */}
                {open && <ModalAdmin user={user} handleClose={handleClose} open={open} />}
            </>}
        </div>
    )
}
export default Account