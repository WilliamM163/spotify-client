import React from "react";

// Importing Styles
import { primary_container } from '../App.module.css';
import { player } from './styles/Player.module.css';

function Player() {
    return (
    <div className={`${primary_container} ${player}`}>
        Player:
    </div>
    );
}

export default Player;