import React from 'react'
import CardSlider from './CardSlider';


const Slider = ({ movies }) => {
    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to);
    };
 
    return (
        <div>
            <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
            <CardSlider title="New Releases" data={getMoviesFromRange(11, 20)} />
            <CardSlider title="Blockbuster Movies" data={getMoviesFromRange(21, 30)} />
            <CardSlider title="Popular on Netflix" data={getMoviesFromRange(31, 40)} />
            <CardSlider title="Action Movies" data={getMoviesFromRange(41, 50)} />
            <CardSlider title="Epics" data={getMoviesFromRange(51, 60)} />
        </div>
    )
}

export default Slider