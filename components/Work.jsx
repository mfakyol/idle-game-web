import { addItems, setCurrentWork } from "@store/gameSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

function Work() {
  const tempWorkRef = useRef();

  const timeoutRef = useRef();
  const dispatch = useDispatch();
  const currentWork = useSelector((state) => state.game.currentWork);
  const work = useSelector((state) => state.game.works[currentWork?.id]);
  const works = useSelector((state) => state.game.works);
  const type = work?.types.find((type) => type.id == currentWork?.typeId);

  useEffect(() => {
    if (!currentWork || !work || !type) return;

    const duration = new Date(currentWork.startTime).getTime() + type.baseInterval - Date.now();
    timeoutRef.current = setTimeout(() => {
      const rewards = type.rewards
        .filter((reward) => reward.possibility >= Math.random())

        .reduce((acc, reward) => {
          if (!acc[reward.id]) acc[reward.id] = { id: reward.id, quantity: 0 };
          acc[reward.id].quantity += reward.quantity;
          return acc;
        }, {});
      dispatch(addItems(Object.values(rewards)));
      dispatch(setCurrentWork({ id: work.id, typeId: type.id, startTime: Date.now() }));
    }, duration + currentWork.delay);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [currentWork, type, work, dispatch]);

  useEffect(() => {
    const event = (e) => {
      if (document.visibilityState == "hidden" && currentWork) {
        tempWorkRef.current = JSON.parse(JSON.stringify(currentWork));
        dispatch(setCurrentWork(null));
      }
      if (document.visibilityState == "visible" && tempWorkRef.current) {
        const work = works[tempWorkRef.current.id];
        const type = work?.types.find((type) => type.id == tempWorkRef.current.typeId);

        const now = Date.now();
        const diff = now - tempWorkRef.current.startTime - tempWorkRef.current.delay;

        const count = Math.floor(diff / type.baseInterval);
        const delay = (diff % type.baseInterval) * -1;

        console.log(count, delay);

        if (count > 0) {
          const rewards = type.rewards
            .map((reward) => {
              return {
                id: reward.id,
                quantity:
                  Math.floor((reward.possibility * count) / 1) * reward.quantity + (reward.possibility % 1 >= Math.random() ? reward.quantity : 0),
              };
            })
            .reduce((acc, reward) => {
              if (!acc[reward.id]) acc[reward.id] = { id: reward.id, quantity: 0 };
              acc[reward.id].quantity += reward.quantity;
              return acc;
            }, {});

          dispatch(addItems(Object.values(rewards)));
        }

        dispatch(setCurrentWork({ ...tempWorkRef.current, startTime: Date.now(), delay }));
        tempWorkRef.current = undefined;
      }
    };

    document.addEventListener("visibilitychange", event);

    return () => {
      document.removeEventListener("visibilitychange", event);
    };
  }, [dispatch, currentWork, works]);

  return null;
}

export default Work;
