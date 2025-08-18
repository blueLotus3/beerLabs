import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Beer = () => {
  const [list, setList] = useState([]);
  const url = 'https://api.sampleapis.com/beers/ale';

  /* fetch data */
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((list) => {
        console.log(list);
        setList(list);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    const gridContainer = document.getElementById('maindiv');
    const scrollbarThumb = document.getElementById('scrollbarMain');

    if (!gridContainer || !scrollbarThumb) return;

    const handleScroll = () => {
      const scrollLeft = gridContainer.scrollLeft;
      const scrollWidth = gridContainer.scrollWidth;
      const clientWidth = gridContainer.clientWidth;
      const scrollPercentage =
        (scrollLeft / (scrollWidth - clientWidth)) * 100;

      if (scrollPercentage >= 75) {
        scrollbarThumb.style.left = '75%';
      } else if (scrollPercentage >= 50) {
        scrollbarThumb.style.left = '50%';
      } else if (scrollPercentage >= 25) {
        scrollbarThumb.style.left = '25%';
      } else {
        scrollbarThumb.style.left = '0%';
      }
    };

    gridContainer.addEventListener('scroll', handleScroll);

    return () => {
      gridContainer.removeEventListener('scroll', handleScroll);
    };
  }, [list]); // re-run when beers load

  return (
    <div className="beersList">
      {/* Scrollable row */}
      <div className="cardsDiv" id="maindiv">
        {list.map((beers) => (
          <Link key={beers.id} to={`/beers/${beers.id}`}>
            <div className="cardsBox">
              <div className="imgDiv">
                <img src={beers.image} alt="beer" />
              </div>
              <p className="titles">{beers.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Scrollbar */}
      <div className="scrollbarOut">
        <div className="scrollbarIn">
          <div className="scrollbarMain" id="scrollbarMain"></div>
        </div>
      </div>
    </div>
  );
};

export default Beer;