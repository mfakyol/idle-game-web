import works from "@constants/works";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  works,
  currentWork: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addItems: (state, action) => {
      const newItem = action.payload;
      const index = state.items.findIndex((item) => item.id == newItem.id);
      if (index > -1) state.items[index].quantity += newItem.quantity;
      else state.items.push(newItem);
    },

    setCurrentWork: (state, action) => {
      if (!action.payload) return (state.currentWork = null);
      else {
        const { workId, typeId, startTime = Date.now() } = action.payload;
        state.currentWork = { id: workId, type: { id: typeId }, startTime };
      }
    },
  },
});

export const { setCurrentWork } = gameSlice.actions;

export default gameSlice.reducer;
