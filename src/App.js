import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Agreement from './pages/Agreement';
import Menu from './pages/Menu';

import NbackTest from './pages/NbackTest';
import MemoryUpdatingTest from './pages/MemoryUpdatingTest';
import CorsiBlockTest from './pages/CorsiBlockTest';
import ReverseCorsiBlockTest from './pages/ReverseCorsiBlockTest';

import TestOver from './pages/TestOver'
import Results from './pages/Results';
import About from './pages/About';

import { STRINGS } from './components/Variables';
import ExplanationPage from './components/ExplanationPage';

import './styles/styles.scss';

import { TestProgressProvider } from './contexts/TestProgress';

function App() {

    useEffect(() => {
        if (process.env.REACT_APP_DEBUG_MODE === 'true') {
            document.title = "Working Memory Testing Tool - DEBUG MODE"
        }
    }, [])

    return (
        <div className="App">
            <TestProgressProvider>
                <Router>
                    <AnimatedSwitch
                        atEnter={{translateX: 640, opacity: 0}}
                        atLeave={{translateX: -640, opacity: 0}}
                        atActive={{translateX: 0, opacity: 1}}
                        className="switch-wrapper"
                        mapStyles={styles => ({
                            transform: `translateX(${styles.translateX}px)`,
                            opacity: styles.opacity
                        })}
                    >
                        <Route exact path="/">
                            <Agreement/>
                        </Route>
                        <Route exact path="/menu">
                            <Menu/>
                        </Route>

                        {/* Explanation pages */}
                        <Route exact path="/nback">
                            <ExplanationPage
                                instructionStr = {STRINGS.NBACK_EXPLANATION}
                                testPath = "/nback/start"
                            />
                        </Route>
                        <Route exact path="/memory-updating">
                            <ExplanationPage
                                instructionStr = {STRINGS.MEMORY_UPDATING_EXPLANATION}
                                testPath = "/memory-updating/start"
                            />
                        </Route>
                        <Route exact path="/corsi-block">
                            <ExplanationPage
                                instructionStr = {STRINGS.CORSI_BLOCK_EXPLANATION}
                                testPath = "/corsi-block/start"
                            />
                        </Route>
                        <Route exact path="/reverse-corsi-block">
                            <ExplanationPage
                                instructionStr = {STRINGS.REVERSE_CORSI_BLOCK_EXPLANATION}
                                testPath = "/reverse-corsi-block/start"
                            />
                        </Route>                        

                        {/* The test pages */}
                        <Route exact path="/nback/start">
                            <NbackTest/>
                        </Route>
                        <Route exact path="/memory-updating/start">
                            <MemoryUpdatingTest/>
                        </Route>
                        <Route exact path="/corsi-block/start">
                            <CorsiBlockTest/>
                        </Route>
                        <Route exact path="/reverse-corsi-block/start">
                            <ReverseCorsiBlockTest/> 
                        </Route>
                        

                        <Route exact path="/test-over">
                            <TestOver/>
                        </Route>

                        {/* Other menu options */}
                        <Route exact path="/results">
                            <Results/>
                        </Route>
                        <Route exact path="/about">
                            <About/>
                        </Route>
                    </AnimatedSwitch>
                </Router>
            </TestProgressProvider>
        </div>
    );
}

export default App;
