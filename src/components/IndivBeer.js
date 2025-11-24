import React, { useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from './Cart.js';

const IndivBeer = () => {
    const { id } = useParams();
    const [beer, setBeer] = useState(null);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
    const url = `https://api.sampleapis.com/beers/ale/${id}`;
        
    fetch(url)
    .then((response) => response.json())
    .then((beer) => {
        console.log(beer);
        setBeer(beer)
    })
    .catch((err) => {
        console.log(err.message)
    });
}, [id]);
if (!beer) {
    return <div>Loading...</div>
}

    return (
        <div className="IndivDiv">
            <div className="backButton">
            <button
            onClick={() => {
                window.history.back();
            }}
            >
                X</button>
            </div>
            <div className="imgDiv">
            <img src={beer.image || "https://res.cloudinary.com/ds7w3ysag/image/upload/v1755718610/bottle_prjaf2.jpg" }
                 alt={beer.name}
                 onError={(e) => {
                     e.target.onError = null;
                     e.target.src = "https://res.cloudinary.com/ds7w3ysag/image/upload/v1755718610/bottle_prjaf2.jpg";
                 }} 
                 />
                 </div>
            <p className="titles">{beer.name}</p>
            <p className="titles">{beer.price}</p>
            <button onClick={() => addToCart(beer)} className="AddButtn">Add to Cart</button>
        </div>
    )
}


export default IndivBeer