import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];


const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers: {
        addToCart(state, action){
            state.push(action.payload);
        },

        removeFromCart(state, action){
            return state.filter((item) => item.id != action.payload.id);
        },
        clearCart() {
            return [];  // <-- Clears the cart
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;