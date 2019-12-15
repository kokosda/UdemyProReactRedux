import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, setValue] = useState(1);
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

const getPlanet = (id) => {
    return fetch(`https://swapi.co/api/planets/${id}`)
            .then(res => res.json())
            .then(data => data);
};

const useRequest = (request) => {
    const initialState = useMemo(() => ({
        data: null,
        loading: true,
        error: null
    }), []);

    const [dataState, setDataState] = useState(initialState);

    useEffect(() => {
        setDataState(initialState);
        let canceled = false;

        request()
        .then(data => { 
            if (!canceled) {
                setDataState({
                    data: data,
                    loading: false,
                    error: null
                });
            }
            return () => canceled = true;
        })
        .catch(error => !canceled && setDataState({
            data: null,
            loading: false,
            error: error
        }));
    }, [ request ]);

    return dataState;
}

const usePlanetInfo = (id) => {
    const request = useCallback(() => getPlanet(id), [ id ]);
    return useRequest(request);
};

const PlanetInfo = ({id}) => {
    const { data, loading, error } = usePlanetInfo(id);

    if (error) {
        return <div>Something is wrong</div>;
    }

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div>{id} - {data.name}</div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));