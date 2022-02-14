import { useState } from 'react';
import { CardMedia, CardContent, CardActions, Card, Dialog, DialogActions, DialogContent, Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import CourseEdit from './CourseEdit';
import { asyncDeleteCourse, asyncEnrollCourseStudent, asyncUnenrollCourseStudent } from '../../actions/coursesAction';
import CourseEnroll from './CourseEnroll';

function CourseCard(props) {
    const { course, enrolled, handleEnrolled } = props
    const user = useSelector(state => {
        return state.user
    })

    const [edit, setEdit] = useState(false)
    const [remove, setRemove] = useState(false)
    const [enroll, setEnroll] = useState(false)

    const dispatch = useDispatch()

    const handleEdit = () => {
        setEdit(!edit)
    }
    const handleRemove = (e) => {
        setRemove(true)
    }
    const handleYes = (e, id) => {
        dispatch(asyncDeleteCourse(id))
        setRemove(false)
    }
    const handleClose = () => {
        setRemove(false)
    }
    
    const getResult = (obj) => {
        if(enrolled){
            handleEnrolled()
        }
    }
    const handleEnroll = () => {
        if (user.role === 'admin') {
            setEnroll(!enroll)
        }
        else {
            dispatch(asyncEnrollCourseStudent(course._id, getResult))
        }
    }
    const handleUnenroll = () => {
        dispatch(asyncUnenrollCourseStudent(course._id, getResult))
    }

    return (
        <>
            <Card sx={{ maxWidth: 300, m: 1 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="blank2.png"
                    alt="card image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{course.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{course.description}</Typography>
                </CardContent>
                <CardActions>
                    <Link style={{ textDecoration: 'none', color: 'orangered', fontSize: '0.8800rem', padding: '4px 5px', marginBottom: '2px' }} to={`/courses/${course._id}`}>VIEW</Link>
                    {
                        user.role === 'admin' ? <>
                            <Button color='primary' size="small" onClick={handleEdit}>Edit</Button>
                            <Button color='error' size="small" onClick={handleRemove}>Delete</Button>
                        </> : <>{enrolled && <Button color='primary' size="small" onClick={handleUnenroll}>unenroll</Button>
                        }</>
                    }
                    {!enrolled && <Button color='primary' size="small" onClick={handleEnroll}>enroll</Button>}
                </CardActions>
            </Card>
            {edit && <CourseEdit id={course._id} handleEdit={handleEdit} edit={edit} />}
            {remove && <Dialog open={remove} onClose={handleClose}>
                <DialogContent>Are you sure want to delete?</DialogContent>
                <DialogActions><Button onClick={(e) => { handleYes(e, course._id) }}>Yes</Button><Button onClick={handleClose}>No</Button></DialogActions>
            </Dialog>}
            {enroll && <CourseEnroll course={course} enroll={enroll} handleEnroll={handleEnroll} />}
        </>
    );
}
export default withRouter(CourseCard)