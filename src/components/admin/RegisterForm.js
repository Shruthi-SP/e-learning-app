import { useState } from "react"
import { withRouter } from "react-router-dom"
import validator from 'validator'
import { TextField, Button, Box, Grid, Link } from "@mui/material"

const RegisterForm = (props) => {

    const { _id, email: editEmail, username: editUsername, name: editName, website: editWebsite, formSubmission, handleClose } = props
    const [email, setEmail] = useState(editEmail ? editEmail : '')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState(editUsername ? editUsername : '')
    const [name, setName] = useState(editName ? editName : '')
    const [website, setWebsite] = useState(editWebsite ? editWebsite : '')
    const [formErr, setFormErr] = useState({})
    const err = {}

    const runValidation = () => {
        if (email.trim().length === 0) {
            err.email = 'Email is required'
        }
        else if (!validator.isEmail(email)) {
            err.email = 'Email format is not valid'
        }
        if (password.trim().length === 0 && !editUsername) {
            err.password = 'Password should have 8 to 128 characters'
        }
        if (username.trim().length < 4) {
            err.username = 'User name should have 4 to 64 characters '
        }
        if (name.trim().length === 0) {
            err.name = 'Academy name is required'
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
        if (attr === 'username') {
            setUsername(value)
        }
        if (attr === 'name') {
            setName(value)
        }
        if (attr === 'website') {
            setWebsite(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if (Object.keys(err).length === 0) {
            const formData = {
                username: username,
                email: email,
                academy: {
                    name: name,
                    website: website
                }
            }
            if (!_id) {
                formData.password = password
            }
            formSubmission(formData)
        }
        else {
            setFormErr(err)
        }
    }

    return <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Name"
            name="username"
            autoComplete="name"
            autoFocus
            value={username}
            onChange={handleChange}
        />{formErr.username && <span style={{ color: 'red' }}>{formErr.username}</span>}
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleChange}
        />{formErr.email && <span style={{ color: 'red' }}>{formErr.email}</span>}
        {!_id && <><TextField
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
        />{formErr.password && <span style={{ color: 'red' }}>{formErr.password}</span>}</>}
        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Academy Name"
            name="name"
            autoComplete="Academy Name"
            value={name}
            onChange={handleChange}
        />{formErr.name && <span style={{ color: 'red' }}>{formErr.name}</span>}
        <TextField
            margin="normal"
            required
            fullWidth
            id="website"
            label="Academy Website"
            name="website"
            autoComplete="Academy website"
            value={website}
            onChange={handleChange}
        />{formErr.website && <span style={{ color: 'red' }}>{formErr.website}</span>}


        {/* <TextField label='Enter your name' variant='outlined' type='text' name='username' value={username} onChange={handleChange}></TextField><br />
        {formErr.username && <span style={{ color: 'red' }}>{formErr.username}</span>}<br />

        <TextField label='Enter your email' variant='outlined' type='text' name='email' value={email} onChange={handleChange}></TextField><br />
        {formErr.email && <span style={{ color: 'red' }}>{formErr.email}</span>}<br />

        {!_id && <><TextField label='Enter password' variant='outlined' type='password' name='password' value={password} onChange={handleChange} ></TextField> <br />
            {formErr.password && <span style={{ color: 'red' }}>{formErr.password}</span>}<br /></>}

        <TextField label='Enter academy name' variant='outlined' type='text' name='name' value={name} onChange={handleChange} ></TextField> <br />
        {formErr.name && <span style={{ color: 'red' }}>{formErr.name}</span>}<br />

        <TextField label='Enter academy website' variant='outlined' type='text' name='website' value={website} onChange={handleChange} ></TextField> <br />
        {formErr.website && <span style={{ color: 'red' }}>{formErr.website}</span>}<br /> */}
        <Grid container spacing={2}>
            <Grid item xs={12} sm={handleClose ? 6 : 12}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ m: 2, ml:0 }}>
                    Submit
                </Button>
            </Grid>
            {handleClose && <Grid item xs={12} sm={6}>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ m: 2, ml: 0 }} onClick={() => { handleClose() }}>Cancel</Button>
            </Grid>}
        </Grid>
        {!_id && <Grid container justifyContent="flex-end">
            <Grid item>
                <Link href="/login" variant="body2">
                    Already have an account? Login in
                </Link>
            </Grid>
        </Grid>}
    </Box>
}
export default withRouter(RegisterForm)