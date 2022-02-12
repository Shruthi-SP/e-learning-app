import { Grid, Typography, Button, IconButton, Tooltip } from "@mui/material"
import { Delete, Edit, AddTask, FeedOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { asyncAllLectures } from "../../actions/lecturesAction"
import LectureEdit from "./LectureEdit";

const LecturesList = (props) => {
    console.log('lec list props', props)
    const courseId = props.match.params.id

    const [edit, setEdit] = useState(false)
    const [remove, setRemove] = useState(false)
    const [obj, setObj] = useState({})

    const lectures = useSelector(state => {
        return state.lectures
    })
    const user = useSelector(state => {
        return state.user
    })

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncAllLectures(courseId))
    }, [courseId, edit])

    const handleEdit = (e, object) => {
        console.log('editing')
        setEdit(!edit)
        setObj(object)
    }
    const handleRemove = (e, object) => {
        console.log('removing')
    }
    const handleYes = (e, object) => {
        console.log('dispaching delete')
    }

    return (
        <div>
            <Grid container direction="row" sx={{ mt: 1, mb: 1 }}>
                <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", pt: 1 }}>
                    <Typography variant="h5">Lectures</Typography>
                </Grid>
                <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {(Object.keys(user).length > 0 && user.role === 'admin') && <>
                        <Link style={{ margin: '5px', marginTop:'10px', textDecoration: 'none'}} to={`/courses/${courseId}/create`}><Tooltip title="Add lecture"><AddTask color="success" /></Tooltip></Link>
                    </>}
                    <Link style={{ margin: '5px', marginTop:'10px', textDecoration: 'none' }} to={`/courses/${courseId}`}><Tooltip title="Course Details" ><FeedOutlined color="primary" /></Tooltip></Link>
                </Grid>
            </Grid>
            {lectures.length > 0 ? <Grid container>
                <Grid item sm={12} md={4}>
                    <ol>
                        {lectures.map(ele => {
                            return <li key={ele._id}>
                                <Link style={{ textDecoration: 'none', fontSize: '18px', color: 'black' }} to={`/courses/${courseId}/lectures/${ele._id}`} >{ele.title}</Link>
                                {user.role === 'admin' && <>
                                    <IconButton variant="outlined" color="primary" size="small" onClick={(e) => { handleEdit(e, ele) }}><Edit /></IconButton>
                                    <IconButton variant="outlined" color="error" size="small" onClick={(e) => { handleRemove(e, ele) }}><Delete /></IconButton>
                                </>}
                            </li>
                        })}
                    </ol>
                </Grid>
                {edit && <LectureEdit courseId={courseId} lecture={obj} edit={edit} handleEdit={handleEdit} />}
                <Grid item sm={12} md={4}></Grid>
                <Grid item sm={12} md={4}></Grid>
            </Grid> : <Grid>
                <Typography variant="h6">No lectures yet</Typography>
            </Grid>
            }
        </div>
    )
}
export default LecturesList