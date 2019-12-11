import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button onClick={() => setValue((v) => v + 1)}>+</button>
                <button onClick={() => setVisible(false)}>hide</button>
                <HookCounter value={value} />
                <Notification />
            </div>
        );
    } else {
        return <button onClick={() => setVisible(true)}>show</button>
    }
};

const HookCounter = ({value}) => {
    useEffect(() => console.log('mount'), []);
    useEffect(() => console.log('update'));
    useEffect(() => () => console.log('unmount'), []);
    return <p>{value}</p>;
};

const Notification = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timerId = setTimeout(() => setVisible(!visible), 1500);
        return () => {
            console.log('timer id cleared')
            clearTimeout(timerId);
        }
    }, []);

    if (visible)
        return <div><p>Hello</p></div>;
    return null;
}

class ClassCounter extends Component {
    componentDidMount() {
        console.log('class: mount');
    }

    componentDidUpdate() {
        console.log('class: update');
    }

    componentWillUnmount() {
        console.log('class: unmount');
    }

    render() {
        return <p>{this.props.value}</p>;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
