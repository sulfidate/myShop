export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {

            // Calculate Items price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

            // Calculate Shipping price (Free shipping if price > 100, else 10$ shipping
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);

            // Calculate Tax price (19% tax)
            state.taxPrice = addDecimals(Number((0.19 * state.itemsPrice).toFixed(2)));

            // Calculate Total price
            state.totalPrice = (
                Number(state.itemsPrice) + 
                Number(state.shippingPrice) + 
                Number(state.taxPrice)
                ).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));

            return state;
 
}