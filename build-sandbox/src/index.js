import React from 'react';
import ReactDOM from 'react-dom';
import css from './main.css';

console.log(css.toString());

const App = () => <p>Hello</p>;

ReactDOM.render(<App/>, document.getElementById('root'));
