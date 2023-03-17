import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
<<<<<<< HEAD
import App from './App';
import reportWebVitals from './reportWebVitals';

=======
import App from './App'; 
// // Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// // Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-bootstrap-typeahead/css/Typeahead.css';
>>>>>>> 1.0.0
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
