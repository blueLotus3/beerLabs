import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Beer = () => {
    const [list, setList] = useState([]);

    const url = 'https://api.sampleapis.com/beers/ale';

        /* useEffect that fetches url to render api data*/
        useEffect(() => {
            fetch(url)
            .then((response) => response.json())
            .then((list) => {
                console.log(list);
                setList(list)
            })
            .catch((err) => {
                console.log(err.message)
            });
        }, []);

    return (
    <div className="beersList">
       <ul>
        {list.map((beers) => (
        <Link key={beers.id} to={`/beers/${beers.id}`}>
        <li>
        <img src={beers.image} alt="beer"></img>
            <p>{beers.name}</p>
        </li>
        </Link>
        ))}
       </ul>
    </div>
    )
}

export default Beer