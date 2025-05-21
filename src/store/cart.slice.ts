import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const CART_PERSISTENT_STATE = "cartData";

export interface IcartPersistentState {
  items: ICartItem[],
}

export interface ICartItem {
  id: number;
  count: number;
}

export interface ICartState {
  items: ICartItem[],
  discount?: number
}

const initialState: ICartState = loadState<IcartPersistentState>(CART_PERSISTENT_STATE) ?? {
  items: []
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find(item => item.id === action.payload);
      if(!existed) {
        state.items.push({id: action.payload, count: 1})
        return;
      }
      state.items.map(item => {
        if(item.id === action.payload) {
          item.count += 1;
        }
        return item;
      })
    },
    decrease: (state, action: PayloadAction<number>) => {
      const existed = state.items.find(item => item.id === action.payload);
      if(!existed) {
        return;
      }
      if(existed.count === 1) {
        state.items = state.items.filter(item => item.id !== action.payload);
      } else {
        state.items.map(item => {
          if(item.id === action.payload) {
            item.count -= 1;
          }
          return item;
        })
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      return;
    },
    clean: (state) => {
      state.items = [];
    },
    addDiscount: (state, action: PayloadAction<string | undefined>) => {
      if(!action.payload?.trim()){
        return;
      }
      state.discount = Math.floor(Math.random() * 50) + 1;
    }
  }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;