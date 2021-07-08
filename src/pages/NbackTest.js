import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';

import { TestProgressContext } from '../contexts/TestProgress' 
import { randIncl } from '../utilities/Random'

function NBackTest() {
    
    const [isTestOver, setIsTestOver] = useState(false)
    const [currentData, setCurrentData] = useState([])
    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState()
    const [score, setScore] = useState(0)

    const testProgress = useContext(TestProgressContext)

    const history = useHistory()

    useEffect(()=>{
        if (currentData.length <= 6) {
            addNewNumber()
        } else {
            generateNewQuestion()
        }    
    }, [currentData])

    useEffect(()=>{
        if (answer === undefined) return
        const questionedNumber = currentData[currentData.length-question-1]
        if (answer === questionedNumber) {
            setScore(score => score + 1)
            setAnswer(undefined)
            setQuestion(undefined)
            addNewNumber()
        } else {
            setIsTestOver(true)
        }
    }, [answer])

    useEffect(()=>{
        if (score === 5) {
            setIsTestOver(true)
        }
    }, [score])

    useEffect(()=>{
        if (isTestOver) {
            testProgress.addNbackResult(score)
            history.push("/test-over")
        }
    }, [isTestOver])

    function generateNewQuestion() {

        setTimeout(() => {
            if (question === undefined) {
                setQuestion(1 + randIncl(6))
            }
        }, 1500)
       
   }

    function addNewNumber() {
        setTimeout(()=>{
            setCurrentData([...currentData, randIncl(9)])
        }, 1200)
    }

    function submitAnswer(value) {
        console.log(value)
        setAnswer(value)
    }

    // Rendering //

    // Formatting ordinal numbers
    let ordinalStr = ''
    switch (question) {

        case 1:
            ordinalStr = 'second'
            break;

        case 2:
            ordinalStr = 'third'
            break;

        case 3:
            ordinalStr = 'fourth'
            break;

        case 4:
            ordinalStr = 'fifth'
            break;

        case 5:
            ordinalStr = 'sixth'
            break;

        case 6:
            ordinalStr = 'seventh'
            break;
    }
    
    return (
        <div className="nback">
            {/* dotenv only store string, hence an explicit comparison to the string 'true' is necessary*/}
            {(process.env.REACT_APP_DEBUG_MODE === 'true')
                && <>Debug data: {currentData.map((num, index) => <span key={index}>{num} </span>) }; {question}</>
            }
            <p className="nback__attention">Pay attention to these numbers:</p>
            <div className="nback__current-data">
                {currentData.map((num, index) => 
                    <Number key={index} value={num} isHidden={index<currentData.length-1}/> 
                )}
            </div>

            {(question) && <div className="nback__qa">
                <div className="nback__qa__question">
                    <p>{`What is the ${ordinalStr} last digit?`}</p>
                </div>
                <div className="nback__qa__answers--nb">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((value, index) =>
                        <button key={index}
                            className="nback__qa__answers--nb__answer"
                            onClick={()=>{submitAnswer(value)}}
                        >
                            {value}
                        </button>
                    )}
                </div>
            </div>}
        </div>
    )
}

export default NBackTest

function Number({value, isHidden}) {

    let numberClass = "nback__current-data__num"
    if (isHidden) numberClass += " nback__current-data__num--hidden"

    return (
        <span className={numberClass}>
            {(isHidden)
                ? <>🗙</>
                : <>{value}</>
            }
        </span>
    )
}
