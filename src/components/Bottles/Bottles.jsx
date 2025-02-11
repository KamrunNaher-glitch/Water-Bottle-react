import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { getStoredCart } from "../../Utilities/localstorage";
const Bottles = () => {
    const [bottles,setBottles] = useState([]);
    const [cart,setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    },
        [])
    // local cart from local storage 
   
    useEffect(() => {
        console.log('called the useEffect', bottles.length)
        if (bottles.length) {
            const storedCart = getStoredCart();
            console.log(storedCart, bottles);
            const savedCart = [];
            for(const id of storedCart){
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if(bottle){
                    savedCart.push(bottle)
                }
            }

            console.log('saved cart', savedCart)
            setCart(savedCart);

        }
    }, [bottles])
    const handleAddToCart = bottle => {
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLS(bottle.id);
    }
    const handleRemoveFromCart = id => {
        // visual cart remove
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        // remove from LS 
        removeFromLS(id);
    }
     return (
        <div>
            <h4>Cart:{cart.length}</h4>
            <h2>Bottles Available :{bottles.length}</h2>
           <div className="bottle-container">
           {
              bottles.map(bottle => <Bottle key={bottle.id} bottle={bottle}
             handleAddToCart ={handleAddToCart} ></Bottle>)  
                
            }
           </div>

        </div>
    );
};

export default Bottles;


