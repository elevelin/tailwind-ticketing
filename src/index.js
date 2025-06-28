import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css'; // instead of index.css, if output is the compiled CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
