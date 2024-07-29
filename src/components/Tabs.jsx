import React from "react";
import { Link } from "react-router-dom";
import { primary_container } from "../App.module.css";
import { tabs } from "./styles/Tabs.module.css";
import { tab } from "./styles/Tab.module.css";

function Tabs() {
  return (
    <div className={`${primary_container} ${tabs}`}>
      <Link to="/">
        <img src="/icons/home.svg" title="Homepage" className={tab} />
      </Link>
      <Link to="/music-library">
        <img
          src="/icons/music_library.svg"
          title="Music Library"
          className={tab}
        />
      </Link>
      <Link to="/account">
        <img src="/icons/account.svg" title="Account" className={tab} />
      </Link>
    </div>
  );
}

export default Tabs;
