import { useState } from "react"
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import { TextField, Button, Grid } from "@mui/material"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'

const CourseForm = (props) => {
    const { _id, name: editName, description: editDescription, duration: editDuration, category: editCategory, validity: editValidity, level: editLevel, author: editAuthor, releaseDate: editReleaseDate, formSubmission, handleClose, edit } = props

    console.log('editing', edit)

    const [name, setName] = useState(editName ? editName : '')
    const [description, setDescription] = useState(editDescription ? editDescription : '')
    const [duration, setDuration] = useState(editDuration ? editDuration : '')
    const [category, setCategory] = useState(editCategory ? editCategory : '')
    const [validity, setValidity] = useState(editValidity ? editValidity : '')
    const [level, setLevel] = useState(editLevel ? editLevel : '')
    const [author, setAuthor] = useState(editAuthor ? editAuthor : '')
    const [releaseDate, setReleaseDate] = useState(editReleaseDate ? editReleaseDate : null)
    const [formErr, setFormErr] = useState({})
    const err = {}

    const resetForm = () => {
        setName('')
        setDescription('')
        setDuration('')
        setCategory('')
        setValidity('')
        setLevel('')
        setAuthor('')
        setReleaseDate(null)
        setFormErr({})
    }

    const runValidation = () => {
        if (name.trim().length === 0) {
            err.name = 'course name is required'
        }
        if (description.trim().length === 0) {
            err.description = 'description is required'
        }
        if (String(duration).trim().length === 0) {
            err.duration = 'duration is required'
        }
        if (category.trim().length === 0) {
            err.category = 'select category'
        }
        if (String(validity).trim().length === 0) {
            err.validity = 'validity(in months) required'
        }
        if (author.trim().length === 0) {
            err.author = 'author is required'
        }
        if (level.trim().length === 0) {
            err.level = 'choose level'
        }
    }

    const handleChange = (e) => {
        const attr = e.target.name
        const value = e.target.value
        if (attr === 'name') {
            setName(value)
        }
        if (attr === 'description') {
            setDescription(value)
        }
        if (attr === 'duration') {
            setDuration(value)
        }
        if (attr === 'category') {
            setCategory(value)
        }
        if (attr === 'validity') {
            setValidity(value)
        }
        if (attr === 'author') {
            setAuthor(value)
        }
        if (attr === 'level') {
            setLevel(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if (Object.keys(err).length === 0) {
            const formData = {
                name: name,
                author: author,
                category: category,
                description: description,
                duration: duration,
                level: level,
                validity: validity,
                releaseDate: releaseDate
            }
            if(edit){
                formSubmission(formData)
            }else{
            formSubmission(formData, resetForm)
            }
        }
        else {
            setFormErr(err)
        }
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <TextField label='Enter course name' variant='outlined' type='text' name='name' value={name} onChange={handleChange} ></TextField> <br />
                    {formErr.name && <span style={{ color: 'red' }}>{formErr.name}</span>}<br />

                    <TextField label='Enter decription' variant='outlined' type='text' name='description' value={description} onChange={handleChange}></TextField><br />
                    {formErr.description && <span style={{ color: 'red' }}>{formErr.description}</span>}<br />

                    <TextField label='Enter author' variant='outlined' type='text' name='author' value={author} onChange={handleChange}></TextField><br />
                    {formErr.author && <span style={{ color: 'red' }}>{formErr.author}</span>}<br />

                    <TextField label='Enter duration in months' variant='outlined' type='text' name='duration' value={duration} onChange={handleChange} ></TextField> <br />
                    {formErr.duration && <span style={{ color: 'red' }}>{formErr.duration}</span>}<br />

                    <TextField label='Course validity in months' variant='outlined' type='text' name='validity' value={validity} onChange={handleChange} ></TextField> <br />
                    {formErr.validity && <span style={{ color: 'red' }}>{formErr.validity}</span>}<br />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <FormControl sx={{ mb: 3, minWidth: 259 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={category}
                            onChange={handleChange}
                            autoWidth
                            label="Age"
                            name="category"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value='HTML'>HTML</MenuItem>
                            <MenuItem value='CSS'>CSS</MenuItem>
                            <MenuItem value='javascript'>JAVASCRIPT</MenuItem>
                            <MenuItem value='reactjs'>REACT JS</MenuItem>
                            <MenuItem value='nodejs'>NODE JS</MenuItem>
                            <MenuItem value='expressjs'>EXPRESS JS</MenuItem>
                            <MenuItem value='mongodb'>MONGODB</MenuItem>
                        </Select>
                        {formErr.category && <span style={{ color: 'red' }}>{formErr.category}</span>}
                    </FormControl>                    

                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            label="Release Date"
                            value={releaseDate}
                            onChange={(newValue) => {
                                setReleaseDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider><br />

                    <FormControl sx={{ mt: 2 }}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Level</FormLabel>
                        <RadioGroup sx={{ ml: 3 }}
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="level"
                            value={level}
                            onChange={handleChange}
                        >
                            <FormControlLabel value='beginner' control={<Radio />} label='beginner' />
                            <FormControlLabel value='intermediate' control={<Radio />} label='intermediate' />
                            <FormControlLabel value='expert' control={<Radio />} label='expert' />
                        </RadioGroup>
                    </FormControl>
                    {formErr.level && <span style={{ color: 'red' }}>{formErr.level}</span>}<br /><br/>

                    <Button sx={{mt:1, mr:1}} type="submit" variant="contained" color="primary" size="small">Submit</Button>
                    {edit && <Button sx={{ mt:1,mr: 1 }} variant="contained" color="primary" size="small" onClick={() => { handleClose() }}>Cancel</Button>}
                </Grid>
            </Grid>
        </form>
    </div>
}
export default CourseForm