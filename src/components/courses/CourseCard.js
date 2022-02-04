import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';

function CourseCard(props) {
    const { course } = props
    const user = useSelector(state => {
        return state.user
    })
    const handleView = (e, id) => {
        props.history.push(`/courses/${id}`)
    }
    return (
        <Card sx={{ maxWidth: 300, m:1 }}>
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
                <Link style={{ textDecoration: 'none', color: 'orangered', fontSize:'0.8800rem', padding:'4px 5px', marginBottom:'2px' }} to={`/courses/${course._id}`}>VIEW</Link>
                {
                    user.role === 'admin' && <>
                        <Button color='primary' size="small">Edit</Button>
                        <Button color='error' size="small">Delete</Button>
                    </>
                }
            </CardActions>
        </Card>
    );
}
export default withRouter(CourseCard)