import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICartItem {
  id: number;
  count: number;
}

export interface ICartState {
  items: ICartItem[]
}

const initialState: ICartState = {
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
    }
  }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;