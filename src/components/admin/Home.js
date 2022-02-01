import { Grid, Typography } from "@mui/material"

const Home = (props) => {

    return (
        <Grid sx={{m:3, ml: 0}}>
            <img src='el.png' alt='' width='100%' height='400px' />
            <Typography variant="h5" sx={{ m: 1, ml: 0 }}>What is this app about?</Typography>
            <Typography variant="body" sx={{ m: 1, ml: 0 }}>This app allows user to create a e-leraning app and students can access the app and learn.</Typography>
            <Typography variant="h6" sx={{ m: 1, ml: 0 }}>How the app works?</Typography>
            <Typography variant="body" sx={{ m: 1, ml: 0 }}>  Register & Login - User has to Register in the application by filling the required information. Once registered, user can navigate to login and enter his credentails to access.</Typography>
            <Typography variant="body" sx={{ m: 1, ml: 0 }}>Try this for login : <em>Email: <strong>admin10@gmail.com</strong></em> and <em>Password: <b>secret123</b></em></Typography>
        </Grid>
    )
}
export default Home