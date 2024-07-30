import React from "react";
import { Link } from 'react-router-dom';

// Importing Styles
import { primary_container } from '../App.module.css';
import { account_tab, tab } from './styles/Tabs.module.css';

function AccountTab() {
    return (
        <div className={`${primary_container} ${account_tab}`}>
            <Link to='/account'>
                <img
                    src='/icons/account.svg'
                    className={tab}
                />
            </Link>
        </div>
    );
}

export default AccountTab;