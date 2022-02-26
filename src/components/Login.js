import { useState } from "react"
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { asyncLoginUser, setUser } from "../actions/usersAction"
import { asyncGetAllStudents, asyncLoginStudent, asyncGetStudent } from "../actions/studentsAction"
import { Radio, RadioGroup, FormControlLabel, FormLabel, Box, Typography, TextField, Container, Button, Avatar, CssBaseline, Grid, Link } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { asyncGetAllCourses } from "../actions/coursesAction"
import Helmet from "react-helmet"

const theme = createTheme();

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErr, setFormErr] = useState({})
    const [loginAs, setLoginAs] = useState('')
    const err = {}
    const dispatch = useDispatch()

    const redirectAdmin = () => {
        props.history.push('/admin/dashboard')
        dispatch(asyncGetAllStudents())
        dispatch(asyncGetAllCourses())
    }
    const getStudent = (obj) => {
        dispatch(setUser(obj))
    }

    const getId = (obj) => {
        dispatch(asyncGetStudent(obj._id, getStudent))
    }

    const redirectStudent = () => {
        props.history.push('/student/account')
        dispatch(asyncGetAllCourses())
    }

    const runValidation = () => {
        if (email.trim().length === 0) {
            err.email = 'Email is required'
        }
        else if (!validator.isEmail(email)) {
            err.email = 'Email format is not valid'
        }
        if (password.trim().length < 4) {
            err.password = 'Password should have 8 to 128 characters'
        }
        if (loginAs.trim().length === 0) {
            err.loginAs = 'Select the user you want to login as '
        }
    }

    const handleChange = (e) => {
        const attr = e.target.name
        const value = e.target.value
        if (attr === 'email') {
            setEmail(value)
        }
        if (attr === 'password') {
            setPassword(value)
        }
        if (attr === 'loginAs') {
            setLoginAs(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if (Object.keys(err).length === 0) {
            const formData = {
                email: email,
                password: password
            }
            if (loginAs === 'admin') {
                dispatch(asyncLoginUser(formData, redirectAdmin))
            }
            else {
                dispatch(asyncLoginStudent(formData, getId, redirectStudent))
            }
        }
        else {
            setFormErr(err)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>E-Learning | Login</title>
            </Helmet>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleChange}
                        />
                        {formErr.email && <span style={{ color: 'red' }}>{formErr.email}</span>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handleChange}
                        />
                        {formErr.password && <><span style={{ color: 'red' }}>{formErr.password}</span><br /></>}
                        <FormLabel >Login As</FormLabel>
                        <RadioGroup sx={{ ml: 3, direction: 'row' }}
                            name="loginAs"
                            value={loginAs}
                            onChange={handleChange}
                        >
                            <FormControlLabel value='admin' control={<Radio />} label='Admin' />
                            <FormControlLabel value='student' control={<Radio />} label='Student' />
                        </RadioGroup>
                        {formErr.loginAs && <span style={{ color: 'red' }}>{formErr.loginAs}</span>}<br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/admin/register" variant="body2">
                                    New User? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default Login