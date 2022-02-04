import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Route } from "react-router-dom"
import { asyncGetUser, removeUser } from "../actions/usersAction"
import Login from "./admin/Login"
import PrivateRoute from "./helper/PrivateRoute"
import Account from "./admin/Account"
import { Grid } from "@mui/material"
import Swal from "sweetalert2"
import { withRouter } from "react-router-dom"
import AddAdmin from "./admin/AddAdmin"
import Home from "./admin/Home"
import AddStudent from "./students/AddStudent"
import StudentsList from "./students/StudentsList"
import StudentLogin from "./students/StudentLogin"
import StudentAccount from "./students/StudentAccount"
import { asyncGetStudent } from "../actions/studentsAction"
import jwtDecode from "jwt-decode"
import CoursesList from "./courses/CoursesList"
import CourseInfo from "./courses/CourseInfo"

const Navbar = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [login, setLogin] = useState('')

    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.token) {
            const role = localStorage.getItem('role')
            console.log('role', role)
            if(role==='Student'){
                const id = jwtDecode(localStorage.getItem('token'))._id
                console.log(login, localStorage.role, id)
                dispatch(asyncGetStudent(id))
                setLogin('Student')
            }
            else if(role==='Admin'){
                console.log(login, localStorage.role)
                dispatch(asyncGetUser())
                setLogin('Admin')
            }
        }
    }, [])

    const user = useSelector(state => {
        return state.user
    })
    console.log('navbar', userLoggedIn, admin, user)
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            setUserLoggedIn(true)
            if (user.role === 'admin') {
                setAdmin(true)
            }
        }
    }, [user])

    const handleLogin = (e) => {
        const value = e.target.value
        setLogin(value)
        value === 'Admin' ? props.history.push('/admin/login') : value === 'Student' ? props.history.push('/student/login') : props.history.push('/')
    }

    const handleLogout = () => {
        localStorage.clear()
        dispatch(removeUser())
        setAdmin(false)
        setUserLoggedIn(false)
        props.history.push('/')
        Swal.fire({
            icon: 'success',
            title: 'Logget Out',
            text: 'successfully logged out',
            footer: ''
        })
        setUserLoggedIn(false)
        setAdmin(false)
        setLogin('')
    }

    return (
        <div>
            {
                userLoggedIn ?
                    <Grid container direction="row" sx={{ mt: 1, mb: 1 }} style={{ borderRadius: '2px', backgroundColor: '#63A1DE', width: '98%' }}>

                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", }} >
                            {
                                admin && <>
                                    <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/admin/account'>Account</Link>
                                    <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/admin/students'>Register-Student</Link>
                                    <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/admin/allStudents'>Students</Link>
                                </>
                            }
                            {
                                !admin && <>
                                    <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/student/account'>Account</Link>
                                </>
                            }
                            <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/courses'>Courses</Link>
                            <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/courses/:id'>Course</Link>
                        </Grid>

                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Link style={{ margin: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/' onClick={handleLogout}>Logout</Link>
                        </Grid>

                    </Grid> : <Grid container direction="row" sx={{ mt: 1, mb: 1 }} style={{ borderRadius: '2px', backgroundColor: '#63A1DE', width: '98%' }}>

                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", }}>
                            <Link style={{ margin: '5px', padding: '5px', textDecoration: 'none', fontSize: '18px', color: 'white'}} to='/'>Home</Link>
                        </Grid>

                        <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>

                            <Link style={{ margin: '5px', padding: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white'}} to='/admin/register'> Register</Link>

                            {/* <Link style={{ margin: '10px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/admin/login'>Login</Link> */}
                            <select style={{ margin: '5px', padding: '5px', justifyContent: 'end', backgroundColor: '#63A1DE', border:'0px', fontSize: '16.9px', color: 'white' }} value={login} onChange={handleLogin}>
                                <option style={{border:'0px'}}>Login As</option>
                                <option style={{border:'0px'}} value="Admin">Admin</option>
                                <option value="Student">Student</option>
                            </select>

                        </Grid>

                    </Grid>
            }

            <Route path='/' exact component={Home}></Route>
            <Route path='/admin/register' component={AddAdmin}></Route>
            <Route path='/admin/login' render={(props) => {
                return <Login {...props} />
            }}></Route>
            <Route path='/student/login' render={(props) => {
                return <StudentLogin {...props} />
            }}></Route>
            <PrivateRoute path='/admin/account' component={Account} />
            <PrivateRoute path='/admin/students' component={AddStudent} />
            <PrivateRoute path='/admin/allStudents' component={StudentsList} />
            <PrivateRoute path='/student/account' component={StudentAccount} />
            <PrivateRoute path='/courses' component={CoursesList} />
            <PrivateRoute path='/courses/:id' component={CourseInfo} />
        </div>
    )
}
export default withRouter(Navbar) 