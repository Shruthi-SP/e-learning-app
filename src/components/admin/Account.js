import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Account = (props) => {
    const user = useSelector(state => {
        return state.user
    })

    return (
        <div>
            {Object.keys(user).length > 0 && <>
                <p>Name: <b>{user.username}</b></p>
                <p>Email: <b>{user.email}</b></p>
                <p>Role: <b>{user.role}</b></p>
                <p>Academy Name: <b>{user.academy.name}</b></p>
                <p>Academy Website: <b>{user.academy.website}</b></p>
            </>}
        </div>
    )
}
export default Account