import Swal from "sweetalert2";
import axios from "../config/axios-config";
import jwtDecode from "jwt-decode";
import { setUser } from "./usersAction";

export const asyncGetAllStudents = () => {
    return (dispatch) => {
        axios.get('/admin/students', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.errors,
                        footer: ''
                    })
                }
                else {
                    dispatch(getAllStudents(result))
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                    footer: ''
                })
            })
    }
}

export const asyncRegisterStudent = (formData, resetForm) => {
    return (dispatch) => {
        axios.post('/admin/students', formData, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.errors,
                        footer: ''
                    })
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registered',
                        text: 'Student registered successfully',
                        footer: ''
                    })
                    dispatch(addStudent(result))
                    resetForm()
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                    footer: ''
                })
            })
    }
}
export const asyncLoginStudent = (formData, getId, redirect) => {
    return (dispatch) => {
        axios.post('/students/login', formData)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.errors,
                        footer: ''
                    })
                }
                else {
                    localStorage.setItem('token', result.token)
                    localStorage.setItem('role', 'Student')
                    let decoded = jwtDecode(result.token);
                    console.log(decoded);
                    getId(decoded)
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Logged in successful',
                        footer: ''
                    })
                    redirect()
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                    footer: ''
                })
            })
    }
}
export const asyncGetStudent = (id, getStudent) => {
    return (dispatch) => {
        axios.get(`/students/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.errors,
                        footer: ''
                    })
                }
                else {
                    if(getStudent){
                        getStudent(result)
                    }else{
                        dispatch(setUser(result))
                    }
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                    footer: ''
                })
            })
    }
}
export const asyncUpdateStudent = (id, formData) => {
    return (dispatch) => {
        axios.put(`/students/${id}`, formData, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.errors,
                        footer: ''
                    })
                }
                else {
                    dispatch(updateStudent(result))
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Update successful',
                        footer: ''
                    })
                }
            })
            .catch((err) => {
                console.log('inside catch')
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                    footer: ''
                })
            })
    }
}
export const asyncDeleteStudent = (id) => {
    return (dispatch) => {
        axios.delete(`/admin/students/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    console.log('inside then err')
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.errors,
                        footer: ''
                    })
                }
                else {
                    dispatch(deleteStudent(result))
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Delete successful',
                        footer: ''
                    })
                }
            })
            .catch((err) => {
                console.log('inside catch')
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                    footer: ''
                })
            })
    }
}
export const getAllStudents = (students) => {
    return { type: 'GET_ALL_STUDENTS', payload: students }
}
export const addStudent = (studObj) => {
    return { type: 'ADD_STUDENT', payload: studObj }
}
export const updateStudent = (studObj) => {
    return { type: 'UPDATE_STUDENT', payload: studObj }
}
export const deleteStudent = (studObj) => {
    return { type: 'DELETE_STUDENT', payload: studObj }
}