export const calculateCartTotals =(cartItems, quantities) =>{

    const subtotal = cartItems.reduce((acc, food) => acc + food.price * quantities[food.id], 0);

    const shipping = subtotal === 0? 0.00:10;
    const tax = subtotal *0.1;
    const grandTotal = subtotal + shipping + tax;
    const totalItems = cartItems.reduce((acc, food) => acc + quantities[food.id], 0);

    return {subtotal,shipping,tax,grandTotal,totalItems}
}   
    