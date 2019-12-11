import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button onClick={() => setValue((v) => v + 1)}>+</button>
                <button onClick={() => setVisible(false)}>hide</button>
                <PlanetInfo id={value} />
            </div>
        );
    } else {
        return <button onClick={() => setVisible(true)}>show</button>
    }
};

const usePlanetInfo = (id) => {
    const [planetName, setPlanetName] = useState("");

    useEffect(() => {
        let canceled = false;

        fetch(`https://swapi.co/api/planets/${id}`)
        .then(res => res.json())
        .then(data => { 
            console.log(data.name);
            if (!data.name || canceled)
                return;
            setPlanetName(data.name);
            return () => canceled = true;
        });
    }, [id]);

    return planetName;
};

const PlanetInfo = ({id}) => {
    const name = usePlanetInfo(id);

    if (!name)
        return null;

    return (
        <div>{id} - {name}</div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));