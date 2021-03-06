import { useDispatch } from 'react-redux'
import { Typography } from '@mui/material'
import { asyncRegisterStudent } from '../../actions/studentsAction'
import StudentRegisterForm from './StudentRegisterForm'
import Helmet from 'react-helmet'

const AddStudent = (props) => {
    const dispatch = useDispatch()

    const redirect = (id) => {
        props.history.push(`/admin/students/${id}`)
    }

    const formSubmission = (formData) => {
        dispatch(asyncRegisterStudent(formData, redirect))
    }

    return (
        <div style={{ width:'300px', height:'350px', margin:'20px auto', padding:'10px', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
            <Helmet>
                <title>E-Learning | Admin | Create-Student</title>
            </Helmet>
            <Typography variant="h5" sx={{mt:1, mb:3}}>Create Student</Typography>
            <StudentRegisterForm {...props} formSubmission={formSubmission} />
        </div>
    )
}
export default AddStudent