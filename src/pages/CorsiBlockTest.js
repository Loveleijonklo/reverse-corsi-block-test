import React, { useEffect, useContext, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';

import { randIncl, randNUniqueNumsWithinRange } from '../utilities/Random'

import { TestProgressContext } from '../contexts/TestProgress' 

const TIME_INTERVAL = 1000
const STARTUP_DELAY = 2000

const INSTRUCTION_OBSERVE = "Observe the pattern closely"
const INSTRUCTION_REPEAT = "Now repeat the pattern you saw by tapping the block in the correct sequence"

function CorsiBlockTest() {

    const [isTestOver, setIsTestOver] = useState(false)
    const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(false)
    const [blockMap, setBlockMap] = useState(getInitialBlockMap())
    const blockMapRef = useRef(blockMap)
    blockMapRef.current = blockMap

    const [question, setQuestion] = useState([])
    const [answer, setAnswer] = useState([])
    const score = useRef(0)

    const testProgress = useContext(TestProgressContext)

    const history = useHistory()

    useEffect(() => {
        // Startup trigger, will run only once at first

        if (question.length === 0) {
            debugLog('Triggering new question generation from question change')
            generateNewQuestion()
        }

        // Making sure that this is ran on a new and properly populated question set
        if (!isWaitingForAnswer && question.length > 0) {

            // Initiate a small delay to orientate the user before a new question is set
            setTimeout(() => {
                
                // Show pattern
                question.forEach((ques, index) => {
                    setTimeout(() => {
                        highlightBlockState(ques)
                    }, index * TIME_INTERVAL)
                })

                // Reset and get the participant ready for the answer
                setTimeout(() => {
                    setIsWaitingForAnswer(true)
                    setBlockMap(getInitialBlockMap())
                }, (question.length + 1) * TIME_INTERVAL)

            }, STARTUP_DELAY)

        }
    }, [question])

    useEffect(() => {

        // Only run when there has been active changes to the answer
        if (answer.length <= 0) return

        // Check if the latest answer is correct
        if (answer[answer.length-1] === question[answer.length-1]) {

            debugLog('Correct block')

            // The answer for this question has been completed
            if (answer.length === question.length) {

                setIsWaitingForAnswer(false)
                score.current += 1

                setTimeout(() => {
                    setBlockMap(getInitialBlockMap())
                    debugLog('Triggering new question generation from answer completion')
                    generateNewQuestion()
                    setAnswer([])
                }, 1000)
            }

        } else {
            debugLog('Wrong block')
            setIsTestOver(true)
        }

    }, [answer])

    useEffect(() => {
        if (score.current === 5) {
            setIsTestOver(true)
        }
    }, [score.current])

    useEffect(() => {
        if (isTestOver) {
            testProgress.addCorsiBlockResult(score.current)
            history.push("/test-over")
        }
    }, [isTestOver])

    function getQuesLen() {
        return score.current + 4
    }

    function getInitialBlockMap() {
        let array = []
        for (let i = 0; i < 35; i++) {
            array.push(false)
        }
        return array
    }

    function generateNewQuestion() {

        const newArr = randNUniqueNumsWithinRange(getQuesLen(), 35)

        debugLog('Generated new question: ' + newArr)
        setQuestion(newArr)
    }

    function highlightBlockState(index) {
        if (process.env.REACT_APP_DEBUG_MODE) {
            debugLog('Highlighting block: ' + index)
        }

        let newMap = [...blockMapRef.current]
        newMap[index] = true
        setBlockMap(newMap)
    }

    function addNewAnswerNode(index) {
        let newAns = [...answer]
        newAns.push(index)
        setAnswer(newAns)
    }

    function handleBlockClick(index) {
        if (isWaitingForAnswer) {
            highlightBlockState(index)
            addNewAnswerNode(index)
        }
    }

    return (
        <div className="corsiblock">

            {(process.env.REACT_APP_DEBUG_MODE === 'true')
                && <>
                    Debug data: {question.map((num, index) => <span key={index}>{num} </span>) };
                    {answer.map((num, index) => <span key={index}>{num} </span>) }
                
                </>
            }

            <div className="corsiblock__instruction">
                <p className="corsiblock__instruction__content">
                    {(isWaitingForAnswer)
                        ? <>{INSTRUCTION_REPEAT}</>
                        : <>{INSTRUCTION_OBSERVE}</>
                    }
                </p>
            </div>

            {/* The block map */}
            <div className="corsiblock__blocks">
                {blockMap.map((isHighlighted, index) => <div
                    key={index}
                    className="corsiblock__blocks__container"
                >
                    <Block index={index} isHighlighted={isHighlighted} handleClick={handleBlockClick}/>
                    
                </div>)}
            </div>
        </div>
    )
}

function Block({index, isHighlighted, handleClick}) {

    let classNames = "corsiblock__blocks__container__block corsiblock__blocks__container__block--clickable"
    
    if (isHighlighted) classNames += " corsiblock__blocks__container__block--highlighted"

    return (
        <div
            className={classNames}
            onClick={()=>{handleClick(index)}}
        >
            {(process.env.REACT_APP_DEBUG_MODE === 'true') && <>{index}</>}
        </div>
    )
}

export default CorsiBlockTest

function debugLog(str) {
    if (process.env.REACT_APP_DEBUG_MODE) {
        console.log(str)
    }
}