import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'


const IndivBeer = () => {
    const { id } = useParams();
    const [beer, setBeer] = useState(null);

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
            <Link to={`/`}>X</Link>
            </div>
            <img src={beer.image} alt="beer product"></img>
            <p>{beer.name}</p>
        </div>
    )
}


export default IndivBeer