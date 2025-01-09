import React from 'react';
import Card from './Сard';
import './Card.css';

const DealerHand = ({ cards, score }) => {
    return (
        <div>
            <h2>Карты дилера:</h2>
            <div className="card-container">
                {cards.map((card, index) => (
                    <Card key={index} card={card} />
                ))}
            </div>
            <p>Очки дилера: {score}</p>
        </div>
    );
};

export default DealerHand;