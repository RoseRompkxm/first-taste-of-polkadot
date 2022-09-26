import React from 'react';
import './App.css';
import MainPage from 'pages/MainPage';
import { ApiProvider } from 'context/ApiContext';

function App() {
    return (
        <ApiProvider>
            <div className="app">
                <MainPage />
            </div>
        </ApiProvider>
    );
}

export default App;
