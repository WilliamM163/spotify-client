import React from 'react';

import { primary_container } from '../App.module.css';
import { tabs } from './styles/Tabs.module.css';
import { tab } from './styles/Tab.module.css';

function Tabs() {
    return (
    <div className={`${primary_container} ${tabs}`}>
        <img
            src='/icons/home.svg'
            title='Homepage'
            className={tab}
        />
        <img
            src='/icons/music_library.svg'
            title='Music Library'
            className={tab}
        />
    </div>
    );
}

export default Tabs;