import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
const DashboardSelect = (props) => {
    //console.log('dselect props=', props)
    const { data, dataType } = props
    const [array, setArray] = useState(data)

    useEffect(()=>{
        setArray(data)
    }, [data])

    return (
        <>
            <ol>
                {
                    array.slice(-5).map(ele=>{
                        return <li key={ele._id}>
                            <Link to={ dataType=='students' ? `/admin/students/${ele._id}`: `/courses/${ele._id}`}>{ele.name}</Link>
                        </li>
                    })
                }
            </ol>
        </>
    )
}
export default DashboardSelect