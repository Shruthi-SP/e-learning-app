import { Grid, Typography } from "@mui/material"

const Home = (props) => {

    return (
        <Grid container>
            {/* <img src='bill.png' alt='' width='350px' height='350px' /> */}
            <Typography variant="h5" sx={{ m: 1 }}>What is this app about?</Typography>
            <Typography variant="body" sx={{ m: 1 }}>This app allows user to create a e-leraning app and students can access the app and learn.</Typography>
            <Typography variant="h6" sx={{ m: 1 }}>How the app works?</Typography>
            <Typography variant="body" sx={{ m: 1 }}>  Register & Login - User has to Register in the application by filling the required information. Once registered, user can navigate to login and enter his credentails to access.</Typography>
            <Typography variant="body" sx={{ m: 1 }}>Try this for login : <em>Email: <strong>admin10@gmail.com</strong></em> and <em>Password: <b>secret123</b></em></Typography>
        </Grid>
    )
}
export default Home