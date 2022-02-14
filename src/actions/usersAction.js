import Swal from "sweetalert2";
import axios from "../config/axios-config";

export const asyncRegisterUser = (formData, redirect) => {
    return () => {
        axios.post('/admin/register', formData)
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
                        text: result.notice,
                        footer: ''
                    })
                    if(redirect){
                        redirect()
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
export const asyncLoginUser = (formData, redirect) => {
    return (dispatch) => {
        axios.post('/admin/login', formData)
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
                        title: 'Successful',
                        text: 'Logged in successful',
                        footer: ''
                    })
                    localStorage.setItem('token', result.token)
                    localStorage.setItem('role', 'Admin')
                    dispatch(asyncGetUser())
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
export const asyncGetUser = () => {
    return (dispatch) => {
        axios.get('/admin/account', {
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
                dispatch(setUser(result))
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
export const asyncUpdateUser = (formData) => {
    return (dispatch) => {
        axios.put('/admin', formData, {
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
                dispatch(setUser(result))
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Update successful',
                    footer: ''
                })
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

export const setUser = (obj) => {
    return { type: 'SET_USER', payload: obj }
}
export const removeUser = () => {
    return { type: 'REMOVE_USER' }
}