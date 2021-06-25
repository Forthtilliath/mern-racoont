import React, { useEffect, useState } from 'react';
import Routes from './components/Routes/Routes';
import UidContext from './components/AppContext';
import axios from 'axios';

function App() {
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            await axios.get(`${process.env.REACT_APP_API_URL}/jwtid`, {
              withCredentials: true,
              timeout:0
            })
                .then((res) => setUid(res.data))
                .catch((err) => console.log('No token', err));
        };
        fetchToken();
    }, []);

    return (
        <UidContext.Provider value={uid}>
            <Routes />
        </UidContext.Provider>
    );
}

export default App;
