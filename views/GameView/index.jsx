import { useState } from "react";
import classes from "./style.module.scss";
import GameNavbar from "@components/GameNavbar";
import GameSidebar from "@components/GameSidebar";

const tabs = [
  {id: 0, label: "shop"},
  {id: 1, label: "warehouse"}, 
  {id: 2, label: "woodworking"},
]


function GameView() {

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className={classes.game}>
      <GameSidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs}/>
      <div className={classes.contentWrapper}>
        <GameNavbar />
        <main className={classes.content}></main>
      </div>
    </div>
  );
}

export default GameView;
