import { useDispatch } from 'react-redux'
import { Typography } from '@mui/material'
import { asyncRegisterStudent } from '../../actions/studentsAction'
import StudentRegisterForm from './StudentRegisterForm'

const AddStudent = (props) => {
    const dispatch = useDispatch()

    const redirect = () => {
        props.history.push('/admin/students')
    }

    const formSubmission = (formData) => {
        dispatch(asyncRegisterStudent(formData, redirect))
    }

    return (
        <div style={{ width:'300px', height:'350px', margin:'20px auto', padding:'10px', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
            <Typography variant="h5" sx={{mt:1, mb:3}}>Create Student</Typography>
            <StudentRegisterForm {...props} formSubmission={formSubmission} />
        </div>
    )
}
export default AddStudent