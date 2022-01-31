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
export const asyncLoginUser = (formData, redirect) => {
    return () => {
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
                    localStorage.setItem('adminToken', result.token)
                    asyncGetUser()
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
                Authorization: localStorage.getItem('adminToken')
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

export const setUser = (obj) => {
    return { type: 'SET_USER', payload: obj }
}
export const removeUser = () => {
    return { type: 'REMOVE_USER' }
}