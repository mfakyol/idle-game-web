import { setCurrentWork } from "@store/gameSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function Work() {
  const timeoutRef = useRef();
  const dispatch = useDispatch();
  const currentWork = useSelector((state) => state.game.currentWork);
  const work = useSelector((state) => state.game.works[currentWork?.id]);
  const type = work?.types.find((type) => type.id == currentWork?.type.id);

  useEffect(() => {
    if (!currentWork || !work || !type) return;
    const delay = new Date(currentWork.startTime).getTime() + type.baseInterval - Date.now();

    timeoutRef.current = setTimeout(() => {
      const rewards = type.rewards.filter((reward) => reward.possibility >= Math.random());
      //will add rewars to warehouse
      dispatch(setCurrentWork({ workId: work.id, typeId: type.id, startTime: Date.now() }));
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [currentWork, type, work, dispatch]);

  return null;
}

export default Work;
