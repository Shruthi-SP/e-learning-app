import { Grid, Typography } from "@mui/material"

const Home = (props) => {

    return (
        <Grid container sx={{mt:3}} >
            <Grid item xs={12} sm={5.75} ><img src='el.png' alt='e-learning' width='100%' /></Grid>
            <Grid item xs={12} sm={0.5}></Grid>
            <Grid item xs={12} sm={5.75} >
                <Typography variant="h5" >What is this app about?</Typography>
                <Typography variant="body" sx={{ m: 1, ml: 0 }}>This app allows user to create a e-learning app and students can access the app and learn.</Typography>
                <Typography variant="h6" sx={{ m: 1, ml: 0 }}>How the app works?</Typography>
                <Typography variant="body" sx={{ m: 1, ml: 0 }}>  Register and Login - User has to Register in the application by filling the required information. Once registered, user is navigated to login and can enter their credentails to access.</Typography>
                <Typography variant="body" sx={{ m: 1, ml: 0 }}>Try this Admin login : <em>Email: <strong>admin_3@gmail.com</strong></em> and <em>Password: <b>secret123</b></em></Typography>
                <Typography variant="body" sx={{ m: 1, ml: 0 }}>Try this for Student login : <em>Email: <strong>student1@gmail.com</strong></em> and <em>Password: <b>secret123</b></em></Typography>
            </Grid>
            {/* <img src='el.png' alt='' width='100%' height='400px' /> */}
        </Grid>
    )
}
export default Home