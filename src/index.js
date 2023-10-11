// import React
import React from 'react';
import ReactDOM from 'react-dom/client';
// import CSS right in the JS, not as a link in the HTML
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// my components
import Hello from './components/hello'
import Cocktail from './components/cocktail'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
