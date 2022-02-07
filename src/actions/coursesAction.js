import axios from '../config/axios-config'
import Swal from 'sweetalert2'

export const asyncGetAllCourses = () => {
    return(dispatch) => {
        axios.get('/courses', {
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
                    dispatch(getAllCourses(result))
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
export const asyncCreateCourse = (formData, resetForm) => {
    return (dispatch) => {
        axios.post('/courses', formData, {
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
                    dispatch(addCourse(result))
                    resetForm()
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
export const asyncGetCourse = (id, getResult) => {
    return () => {
        axios.get(`/courses/${id}`, {
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
export const asyncUpdateCourse = (id, formData) => {
    return (dispatch) => {
        axios.put(`/courses/${id}`, formData, {
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
                        text: result.errors.message,
                        footer: ''
                    })
                }
                else {
                    dispatch(updateCourse(result))
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
export const asyncDeleteCourse = (id) => {
    return (dispatch) => {
        axios.delete(`/courses/${id}`, {
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
                    dispatch(deleteCourse(result))
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
export const asyncGetMyCourses = (getResult) => {
    return() => {
        axios.get('/courses/enrolled', {
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
export const asyncEnrollCourseAdmin = (courseId, studentId, getResult) => {
    console.log('async enroll',courseId,studentId,getResult, localStorage.getItem('token'))
    return(dispatch) => {
        axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/enroll?courseId=${courseId}&studentId=${studentId}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                console.log('inside then',result)
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
                    dispatch(asyncGetAllCourses())
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Enrolled to the course successfully',
                        footer: ''
                    })   
                }
            })
            .catch((err) => {
                console.log('inside catch', err)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                    footer: ''
                })
            })
    }
}
export const asyncUnenrollCourseAdmin = (courseId, studentId, getResult) => {
    return(dispatch) => {
        axios.patch(`/courses/unenroll?courseId=${courseId}&studentId=${studentId}`, {
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
                    getResult(result)
                    dispatch(asyncGetAllCourses())
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Unenrolled from the course',
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
export const asyncEnrollCourseStudent = (courseId, getResult) => {
    return(dispatch) => {
        axios.patch(`/courses/unenroll?courseId=${courseId}`, {
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
                    getResult(result)
                    dispatch(asyncGetAllCourses())
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Unenrolled from the course',
                        footer: ''
                    })   
                }
            })
    }
}
export const asyncUnenrollCourseStudent = (courseId, getResult) => {
    return(dispatch) => {
        axios.patch(`/courses/unenroll?courseId=${courseId}`, {
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
                    getResult(result)
                    dispatch(asyncGetAllCourses())
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Unenrolled from the course',
                        footer: ''
                    })   
                }
            })
    }
}
export const getAllCourses = (courses) => {
    return { type: 'GET_ALL_COURSES', payload: courses }
}
export const addCourse = (course) => {
    return { type: 'ADD_COURSE', payload: course }
}
export const updateCourse = (course) => {
    return { type: 'UPDATE_COURSE', payload: course }
}
export const deleteCourse = (course) => {
    return { type: 'DELETE_COURSE', payload: course }
}