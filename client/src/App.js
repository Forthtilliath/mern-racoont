import React, { useEffect, useState } from 'react';
import Routes from './components/Routes/Routes';
import UidContext from './components/AppContext';
import axios from 'axios';
import { getUser } from './actions/user.actions';
import { useDispatch } from 'react-redux';

function App() {
    const [uid, setUid] = useState(null);
    const dispatch = useDispatch();

    const fetchToken = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/jwtid`, {
                withCredentials: true,
            })
            .then((res) => setUid(res.data))
            .catch((_err) => console.log('No token'));
    };

    useEffect(() => {
        fetchToken();

        if (uid) {
            dispatch(getUser(uid));
        }
    }, [uid, dispatch]);

    return (
        <UidContext.Provider value={uid}>
            <Routes />
        </UidContext.Provider>
    );
}

export default App;
