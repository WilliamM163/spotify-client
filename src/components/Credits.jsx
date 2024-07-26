import React from "react";

// Importing Styles
import { primary_container } from '../App.module.css';
import { credits } from './styles/Credits.module.css';

function Credits() {
    return (
        <div className={`${primary_container} ${credits}`}>
            <div>
                <strong>Credits:</strong>
                <ul>
                    <li>Ayush</li>
                    <li>Christina</li>
                    <li>Shikhia</li>
                    <li>William</li>
                </ul>
            </div>
            <div>
                <strong>Github:</strong>
                <a href="https://github.com/WilliamM163/spotify-client">https://github.com/WilliamM163/spotify-client</a>
            </div>
        </div>
    )
}

export default Credits;