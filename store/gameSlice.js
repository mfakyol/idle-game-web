import works from "@constants/works";
import { createSlice } from "@reduxjs/toolkit";
import { dispatchEvent } from "@lib/event";
import { decode, encode } from "@lib/Base64";
import localStorageService from "@lib/localStorageService";

const localItems = localStorageService.get("items");

let initialItems = [];
if (localItems) {
  const parsedItems = JSON.parse(decode(localItems)) || [];
  initialItems = parsedItems;
}

const initialState = {
  items: initialItems,
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
      const items = action.payload;

      items.forEach(({ id, quantity }) => {
        const index = state.items.findIndex((item) => item.id == id);
        if (index > -1) state.items[index].quantity += quantity;
        else state.items.push({ id, quantity });
        dispatchEvent("toast:push", {
          toast: { type: "newItem", itemId: id, quantity, total: state.items[index != -1 ? index : state.items.length - 1].quantity },
        });

        localStorageService.set("items", encode(JSON.stringify(state.items)));
      });
    },

    setCurrentWork: (state, action) => {
      console.log(action.payload)
      if (!action.payload) state.currentWork = null;
      else {
        const { id, typeId, startTime = Date.now(), delay = 0 } = action.payload;
        state.currentWork = { id, typeId , startTime, delay };
      }
    },
  },
});

export const { setCurrentWork, addItems } = gameSlice.actions;

export default gameSlice.reducer;
