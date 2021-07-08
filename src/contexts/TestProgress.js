import React, { useEffect, useState } from 'react'

const TestProgressContext = React.createContext();

function TestProgressProvider({children}) {

    const [nbackResults, setNbackResults] = useState([]);
    const [memoryUpdatingResults, setMemoryUpdatingResults] = useState([]);
    const [corsiBlockResults, setCorsiBlockResults] = useState([]);
    const [reverseCorsiBlockResults, setReverseCorsiBlockResults] = useState([]); 

    const [isSavingNewData, setIsSavingNewData] = useState(false)

    useEffect(()=> {
        if (isSavingNewData) {
            localStorage.setItem('nbackResults', JSON.stringify(nbackResults))
            localStorage.setItem('memoryUpdatingResults', JSON.stringify(memoryUpdatingResults))
            localStorage.setItem('corsiBlockResults', JSON.stringify(corsiBlockResults))
            localStorage.setItem('reverseCorsiBlockResults', JSON.stringify(reverseCorsiBlockResults))
            setIsSavingNewData(false)
        }
    }, [nbackResults, memoryUpdatingResults, corsiBlockResults, reverseCorsiBlockResults, setIsSavingNewData])

    function addNbackResult(_score) {
        let newResults = [...nbackResults]
        newResults.push(_score)
        if (newResults.length > 5) newResults.splice(0, 1)
        setNbackResults(newResults);
        setIsSavingNewData(true);
    }

    function addMemoryUpdatingResult(_score) {
        let newResults = [...memoryUpdatingResults]
        newResults.push(_score)
        if (newResults.length > 5) newResults.splice(0, 1)
        setMemoryUpdatingResults(newResults);
        setIsSavingNewData(true);
    }

    function addCorsiBlockResult(_score) {
        let newResults = [...corsiBlockResults]
        newResults.push(_score)
        if (newResults.length > 5) newResults.splice(0, 1)
        setCorsiBlockResults(newResults);
        setIsSavingNewData(true);
    }

    function addReverseCorsiBlockResult(_score) { 
        let newResults = [...corsiBlockResults]
        newResults.push(_score)
        if (newResults.length > 5) newResults.splice(0, 1)
        setReverseCorsiBlockResults(newResults);
        setIsSavingNewData(true);
    }
    
    function retrieveFromLocalStorage() {
        
        if (localStorage.nbackResults) {
            setNbackResults(JSON.parse(localStorage.getItem('nbackResults')))
        }
        if (localStorage.memoryUpdatingResults) {
            setMemoryUpdatingResults(JSON.parse(localStorage.getItem('memoryUpdatingResults')))
        }
        if (localStorage.corsiBlockResults) {
            setCorsiBlockResults(JSON.parse(localStorage.getItem('corsiBlockResults')))
        }   
        
    }
    
    function resetAll() {
        setNbackResults([])
        setMemoryUpdatingResults([])
        setCorsiBlockResults([])
        setReverseCorsiBlockResults([])
        localStorage.clear()
    }

    return (
        <div>
            <TestProgressContext.Provider value ={{
                nbackResults,
                addNbackResult,
                memoryUpdatingResults,
                addMemoryUpdatingResult,
                corsiBlockResults,
                addCorsiBlockResult,
                reverseCorsiBlockResults,
                addReverseCorsiBlockResult,
                retrieveFromLocalStorage,
                resetAll,
            }}>
                {children}
            </TestProgressContext.Provider>
            
        </div>
    )
}

export {TestProgressContext, TestProgressProvider}
