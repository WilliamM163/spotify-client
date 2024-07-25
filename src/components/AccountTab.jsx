import React from "react";

// Importing Styles
import { primary_container } from '../App.module.css';
import { account_tab } from './styles/AccountTab.module.css';
import { tab } from './styles/Tab.module.css';

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