import { Grid, Typography, Button, IconButton, Tooltip, Dialog, DialogActions, DialogContent } from "@mui/material"
import { Delete, Edit, AddTask, KeyboardDoubleArrowLeft } from "@mui/icons-material";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { asyncAllLectures, asyncDeleteLecture } from "../../actions/lecturesAction"
import LectureEdit from "./LectureEdit";

const LecturesList = (props) => {
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
    }, [courseId, edit, remove])

    const handleEdit = (e, object) => {
        setEdit(!edit)
        setObj(object)
    }
    const handleRemove = (e, object) => {
        setObj(object)
        setRemove(true)
    }
    const reset = () => {
        setObj({})
        setRemove(false)
    }
    const handleYes = (e, id) => {
        dispatch(asyncDeleteLecture(courseId, id, reset))
    }
    const handleClose = () => {
        setRemove(false)
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
                    <Link style={{ margin: '5px', marginTop:'10px', textDecoration: 'none' }} to={`/courses/${courseId}`}><Tooltip title="Course Details" ><KeyboardDoubleArrowLeft color="primary" /></Tooltip></Link>
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
                {remove && <Dialog open={remove} onClose={handleClose}>
                <DialogContent>Are you sure want to delete?</DialogContent>
                <DialogActions><Button onClick={(e) => { handleYes(e, obj._id) }}>Yes</Button><Button onClick={handleClose}>No</Button></DialogActions>
            </Dialog>}
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