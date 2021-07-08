import React from 'react'
import BackButton from '../components/BackButton'
import { STRINGS } from '../components/Variables'

function About() {

    return (
        <div className="about">
            <p>{STRINGS.DATA_COLLECTION_NOTICE}</p>
            <p>Created by <a href="https://junongx.com/" rel="noopener noreferrer" target="_blank">Juno Nguyen</a> with <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">ReactJS</a> and <a href="hhttps://sass-lang.com/" rel="noopener noreferrer" target="_blank">SASS</a>. The source code is open and distributed under MIT License:</p>
            <p><a href="https://github.com/JunoNgx/working-memory-test" rel="noopener noreferrer" target="_blank">https://github.com/JunoNgx/working-memory-test</a></p>
            <p>For any question or issue, please contact Juno via appropriate channels.</p>

            <BackButton label={"Back"}/>
        </div>
    )
}

export default About
