import { useDispatch } from "react-redux"
import RegisterForm from "./RegisterForm"
import { Typography } from "@mui/material"
import { asyncUpdateUser } from "../../actions/usersAction"

const EditAdmin = (props) => {
    const { user, handleUpdate } = props
    let {academy}= user
    let {name, website } = academy
    console.log(name, website)
    const dispatch = useDispatch()

    const formSubmission = (formData) => {
        dispatch(asyncUpdateUser(formData))
        handleUpdate()
    }
    return (
        <>
            <Typography variant="h5" mb={1}>Update </Typography>
            <RegisterForm {...user} name={name} website={website} formSubmission={formSubmission} handleUpdate={handleUpdate} />
        </>
        
    )
}
export default EditAdmin