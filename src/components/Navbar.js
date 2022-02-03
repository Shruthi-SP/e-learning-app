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

const Navbar = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [admin, setAdmin] = useState(false)

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

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.token) {
            dispatch(asyncGetUser())
        }
    }, [])

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
    }

    return (
        <div>
            {
                userLoggedIn ?
                    <Grid container direction="row" sx={{ mt: 1, mb: 1 }} style={{ borderRadius: '2px', backgroundColor: '#63A1DE', width: '98%' }}>

                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", }} >

                            <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/admin/account'>Account</Link>

                            {
                                admin && <>
                                    <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/admin/students'>Register-Student</Link>
                                    <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/admin/allStudents'>Students</Link>
                                </>
                            }
                        </Grid>

                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Link style={{ margin: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/' onClick={handleLogout}>Logout</Link>
                        </Grid>

                    </Grid> : <Grid container direction="row" sx={{ mt: 1, mb: 1 }} style={{ borderRadius: '2px', backgroundColor: '#63A1DE', width: '98%' }}>

                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", }}>
                            <Link style={{ margin: '5px', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/'>Home</Link>
                        </Grid>

                        <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>

                            <Link style={{ margin: '10px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/admin/register'> Register</Link>

                            <Link style={{ margin: '10px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/admin/login'>Login</Link>

                        </Grid>

                    </Grid>
            }

            <Route path='/' exact component={Home}></Route>
            <Route path='/admin/register' component={AddAdmin}></Route>
            <Route path='/admin/login' render={(props) => {
                return <Login {...props} />
            }}></Route>
            <PrivateRoute path='/admin/account' component={Account} />
            <PrivateRoute path='/admin/students' component={AddStudent} />
            <PrivateRoute path='/admin/allStudents' component={StudentsList} />
        </div>
    )
}
export default withRouter(Navbar) 