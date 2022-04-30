import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

const root = document.getElementById('root');

ReactDOM.createRoot(root!)
    .render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );

