import classes from "./style.module.scss";

function GameSidebar({ selectedTab, setSelectedTab, tabs }) {
  return (
    <aside className={classes.sidebar}>
      <ul className={classes.tabs}>
        {tabs.map((tab) => (
          <li key={tab.id} className={`${classes.tab} ${ selectedTab.id == tab.id ?  classes.active : ""}`} onClick={() => setSelectedTab(tab)}>{tab.label}</li>
        ))}
      </ul>
    </aside>
  );
}

export default GameSidebar;
