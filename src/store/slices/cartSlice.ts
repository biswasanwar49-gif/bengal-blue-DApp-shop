import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProductItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: ProductItem[];
  wishlist: string[];
}

const initialState: CartState = {
  items: [],
  wishlist: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductItem>) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    toggleWishlist(state, action: PayloadAction<string>) {
      if (state.wishlist.includes(action.payload)) {
        state.wishlist = state.wishlist.filter((id) => id !== action.payload);
      } else {
        state.wishlist.push(action.payload);
      }
    },
  },
});

export const { addToCart, updateQuantity, toggleWishlist } = cartSlice.actions;
export default cartSlice.reducer;
