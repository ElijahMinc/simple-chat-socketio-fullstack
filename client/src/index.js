import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './context/AppContext';

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
       <App />
    </AppProvider>
  </React.StrictMode>,
  root
);