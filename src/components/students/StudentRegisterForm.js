import { useState } from "react"
import validator from 'validator'
import { TextField, Button } from "@mui/material"

const StudentRegisterForm = (props) => {

    const { _id, email: editEmail, name: editName, formSubmission, handleClose, edit } = props
    const [email, setEmail] = useState(editEmail ? editEmail : '')
    const [password, setPassword] = useState('')
    const [name, setName] = useState(editName ? editName : '')

    const [formErr, setFormErr] = useState({})
    const err = {}

    const runValidation = () => {
        if (email.trim().length === 0) {
            err.email = 'email required'
        }
        else if (!validator.isEmail(email)) {
            err.email = 'email format is not valid'
        }
        if (password.trim().length === 0 && !_id) {
            err.password = 'password required'
        }
        if (name.trim().length === 0) {
            err.name = 'name is required'
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
        if (attr === 'name') {
            setName(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        const resetForm = () => {
            setName('')
            setEmail('')
            setPassword('')

        }
        if (Object.keys(err).length === 0) {
            const formData = {
                name: name,
                email: email
            }
            if (!_id) {
                formData.password = password
            }
            formSubmission(formData, resetForm)
        }
        else {
            setFormErr(err)
        }
    }
    const handleCancel = () => {
        props.history.push('/admin/students')
    }

    return <div>
        <form onSubmit={handleSubmit}>

            <TextField label='Enter your name' variant='outlined' type='text' name='name' value={name} onChange={handleChange}></TextField><br />
            {formErr.name && <span style={{ color: 'red' }}>{formErr.name}</span>}<br />

            <TextField label='Enter your email' variant='outlined' type='text' name='email' value={email} onChange={handleChange}></TextField><br />
            {formErr.email && <span style={{ color: 'red' }}>{formErr.email}</span>}<br />

            {!_id && <><TextField label='Enter password' variant='outlined' type='password' name='password' value={password} onChange={handleChange} ></TextField> <br />
            {formErr.password && <span style={{ color: 'red' }}>{formErr.password}</span>}<br /></>}

            <Button sx={{ mr: 1 }} type="submit" variant="contained" color="primary" size="small">{edit ? 'update' : 'create'}</Button>
            <Button sx={{ mr: 1 }} variant="contained" color="primary" size="small" onClick={() => { edit ? handleClose() : handleCancel() }}>Cancel</Button>

        </form>
    </div>

}
export default StudentRegisterForm