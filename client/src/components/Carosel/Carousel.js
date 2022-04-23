import React, { useEffect, useState } from 'react'
import { content } from './carouselData';
import './carousel.css';

function Carousel() {

    const [iterator, setIterator] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setIterator(prev => prev + 1);
        }, 3000); 
    }, []);

    useEffect(() => {
        iterator === content.length && setIterator(0);
    }, [iterator]);

    return (
        <div className="carousel__container">
            <img className="carousel__images" src={content[iterator]} />
        </div>
    )
}

export default Carousel
