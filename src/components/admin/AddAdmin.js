// import { useDispatch } from 'react-redux'
// import { asyncRegisterUser } from '../../actions/usersAction'
// import RegisterForm from './RegisterForm'
// import { Typography } from '@mui/material'

// const AddAdmin = (props) => {
//     const dispatch = useDispatch()

//     const redirect = () => {
//         props.history.push('/admin/login')
//     }

//     const formSubmission = (formData) => {
//         dispatch(asyncRegisterUser(formData, redirect))
//     }

//     return (
//         <div style={{ width:'500px', margin:'20px auto', padding:'10px', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
//             <Typography variant="h5" sx={{m: 1}}>Admin Register</Typography>
//             <RegisterForm formSubmission={formSubmission} />
//         </div>
//     )
// }
// export default AddAdmin
import { useDispatch } from 'react-redux'
import { asyncRegisterUser } from '../../actions/usersAction'
import RegisterForm from './RegisterForm'
import { Box, Typography, Container, Avatar, CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Helmet from 'react-helmet';

const theme = createTheme();

const AddAdmin = (props) => {
    const dispatch = useDispatch()

    const redirect = () => {
        props.history.push('/login')
    }

    const formSubmission = (formData) => {
        dispatch(asyncRegisterUser(formData, redirect))
    }

    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>E-Learning| Admin | Register</title>
            </Helmet>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Admin Register
                    </Typography>
                    <RegisterForm formSubmission={formSubmission} />
                </Box>
            </Container>
        </ThemeProvider>
    )
}
export default AddAdmin