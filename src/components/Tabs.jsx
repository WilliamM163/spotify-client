// tabs.jsx
import React from "react";
import { primary_container } from "../App.module.css";
import { tabs, tab } from "./styles/Tabs.module.css";
import { Link } from "react-router-dom";

function Tabs() {
  return (
    <div className={`${primary_container} ${tabs}`}>
      <Link to="/">
        <img src="/icons/home.svg" title="Homepage" className={tab} />
      </Link>
      <Link to="/subscriptions">
        <img
          src="/icons/subscriptions.svg"
          title="Subscriptions"
          className={tab}
        />
      </Link>
    </div>
  );
}

export default Tabs;
