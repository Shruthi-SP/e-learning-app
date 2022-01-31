import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, Route } from "react-router-dom"
import { asyncGetUser } from "../actions/usersAction"
import Register from "./admin/Register"

const Navbar = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [admin, setAdmin] = useState(false)
    const dispatch = useDispatch()
    const getData = (obj) => {
        if (obj.role === 'admin') {
            setAdmin(true)
        }
        setUserLoggedIn(true)
    }
    useEffect(() => {
        if (localStorage.token) {
            dispatch(asyncGetUser(getData))
        }
    }, [])
    return (
        <div>
            {
                userLoggedIn ? <div>User</div> : <div>
                    <Link style={{ margin: '5px' }} to='/admin/register'> Register</Link>
                </div>
            }
            <Route path='/admin/register' component={Register}></Route>
        </div>
    )
}
export default Navbar