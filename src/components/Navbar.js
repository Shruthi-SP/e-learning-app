import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, Route } from "react-router-dom"
import { asyncGetUser } from "../actions/usersAction"
import Register from "./admin/Register"
import Login from "./admin/Login"

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
    
    return (
        <div>
            {
                userLoggedIn ? <div><h1>USer</h1></div> : <div>
                    <Link style={{ margin: '5px' }} to='/admin/register'> Register</Link>
                    <Link style={{ margin: '5px' }} to='/admin/login'>Login</Link>
                </div>
            }
            <Route path='/admin/register' component={Register}></Route>
            <Route path='/admin/login' render={(props) => {
                return <Login {...props} getData={getData} />
            }}></Route>
        </div>
    )
}
export default Navbar