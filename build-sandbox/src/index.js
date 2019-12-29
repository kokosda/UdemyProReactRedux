import React from 'react';
import ReactDOM from 'react-dom';
import css from './main.scss';

console.log(css.toString());

const App = () => <p>This is WebPack React App</p>;

ReactDOM.render(<App/>, document.getElementById('root'));
