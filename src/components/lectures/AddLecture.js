import { useDispatch } from 'react-redux'
import { Typography } from '@mui/material'
import { asyncCreateLecture } from '../../actions/lecturesAction'
import LectureForm from './LectureForm'

const AddLecture = (props) => {
    const courseId = props.match.params.id
    const dispatch = useDispatch()

    const redirect = () => {
        props.history.push(`/courses/${courseId}/lectures`)
    }

    const formSubmission = (courseId, formData) => {
        dispatch(asyncCreateLecture(courseId, formData, redirect))
    }

    return (
        <div style={{ width:'300px', margin:'20px auto', padding:'10px', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
            <Typography variant="h5" sx={{m: 1, textAlign:'center'}}>Add Lecture</Typography>
            <LectureForm {...props} courseId={courseId} formSubmission={formSubmission} />
        </div>
    )
}
export default AddLecture