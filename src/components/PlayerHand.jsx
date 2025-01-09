import React from 'react';
import Card from './Сard';
import './Card.css';

const PlayerHand = ({ cards, score }) => {
    return (
        <div>
            <h2>Карты игрока:</h2>
            <div className="card-container">
                {cards.map((card, index) => (
                    <Card key={index} card={card} />
                ))}
            </div>
            <p>Очки игрока: {score}</p>
        </div>
    );
};

export default PlayerHand