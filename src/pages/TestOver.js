import React from 'react'
import BackButton from '../components/BackButton'

function TestOver() {
    return (
        <div className="end-notice">
            <p>This testing session is over. Please review and perform the remaining tasks to complete your data set.</p>
            <BackButton label={"Return"}/>
        </div>
    )
}

export default TestOver
