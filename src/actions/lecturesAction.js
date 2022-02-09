import axios from "../config/axios-config";
import Swal from "sweetalert2";

export const asyncAllLectures = (courseId) => {
    console.log('async lec', courseId)
    return (dispatch) => {
        axios.get(`/courses/${courseId}/lectures`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log('all lec res',result)
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.errors,
                        footer: ''
                    })
                }
                else {
                    dispatch(getAllLectures(result))
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
export const asyncCreateLecture = (courseId, formData) => {
    return (dispatch) => {
        axios.get(`/courses/${courseId}/lectures`, formData, {
            headers: {
                Authorization: localStorage.getItem('token')
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
                    dispatch(addLecture(result))
                    Swal.fire({
                        icon: 'success',
                        title: 'Added',
                        text: 'Course Added successfully',
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
export const asyncGetLecture = (courseId, lectureId, getResult) => {
    return (dispatch) => {
        axios.get(`/courses/${courseId}/lectures/${lectureId}`, {
            headers: {
                Authorization: localStorage.getItem('token')
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
                    getResult(result)
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
export const asyncUpdateLecture = (courseId, lectureId, formData) => {
    return (dispatch) => {
        axios.get(`/courses/${courseId}/lectures/${lectureId}`, formData, {
            headers: {
                Authorization: localStorage.getItem('token')
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
                    dispatch(updateLecture(result))
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated',
                        text: 'Course updated successfully',
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
export const asyncDeleteLecture = (courseId, lectureId) => {
    return (dispatch) => {
        axios.get(`/courses/${courseId}/lectures/${lectureId}`, {
            headers: {
                Authorization: localStorage.getItem('token')
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
                    dispatch(deleteLecture(result))
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted',
                        text: 'Course deleted successfully',
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
export const getAllLectures = (lectures) => {
    return {type:'GET_ALL_LECTURES', payload: lectures}
}
export const addLecture = (lecture) => {
    return {type:'ADD_LECTURE', payload: lecture}
}
export const updateLecture = (lecture) => {
    return {type:'UPDATE_LECTURE', payload: lecture}
}
export const deleteLecture = (lecture) => {
    return {type:'DELETE_LECTURE', payload: lecture}
}