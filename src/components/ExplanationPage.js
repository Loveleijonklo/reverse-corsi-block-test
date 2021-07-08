import React from 'react'
import BackButton from './BackButton'
import StartButton from './StartButton'
import { STRINGS } from './Variables'

function ExplanationPage({instructionStr, testPath}) {

    return (
        <div className="explain-page">
            <div className="explain-page__content">
                <p>{instructionStr}</p>
                <p>{STRINGS.TIME_LIMIT_NOTICE}</p>
            </div>
            <StartButton path={testPath}/>
            <BackButton label={"Back"}/>
        </div>
    )
}

export default ExplanationPage
