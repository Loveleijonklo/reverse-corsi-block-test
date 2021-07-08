import React from 'react'
import { useHistory } from 'react-router-dom'

function ToMenuButton({label}) {

    const history = useHistory()

    return (
        <div>
            <button className="button--back" onClick={()=>{history.push("/menu")}}>{label}</button>
        </div>
    )
}

export default ToMenuButton
