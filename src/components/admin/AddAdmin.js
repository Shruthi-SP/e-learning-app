import { useDispatch } from 'react-redux'
import { asyncRegisterUser } from '../../actions/usersAction'
import RegisterForm from './RegisterForm'
import { Typography } from '@mui/material'

const AddAdmin = (props) => {
    const dispatch = useDispatch()

    const redirect = () => {
        props.history.push('/admin/login')
    }

    const formSubmission = (formData) => {
        dispatch(asyncRegisterUser(formData, redirect))
    }

    return (
        <div>
            <Typography variant="h5" mb={1}>Admin Register</Typography>
            <RegisterForm formSubmission={formSubmission} />
        </div>
    )
}
export default AddAdmin