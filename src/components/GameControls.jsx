import React, { useEffect, useRef } from 'react';
import './GameControls.css';
import soundFile from '../assets/deck-sound.mp3';
import image from '../assets/backimg.png'

const GameControls = ({ gameOver, onHit, onStand, onNewGame }) => {
    const audioRef = useRef(new Audio(soundFile)); 

    const playSound = () => {
        audioRef.current.currentTime = 0; 
        audioRef.current.play(); 
    };

    const handleHit = () => {
        playSound(); 
        onHit(); 
    };

    const handleNewGame = () => {
        playSound(); 
        onNewGame(); 
    };

    return (
        <div className="game-controls">
            <div className="image-container">
                <img src={image} alt="Описание изображения" />
            </div>
            {!gameOver ? (
                <>
                    <button className="button" onClick={handleHit}>Взять еще</button>
                    <button className="button" onClick={onStand}>Хватит</button>
                </>
            ) : (
                <button className="button" onClick={handleNewGame}>Новая игра</button>
            )}
            {gameOver && <p>Игра окончена!</p>}
        </div>
    );
};

export default GameControls;