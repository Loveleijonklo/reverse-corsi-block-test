import React, { useContext, useState, useEffect } from 'react'
import { TestProgressContext } from '../contexts/TestProgress'

import ToMenuButton from '../components/BackButton'
import { STRINGS } from '../components/Variables'

function Results() {

    const testProgress = useContext(TestProgressContext)
    const [coffeeCupPerWeek, setCoffeeCupPerWeek] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('coffeeCupPerWeek')) {
            setCoffeeCupPerWeek(localStorage.getItem('coffeeCupPerWeek'))
        }
    }, [])

    function resetData() {
        if (window.confirm(STRINGS.RESET_CONFIRMATION)) {
            testProgress.resetAll()
            console.log('All data has been erased')
        }
    }

    function handleCoffeeCupChange(event) {
        setCoffeeCupPerWeek(event.target.value)
        localStorage.setItem('coffeeCupPerWeek', event.target.value)
    }

    return (
        <div className="results">
            <div className="results__coffee-data">
                <label>
                    <p className="results__coffee-data">
                        How many cups of coffee do you consume on a weekly basis?<br/>(Enter 0 if you are not at all a coffee drinker)
                    </p>
                    <input
                        className="results__coffee-data__input"
                        type="number"
                        min="0"
                        max="500"
                        step="1"
                        value={coffeeCupPerWeek}
                        onChange={handleCoffeeCupChange}
                    />
                </label>

            </div>

            <div className="results__test-data">
                <p className="results__test-data__title">Test results so far:</p>            
                <div className="results__test-data__container">
                    <p className="results__test-data__container__test-name">
                        N-back ({testProgress.nbackResults.length}/5)
                    </p>
                    <p className="results__test-data__container__results">
                        <ScoreRender dataArray={testProgress.nbackResults}/>
                    </p>
                </div>
            
            
                <div className="results__test-data__container">
                    <p className="results__test-data__container__test-name">
                        Memory updating ({testProgress.memoryUpdatingResults.length}/5)
                    </p>
                    <p className="results__test-data__container__results">
                        <ScoreRender dataArray={testProgress.memoryUpdatingResults}/>
                    </p>
                </div>
                
                <div className="results__test-data__container">
                    <p className="results__test-data__container__test-name">
                        Corsi-block tapping ({testProgress.corsiBlockResults.length}/5)
                    </p>
                    <p className="results__test-data__container__results">
                        <ScoreRender dataArray={testProgress.corsiBlockResults}/>
                    </p>
                </div>

                <div className="results__test-data__container">
                    <p className="results__test-data__container__test-name">
                        Reverse Corsi-block tapping ({testProgress.reverseCorsiBlockResults.length}/5)
                    </p>
                    <p className="results__test-data__container__results">
                        <ScoreRender dataArray={testProgress.reverseCorsiBlockResults}/>
                    </p>
                </div>
            </div>
            
            {
                (
                    (testProgress.nbackResults.length === 5)
                    && (testProgress.memoryUpdatingResults.length === 5)
                    && (testProgress.corsiBlockResults.length === 5)
                    && (testProgress.reverseCorsiBlockResults.length === 5)
                )
                
                && <p className="results__test-data__send-request">{STRINGS.SEND_DATA_NOTICE}</p>
            }
            

            <ToMenuButton label={"Back"}/>
            <p className="results__warning">{STRINGS.RESET_WARNING}</p>
            <button className="button--reset" onClick={resetData}>Reset</button>
        </div>
    )
}

export default Results

function ScoreRender({dataArray}) {
    return (
        <>{(dataArray.length === 0)
            ? <span>Not yet performed</span>
            : <>
                {dataArray.map((result, index) =>
                    <span key={index}>{result} </span>
                
                )}
            </>
            }
        </>
    )
}