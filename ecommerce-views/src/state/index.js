import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
    totalItems: 0,
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setTotalItems: (state, action) => {
            state.totalItems = action.payload;
        },
        updateItem: (state, action) => {
            state.items.map((item) => {
                if(item.id === action.payload.id) {
                    item.image = action.payload.image;
                }
                return item;
            });
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addToCart: (state, action) => {
            state.cart = [... state.cart, action.payload.item]
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item)=> item.id !== action.payload.id)
        },
        increaseCount: (state, action) => {
            state.cart.map((item) => {
                if(item.id === action.payload.id) {
                    item.count ++;
                }
                return item;
            })
        },
        decreaseCount: (state, action) => {
            state.cart.map((item) => {
                if(item.id === action.payload.id && item.count > 1) {
                    item.count --;
                }
                return item;
            })
        },
        setIsCartOpen: (state, action) => {
            state.isCartOpen = !state.isCartOpen;  
        }
    }
})


export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
    setTotalItems,
    updateItem
} = cartSlice.actions;

export default cartSlice.reducer;