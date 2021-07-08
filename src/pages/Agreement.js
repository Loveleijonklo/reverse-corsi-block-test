import React from 'react'
import BackButton from '../components/BackButton'

import { STRINGS } from '../components/Variables'

function Agreement() {
    return (
        <div className="agreement">
            <p>{STRINGS.DATA_COLLECTION_NOTICE}</p>
            <p>{STRINGS.VALIDITY_NOTICE}</p>
            <p>{STRINGS.BROWSER_NOTICE}</p>
            <p>{STRINGS.LEGAL_NOTICE}</p>
            <BackButton label={"I accept"}/>
        </div>
    )
}

export default Agreement
