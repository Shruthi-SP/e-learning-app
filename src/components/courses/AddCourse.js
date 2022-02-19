import { useDispatch } from 'react-redux'
import { Typography } from '@mui/material'
import { asyncCreateCourse } from '../../actions/coursesAction'
import CourseForm from './CourseForm'

const AddCourse = (props) => {
    const dispatch = useDispatch()

    const formSubmission = (formData, resetForm ) => {
        dispatch(asyncCreateCourse(formData, resetForm))
    }

    return (
        <div style={{width:'625px', margin:'20px auto', padding:'10px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
            <Typography variant="h5" sx={{m: 2, textAlign:'center'}}>Add Course</Typography>
            <CourseForm {...props} formSubmission={formSubmission} />
        </div>
    )
}
export default AddCourse