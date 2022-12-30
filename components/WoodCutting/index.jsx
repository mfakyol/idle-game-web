import classes from "./style.module.scss";
import ProgressBar from "@components/ProgressBar";
import { setCurrentWork } from "@store/gameSlice";
import { useDispatch, useSelector } from "react-redux";

function WoodCutting() {
  const dispatch = useDispatch();
  const work = useSelector((state) => state.game.works.woodCutting);
  const currentWork = useSelector((state) => state.game.currentWork);

  const convertMSToSecond = (ms) => {
    const second = ms / 1000;
    return second % 1 ? (ms % 100 ? second.toFixed(2) : second.toFixed(1)) : second;
  };

  const handleOnClick = (workId, typeId) => {
    if (currentWork?.id == workId && currentWork?.type?.id == typeId) return;
    dispatch(setCurrentWork({ workId, typeId }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.workInfo}>
        <div className={classes.workInfoRow}>
          <div className={classes.levelInfo}>
            <span className={classes.levelText}>Seviye</span>
            <span className={classes.levelValue}>{`${work.currentLevel} / ${work.maxLevel}`}</span>
          </div>
        </div>
        <div className={classes.workInfoRow}>
          <ProgressBar />
        </div>
      </div>

      <div className={classes.progressWrapper}></div>

      <ul className={classes.list}>
        {work.types.map((type) => (
          <li
            className={`${classes.item} ${currentWork?.id == work.id && currentWork?.type?.id == type?.id ? classes.active : ""}`}
            key={type.id}
            onClick={() => handleOnClick(work.id, type.id)}
          >
            <span className={`${classes.badge} ${classes.active}`}>
              {currentWork?.id == work.id && currentWork?.type?.id == type?.id ? "cutting" : "cut"}
            </span>
            <span className={classes.label}>{type.label}</span>
            <span className={classes.info}>{`${type.baseXp} xp / ${convertMSToSecond(type.baseInterval)} second`}</span>
            <img className={classes.icon} src={type.icon} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WoodCutting;
