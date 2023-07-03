import React from 'react';
import avatar from '../assets/artist2.jpg';
import './TopBar.css';

export default function TopBar() {

    return (

        <div className="top-bar">
            <input className="search" type="search" placeholder="Search..." />
            <img src={avatar} className="profile-picture" alt="Owner's Photo" />
        </div>

    );
};




