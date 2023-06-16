import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

type InintialState = {
  items: Product[];
};

const initialState: InintialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Cant remove product (id: ${action.payload.id}) as its not in the basket`);
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectTotal = (state: RootState) => state.basket.items.reduce((total, item) => total + item.price, 0);
export const selectItems = (state: RootState) => state.basket.items;

export default basketSlice.reducer;
