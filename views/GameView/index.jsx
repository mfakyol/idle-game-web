import { useState } from "react";
import classes from "./style.module.scss";
import GameNavbar from "@components/GameNavbar";
import GameSidebar from "@components/GameSidebar";
import WoodCutting from "@components/WoodCutting";
import Work from "@components/Work";

const tabs = [
  { id: 0, label: "shop", icon: "icons/shop.svg" },
  { id: 1, label: "warehouse", icon: "icons/warehouse.svg" },
  { id: 2, label: "woodcutting", icon: "icons/woodcutting.svg" },
  { id: 3, label: "mining", icon: "icons/mining.svg" },
  { id: 4, label: "fishing", icon: "icons/fishing.svg" },
];

function GameView() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <>
        <div className={classes.game}>
      <GameSidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={classes.contentWrapper}>
        <GameNavbar setShowSidebar={setShowSidebar} selectedTab={selectedTab} />
        <main className={classes.content}>{selectedTab.id == 2 && <WoodCutting />}</main>
      </div>
    </div>
    <Work/>
    </>
  );
}

export default GameView;
