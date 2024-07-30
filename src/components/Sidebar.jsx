import React from "react";

import { accent_container } from '../App.module.css';
import styles from './styles/Sidebar.module.css';


function Sidebar() {
    return <div className={`${accent_container} ${styles.sidebar}`}>Playing Next:</div>
}

export default Sidebar;