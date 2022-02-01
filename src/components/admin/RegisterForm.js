import { useState } from "react"
import { withRouter } from "react-router-dom"
import validator from 'validator'
import { TextField, Button } from "@mui/material"

const RegisterForm = (props) => {

    const { _id, email: editEmail, username: editUsername, name: editName, website: editWebsite, formSubmission, handleClose } = props
    console.log('editing', _id)
    const [email, setEmail] = useState(editEmail ? editEmail : '')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState(editUsername ? editUsername : '')
    const [name, setName] = useState(editName ? editName : '')
    const [website, setWebsite] = useState(editWebsite ? editWebsite : '')
    const [formErr, setFormErr] = useState({})
    const err = {}

    const runValidation = () => {
        if (email.trim().length === 0) {
            err.email = 'email required'
        }
        else if (!validator.isEmail(email)) {
            err.email = 'email format is not valid'
        }
        if (password.trim().length === 0 && !editUsername) {
            err.password = 'password required'
        }
        if (username.trim().length === 0) {
            err.username = 'name required'
        }
        if (name.trim().length === 0) {
            err.name = 'academy name is required'
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

    return <div>
        <form onSubmit={handleSubmit}>

            <TextField label='Enter your name' variant='outlined' type='text' name='username' value={username} onChange={handleChange}></TextField><br />
            {formErr.username && <span style={{ color: 'red' }}>{formErr.username}</span>}<br />

            <TextField label='Enter your email' variant='outlined' type='text' name='email' value={email} onChange={handleChange}></TextField><br />
            {formErr.email && <span style={{ color: 'red' }}>{formErr.email}</span>}<br />

            {!_id && <><TextField label='Enter password' variant='outlined' type='password' name='password' value={password} onChange={handleChange} ></TextField> <br />
            {formErr.password && <span style={{ color: 'red' }}>{formErr.password}</span>}<br /></>}

            <TextField label='Enter academy name' variant='outlined' type='text' name='name' value={name} onChange={handleChange} ></TextField> <br />
            {formErr.name && <span style={{ color: 'red' }}>{formErr.name}</span>}<br />

            <TextField label='Enter academy website' variant='outlined' type='text' name='website' value={website} onChange={handleChange} ></TextField> <br />
            {formErr.website && <span style={{ color: 'red' }}>{formErr.website}</span>}<br />

            <Button sx={{ mr: 1 }} type="submit" variant="contained" color="primary" size="small">Submit</Button>
            {handleClose && <Button sx={{ mr: 1 }} variant="contained" color="primary" size="small" onClick={() => { handleClose() }}>Cancel</Button>}

        </form>
    </div>

}
export default withRouter(RegisterForm)