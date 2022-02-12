import axios from "../config/axios-config";
import Swal from "sweetalert2";

export const asyncAllLectures = (courseId) => {
    return (dispatch) => {
        axios.get(`/courses/${courseId}/lectures`, {
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
export const asyncCreateLecture = (courseId, formData, redirect) => {
    return (dispatch) => {
        axios.post(`/courses/${courseId}/lectures`, formData, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log('async create',result)
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.message,
                        footer: ''
                    })
                }
                else {
                    dispatch(addLecture(result))
                    Swal.fire({
                        icon: 'success',
                        title: 'Added',
                        text: 'Lecture Added successfully',
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
    console.log('async update', courseId, lectureId, formData)
    return (dispatch) => {
        axios.put(`/courses/${courseId}/lectures/${lectureId}`, formData, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log('update res', result)
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
                    console.log('updated lec', result)
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated',
                        text: 'Lecture updated successfully',
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
export const asyncDeleteLecture = (courseId, lectureId, reset) => {
    return (dispatch) => {
        axios.delete(`/courses/${courseId}/lectures/${lectureId}`, {
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
                    reset()
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
export const asyncAddComment = (lectureId, body, reset) => {
    return (dispatch) => {
        axios.patch(`/lectures/${lectureId}/comments`, body, {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log('comment res', result)
                if(result.hasOwnProperty('errors')){
                    console.log('then err res', result.errors)
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
                        title: 'Added',
                        text: 'Your comment has been recorded',
                        footer: ''
                    })
                    reset()
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
export const asyncUncomment = (lectureId, commentId, reset) => {
    return (dispatch) => {
        axios.patch(`/lectures/${lectureId}/uncomment/${commentId}`, {}, {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log('comment res', result)
                if(result.hasOwnProperty('errors')){
                    console.log('then err res', result.errors)
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
                        title: 'Removed',
                        text: 'Comment has been removed',
                        footer: ''
                    })
                    reset() 
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
export const asyncMarkCompleted = (lectureId, studentId) => {
    return (dispatch) => {
        axios.patch(`/lectures/${lectureId}/complete?studentId=${studentId}`, {}, {
            headers: {
                Authorization : localStorage.getItem('token')
            }
        })
            .then((response)=>{
                const result = response.data
                console.log('mark completed res', result)
                if(result.hasOwnProperty('errors')){
                    console.log('then err res', result.errors)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.errors,
                        footer: ''
                    })
                }
                else {
                    if(typeof(result)==='object'){
                        dispatch(updateLecture(result))
                    }                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Completed Lecture',
                        text: typeof(result)==='string' && 'Already marked as complete',
                        footer: ''
                    }) 
                }
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