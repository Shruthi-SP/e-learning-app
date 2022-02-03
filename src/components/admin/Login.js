import { useState } from "react"
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { Typography, TextField, Button } from "@mui/material"
import { asyncLoginUser } from "../../actions/usersAction"
import { asyncGetAllStudents } from "../../actions/studentsAction"

const Login = (props) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErr, setFormErr] = useState({})
    const err = {}
    const dispatch = useDispatch()

    const redirect = () => {
        props.history.push('/admin/account')
        dispatch(asyncGetAllStudents())
    }

    const runValidation = () => {
        if (email.trim().length === 0) {
            err.email = 'email required'
        }
        else if (!validator.isEmail(email)) {
            err.email = 'email format is not valid'
        }
        if (password.trim().length === 0) {
            err.password = 'password required'
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
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if (Object.keys(err).length === 0) {
            const formData = {
                email: email,
                password: password,
            }
            dispatch(asyncLoginUser(formData, redirect))
        }
        else {
            setFormErr(err)
        }
    }

    return <div style={{ width:'300px', height: '300px', margin:'20px auto', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
        <Typography variant="h5" sx={{ m:3 }}>Admin Login</Typography>
        <form onSubmit={handleSubmit}>

            <TextField label='Enter your email' variant='outlined' type='text' name='email' value={email} onChange={handleChange}></TextField><br />
            {formErr.email && <span style={{ color: 'red' }}>{formErr.email}</span>}<br />

            <TextField label='Enter password' variant='outlined' type='password' name='password' value={password} onChange={handleChange} ></TextField> <br />
            {formErr.password && <span style={{ color: 'red' }}>{formErr.password}</span>}<br />

            <Button sx={{ mr: 1 }} type="submit" variant="contained" color="primary" size="small">Submit</Button>

        </form>
    </div>

}
export default Login