// Data Management for the entire website
import React, {createContext, useContext, useState, useEffect} from 'react';
// for popups
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    // to track if we are currently showing the cart or not
    const [showCart, setShowCart] = useState(false);
    // to track cart items currently in the cart including from local storage
    const [cartItems, setCartItems] = useState([]);
    // tracking total price of cart items
    const [totalPrice, setTotalPrice] = useState(0);
    // tracking total quantity of items
    const [totalQuantities, setTotalQuantities] = useState(0);
    // tracking quantity for individual items
    const [qty, setQty] = useState(1);
    // used to hold the cart product selected for quantity updates
    let foundProduct;
    let index;

    // handles adding products from their product page to the cart
    const onAdd = (product, quantity) => {
        // check if product adding is already in the cart using cartItems state
        const checkProductInCart = cartItems.find((prodItem) => prodItem._id === product._id);
        // if product already in cart then increase quantity and price using set states, else add item
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        if (checkProductInCart) {
            // after updating states, update actual items in the cart
            const updatedCartItems = cartItems.map((cartProduct) => {
                // set product in the cart that matches added product with new quantity calculated above
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            // set the cart items to update to the new updated cart items
            setCartItems(updatedCartItems);            
        }
        // if item doesnt exist in cart, add it and update totals
        else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    // function to remove an item from the shopping cart
    const onRemove = (product) => {
        // find product in our cart we need to update based on given id
        foundProduct = cartItems.find((item) => item._id === product._id);
        // create a copy of the cart items state without the current product being updated
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        // update total cart price/quantity by substracting removed items price/quanity
        setTotalPrice((prevTotalPrice) => prevTotalPrice-foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    // function to edit the quantity of a product in the cart
    const toggleCartItemQuantity = (id, value) => {
        // find product in our cart we need to update based on given id
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        // create a copy of the cart items state without the current product being updated
        const newCartItems = cartItems.filter((item) => item._id !== id);

        // check if incrementing or decrementing quantity
        if (value === 'inc') {
            // update the cart items state by adding the just removed product with a new copy with quantity updated
            //setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.//quantity + 1 }]);
            setCartItems(cartItems.map((item) => item._id === id ? { ...foundProduct, quantity: foundProduct.quantity + 1 } : item));
            // update the total price state with the found products price
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            // update the total cart quantity state by one since adding quantity
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
        } else if (value === 'dec') {
            // check if product can actually have quantity removed (qty>1) and subtract qty/price/totals instead
            if (foundProduct.quantity > 1) {
                //setCartItems([...newCartItems, { ...foundProduct, quantity: //foundProduct.quantity - 1 }]);
                setCartItems(cartItems.map((item) => item._id === id ? { ...foundProduct, quantity: foundProduct.quantity - 1 } : item));
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
            }           
        }
    }

    // functions to increase and decrease quantity of a product page item
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    return (
        // wrapping our website content in the context provider and passing values we are tracking site wide to allowe access to this data from any component
        <Context.Provider
        value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities}}>
            {children}
        </Context.Provider>
    )
}

// allows to use state in other components similar to a hook
export const useStateContext = () => useContext(Context);