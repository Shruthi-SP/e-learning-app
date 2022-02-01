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
        <div style={{ width:'300px', margin:'20px auto', padding:'10px', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
            <Typography variant="h5" sx={{m: 1}}>Admin Register</Typography>
            <RegisterForm formSubmission={formSubmission} />
        </div>
    )
}
export default AddAdmin