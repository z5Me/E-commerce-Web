import { createSlice } from "@reduxjs/toolkit";
import Product_Image from '@/assets/product2.svg';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        id: 'cartid1',
        products: [
            {
                id: 'd1',
                product: {
                    id: 'e1',
                    name: 'Gradient Graphic T-shirt'
                },
                variant: {
                    id: 'c1',
                    price: 200,
                    oldPrice: 250,
                    discountPercent: 20,
                    image: Product_Image,
                    values: [
                        {
                            id: 'b1',
                            name: 'Red',
                            slug: 'red',
                            type: 'Color',
                            value: '#FF0000'
                        },
                        {
                            id: 'b3',
                            name: 'Medium',
                            slug: 'medium',
                            type: 'Size',
                            value: 'medium'
                        },
                        {
                            id: 'b5',
                            name: '5kg',
                            slug: '5kg',
                            type: 'Weight',
                            value: '5kg'
                        }
                    ]
                },
                quantity: 1
            },
            {
                id: 'd2',
                product: {
                    id: 'e2',
                    name: 'Polo with Tipping Details'
                },
                variant: {
                    id: 'c4',
                    price: 350,
                    oldPrice: 400,
                    discountPercent: 5,
                    image: Product_Image,
                    values: [
                        {
                            id: 'b2',
                            name: 'Blue',
                            slug: 'blue',
                            type: 'Color',
                            value: '#0000FF'
                        },
                        {
                            id: 'b4',
                            name: 'Large',
                            slug: 'large',
                            type: 'Size',
                            value: 'large'
                        },
                        {
                            id: 'b6',
                            name: '10kg',
                            slug: '10kg',
                            type: 'Weight',
                            value: '10kg'
                        },
                    ]
                },
                quantity: 3
            }
        ],
        totalProducts: 400,
        discount: 10,
        total: 390
    },
    reducers: {
        addToCart(state, actions) {

        }
    },
    extraReducers: (builder) => {

    },
})

export const { } = cartSlice.actions;
export default cartSlice.reducer;