// frontend/src/App.js

import React from 'react';
import './App.css';
import Dashboard from './Dashboard';



function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Document Dashboard</h1>
            </header>
            <main>
                <Dashboard />
            </main>
        </div>
    );
}


export default App;
