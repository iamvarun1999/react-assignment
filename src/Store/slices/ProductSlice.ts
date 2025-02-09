import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../Modals/Modals";
import axios from "axios";



let initialState: InitialState = {
    loading: false,
    products: [],
    cart: []
}

export const getAllProducts = createAsyncThunk(
    "getAllProductsAPI",
    async () => {
        let res = await axios.get('https://fakestoreapi.com/products')
        return res.data
    }
)



const ProductSlice = createSlice({
    name: 'ProductSlice',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let findData = state.products.find(res => res.id === action.payload)
            if (findData?.id) {
                state.cart = [...state.cart, { ...findData, cartCount: 1 }]
            }
        },
        removeFromCart: (state, action) => {
            let filterCart = state.cart?.filter(res => res.id !== action.payload)
            state.cart = filterCart
        },
        addProductCount: (state, action) => {
            let index = state?.cart?.findIndex(res => res.id === action.payload)
            if (index !== -1) {
                let arr = [...state.cart]
                arr[index].cartCount = arr[index]?.cartCount + 1
                state.cart = arr
            }
        },
        subProductCount: (state, action) => {
            let index = state?.cart?.findIndex(res => res.id === action.payload)
            if (index !== -1) {
                let arr = [...state.cart]
                if (arr[index].cartCount > 1) {
                    arr[index].cartCount = arr[index]?.cartCount - 1
                    state.cart = arr
                } else {
                    let filterCart = state.cart?.filter(res => res.id !== action.payload)
                    state.cart = filterCart
                }
            }
        },
        loaderStart: (state) => {
            state.loading = true
        },
        loaderStop: (state) => {
            state.loading = false
        },
        addNewProduct: (state, action) => {
            state.products = [action.payload, ...state.products]
        },
        updateProduct: (state, action) => {
            let newData = state.products.map(res => {
                if (res.id === action.payload.id) {
                    return action.payload
                } else {
                    return res
                }
            })
            state.products = newData
        },
        deleteProductById: (state, action) => {
            state.products = state.products.filter(res => res.id !== action.payload)
            state.cart = state.cart.filter(res => res.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false;
            })
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProducts.rejected, (state) => {
                state.loading = false;
            });
    }
})
export const { addToCart,deleteProductById, updateProduct, removeFromCart, loaderStart, loaderStop, addProductCount, subProductCount, addNewProduct } = ProductSlice.actions
export default ProductSlice;