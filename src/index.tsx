import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootDom = document.getElementById('root');
if (rootDom)  {
    const root = ReactDOM.createRoot(
        rootDom
    );
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

