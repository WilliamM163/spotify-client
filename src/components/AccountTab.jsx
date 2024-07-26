import React from "react";

// Importing Styles
import { primary_container } from '../App.module.css';
import { account_tab, tab } from './styles/Tabs.module.css';

function AccountTab() {
    return (
        <div className={`${primary_container} ${account_tab}`}>
            <img 
                src='/icons/account.svg'
                className={tab}
            />
        </div>
    );
}

export default AccountTab;