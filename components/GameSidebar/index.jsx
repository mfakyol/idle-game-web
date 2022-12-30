import { useCallback } from "react";
import classes from "./style.module.scss";

function GameSidebar({ selectedTab, setSelectedTab, tabs, showSidebar, setShowSidebar }) {


  const handleOnClick = useCallback(
    (tab) => {
      setSelectedTab(tab);
      setShowSidebar(false)

    },
    [setSelectedTab, setShowSidebar],
  )
  

  return (
    <aside className={`${classes.sidebar} ${showSidebar ? classes.open : ""}`}>
      <div className={classes.head}>
        <img className={classes.closeIcon} src="icons/close.svg" alt="" onClick={() => setShowSidebar(false)} />
      </div>
      <ul className={classes.tabs}>
        {tabs.map((tab) => (
          <li key={tab.id} className={`${classes.tab} ${selectedTab.id == tab.id ? classes.active : ""}`} onClick={() => handleOnClick(tab)}>
            <img className={classes.icon} src={tab.icon} alt="" />
            <span className={classes.label}>{tab.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default GameSidebar;
