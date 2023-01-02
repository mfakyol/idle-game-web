import { useSelector } from "react-redux";
import classes from "./style.module.scss";
import { useEffect, useState } from "react";

function ProgressBar({ currentWork }) {
  const [key, setKey] = useState(0);
  const works = useSelector((state) => state.game.works);
  const work = works[currentWork?.id];
  const type = work?.types.find((type) => type.id == currentWork.typeId);
  const duration = new Date(currentWork?.startTime).getTime()  + type?.baseInterval - Date.now();

  useEffect(() => {
    if (work) setKey((prev) => prev + 1);
  }, [currentWork, work]);

  return (
    <div className={classes.progressBar}>
      {work && type && duration && (
        <div key={key} className={classes.bar} style={{ animationDuration: `${(duration)}ms`, animationDelay: `${currentWork?.delay}ms` }}></div>
      )}
    </div>
  );
}

export default ProgressBar;
