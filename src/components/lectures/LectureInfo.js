import { Grid, Typography, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { asyncGetLecture } from "../../actions/lecturesAction"
import { Link } from "react-router-dom"
import { Tooltip } from "@material-ui/core"
import { SummarizeOutlined } from "@mui/icons-material"

const LectureInfo = (props) => {
    const lectureId = props.match.params.id
    const courseId = props.match.params.courseId
    console.log('lec info props', props, lectureId, courseId)

    const [lecture, setLecture] = useState({})

    const getResult = (obj) => {
        if (Object.keys(obj).length > 0 && typeof (obj) === 'object') {
            console.log('got lec info', obj)
            setLecture(obj)
        }
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetLecture(courseId, lectureId, getResult))
    }, [])


    return (
        <div>
            {
                Object.keys(lecture).length > 0 && <>                    
                    <Grid container >
                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-start" }}>
                            <Typography variant="h4" >{lecture.title}</Typography>
                        </Grid>
                        <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
                            <Link style={{ margin: '5px', marginTop: '10px', textDecoration: 'none' }} to={`/courses/${courseId}/lectures`}><Tooltip title="All Lectures" ><SummarizeOutlined color="primary" /></Tooltip></Link>
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid item xs={12} sm={9} >
                            {lecture.assetType === 'video' && <iframe width="560" height="315" src={lecture.assetURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}

                            {lecture.assetType === 'audio' && <audio src={lecture.assetURL} controls autoPlay />}

                            {lecture.assetType === 'pdf' && <object data={lecture.assetURL} width="600" height="300"></object>}

                            {lecture.assetType === 'text' && <object data={lecture.assetURL} width="600" height="150"></object>}

                            {lecture.assetType === 'img' && <img src={lecture.assetURL} width="600" height="150" />}
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Button variant="contained">Mark as complete</Button>
                        </Grid>
                    </Grid>


                </>
            }
        </div>
    )
}
export default LectureInfo
