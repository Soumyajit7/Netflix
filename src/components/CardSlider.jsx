import React, { useRef, useState } from 'react'
import Card from './Card'
import "../styles/cardslider.css"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';


const CardSlider = ({ data, title }) => {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();


  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <div className='flex column cardSlider_container'
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className='wrapper'>
        <div className={`slider-action left ${!showControls ? "none" : ""} flex j-center a-center`}>
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className='flex slider' ref={listRef}> 
          {
            data.map((movie, index) => {
              return <Card movieData={movie} index={index} key={movie.id} />
            })
          }
        </div>
        <div className={`slider-action right ${!showControls ? "none" : ""} flex j-center a-center`}>
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </div >
  )
}

export default CardSlider