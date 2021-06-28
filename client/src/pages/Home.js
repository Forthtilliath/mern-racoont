import React from 'react';
import LeftNav from '../components/LeftNav';
import Thread from '../components/Thread';

// TODO https://codepen.io/forthtilliath/pen/poPoEKR
const Home = () => {
    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <Thread />
            </div>
        </div>
    );
};

export default Home;
