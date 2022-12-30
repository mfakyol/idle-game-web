import classes from "./style.module.scss";

function GameNavbar({setShowSidebar, selectedTab}) {
  return (
    <header className={classes.header}>
      <img className={classes.burgerIcon} src="icons/burger.svg" alt="" onClick={() => setShowSidebar(true)}/>
      <img className={classes.icon} src={selectedTab.icon} alt="" />
      <span className={classes.label}>{selectedTab.label}</span>
    </header>
  );
}

export default GameNavbar;
