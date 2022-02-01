import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, Route } from "react-router-dom"
import { asyncGetUser, removeUser } from "../actions/usersAction"
import Register from "./admin/Register"
import Login from "./admin/Login"
import PrivateRoute from "./helper/PrivateRoute"
import Account from "./admin/Account"
import { Grid } from "@mui/material"
import Swal from "sweetalert2"
import { withRouter } from "react-router-dom"
import AddAdmin from "./admin/AddAdmin"
import Home from "./admin/Home"

const Navbar = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [admin, setAdmin] = useState(false)

    const dispatch = useDispatch()

    const handleLoggedIn = () => {
        setUserLoggedIn(true)
    }
    const handleAdmin = () => {
        setAdmin(true)
    }
    const getData = (obj) => {
        if (obj.role === 'admin') {
            handleAdmin()
        }
        handleLoggedIn()
    }
    useEffect(() => {
        if (localStorage.token) {
            dispatch(asyncGetUser(getData))
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
    }

    return (
        <div>
            {
                userLoggedIn ? <div>
                    <Grid container direction="row" sx={{ mt: 1, mb: 1 }}>
                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", }}>
                            <Link style={{ margin: '5px' }} to='/admin/account'>Account</Link>
                        </Grid>
                        <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Link style={{ margin: '5px', justifyContent: 'end' }} to='#' onClick={handleLogout}>Logout</Link>
                        </Grid>
                    </Grid>
                </div> : <Grid container direction="row" sx={{ mt: 1, mb: 1 }}>
                    <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", }}>
                        <Link style={{ margin: '5px', marginLeft:'0px' }} to='#'>Home</Link>
                    </Grid>
                    <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Link style={{ margin: '5px', justifyContent: 'end' }} to='/admin/register'> Register</Link>
                        <Link style={{ margin: '5px', justifyContent: 'end' }} to='/admin/login'>Login</Link>
                    </Grid>

                </Grid>
            }
            <Route path='/' exact component={Home}></Route>
            <Route path='/admin/register' component={AddAdmin}></Route>
            <Route path='/admin/login' render={(props) => {
                return <Login {...props} getData={getData} />
            }}></Route>
            <PrivateRoute path='/admin/account' component={Account} />
        </div>
    )
}
export default withRouter(Navbar) 