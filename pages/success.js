import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import {useStateContext} from '../context/StateContext';
import { runFireworks } from '../lib/utils';

// displays when a successful purchase is completed
const Success = () => {
    // get state data from context
    const {setCartItems, setTotalPrice, setTotalQuantities} = useStateContext();

    // clear the previous order data from context/state once a purchase is completed upon loading this page
    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        // call fireworks command from utils for animation
        runFireworks();
    }, []);

    return (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your purchase!</h2>
                <p className="email-msg">Check your email for the receipt.</p>
                <p className="description">
                    If you have any questions, please contact us at
                    <a className="email" href="mailto:support@fineheadphones.com">support@fineheadphones.com</a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success