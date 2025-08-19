import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Beer = () => {
  const [list, setList] = useState([]);
  const url = 'https://api.sampleapis.com/beers/ale';

  // Fetch data
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((list) => {
        setList(list);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    const container = document.getElementById('maindiv');
    const scrollbarThumb = document.getElementById('scrollbarMain');

    if (!container || !scrollbarThumb) return;

    // --- Update thumb on container scroll ---
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const thumbLeft = (scrollLeft / scrollWidth) * 100;
      scrollbarThumb.style.left = thumbLeft + '%';
    };

    container.addEventListener('scroll', handleScroll);

    // --- Drag-to-scroll logic ---
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX;
      startScrollLeft = container.scrollLeft;
      document.body.style.userSelect = 'none'; // prevent text selection
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.pageX - startX;
      const containerWidth = container.scrollWidth - container.clientWidth;
      const trackWidth =
        scrollbarThumb.parentElement.clientWidth - scrollbarThumb.clientWidth;
      // Move scroll proportional to thumb movement
      container.scrollLeft = startScrollLeft + dx * (containerWidth / trackWidth);
    };

    const onMouseUp = () => {
      isDragging = false;
      document.body.style.userSelect = 'auto';
    };

    scrollbarThumb.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch events
    scrollbarThumb.addEventListener('touchstart', (e) =>
      onMouseDown(e.touches[0])
    );
    window.addEventListener('touchmove', (e) => onMouseMove(e.touches[0]));
    window.addEventListener('touchend', onMouseUp);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      scrollbarThumb.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [list]);

  return (
    <div className="beersList">
      {/* Scrollable row */}
      <div className="cardsDiv" id="maindiv">
        {list.map((beers) => (
          <Link key={beers.id} to={`/beers/${beers.id}`}>
            <div className="cardsBox">
              <div className="imgDiv">
                  {beers.image ? (
                <img src={beers.image} alt={beers.name} />
                ): null }
              </div>
              <p className="titles">{beers.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Custom interactive scrollbar */}
      <div className="scrollbarOut">
        <div className="scrollbarIn">
          <div className="scrollbarMain" id="scrollbarMain"></div>
        </div>
      </div>
    </div>
  );
};

export default Beer;