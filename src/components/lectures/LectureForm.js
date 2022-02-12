import { useState } from "react"
import { TextField, Button } from "@mui/material"
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'

const LectureForm = (props) => {
    const { courseId, title: editTitle, description: editDescription, assetType: editAssetType, assetURL: editAssetUrl, formSubmission, handleClose, edit } = props

    console.log('editing', edit)

    const [title, setTitle] = useState(editTitle ? editTitle : '')
    const [description, setDescription] = useState(editDescription ? editDescription : '')
    const [assetType, setAssetType] = useState(editAssetType ? editAssetType : '')
    const [assetUrl, setAssetUrl] = useState(editAssetUrl ? editAssetUrl : '')
    const [formErr, setFormErr] = useState({})
    const err = {}

    const resetForm = () => {
        setTitle('')
        setDescription('')
        setAssetType('')
        setAssetUrl('')
        setFormErr({})
    }

    const runValidation = () => {
        if (title.trim().length === 0) {
            err.title = 'lecture title is required'
        }
        if (description.trim().length === 0) {
            err.description = 'description is required'
        }
        if (assetType.trim().length === 0) {
            err.assetType = 'choose asset type'
        }
        if (assetUrl.trim().length === 0) {
            err.assetUrl = 'url is required'
        }
    }

    const handleChange = (e) => {
        const attr = e.target.name
        const value = e.target.value
        if (attr === 'title') {
            setTitle(value)
        }
        if (attr === 'description') {
            setDescription(value)
        }
        if (attr === 'assetType') {
            setAssetType(value)
        }
        if (attr === 'assetUrl') {
            setAssetUrl(value)
        }
    }

    const handleCancel = () => {
        props.history.push(`/courses/${courseId}/lectures`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if (Object.keys(err).length === 0) {
            const formData = {
                title: title,
                description: description,
                assetType: assetType,
                assetURL: assetUrl
            }
            formSubmission(courseId, formData, resetForm)
        }
        else {
            setFormErr(err)
        }
    }

    return <div>
        <form onSubmit={handleSubmit}>

            <TextField label='Enter lecture title' variant='outlined' type='text' name='title' value={title} onChange={handleChange} ></TextField> <br />
            {formErr.title && <span style={{ color: 'red' }}>{formErr.title}</span>}<br />

            <TextField label='Enter decription' variant='outlined' type='text' name='description' value={description} onChange={handleChange}></TextField><br />
            {formErr.description && <span style={{ color: 'red' }}>{formErr.description}</span>}<br/>

            <FormControl sx={{ mb: 3, minWidth: 223 }}>
                <InputLabel>Asset type</InputLabel>
                <Select
                    value={assetType}
                    onChange={handleChange}
                    autoWidth
                    name="assetType"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value='video'>Video</MenuItem>
                    <MenuItem value='audio'>Audio</MenuItem>
                    <MenuItem value='text'>Text</MenuItem>
                    <MenuItem value='pdf'>Pdf</MenuItem>
                    <MenuItem value='img'>Image</MenuItem>
                </Select>
                {formErr.assetType && <span style={{ color: 'red' }}>{formErr.assetType}</span>}
            </FormControl> <br />
            <TextField label='Enter asset url' variant='outlined' type='text' name='assetUrl' value={assetUrl} onChange={handleChange}></TextField><br />
            {formErr.assetUrl && <span style={{ color: 'red' }}>{formErr.assetUrl}</span>}<br />
            <Button sx={{ m: 1 }} type="submit" variant="contained" color="primary" size="small">Submit</Button>           
            <Button sx={{ m: 1 }} variant="contained" color="primary" size="small" onClick={() => { edit ? handleClose() : handleCancel() }}>Cancel</Button>
        </form>
    </div>
}
export default LectureForm