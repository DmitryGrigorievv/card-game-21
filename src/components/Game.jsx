import React, { useEffect, useState } from 'react';
import { calculateScore } from '../utils/calculateScore'
import { getDeck } from '../fetchers/getDeck';
import { getCard } from '../fetchers/getCard';

export default function Game() {
    const [deckId, setDeckId] = useState(null);
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);


    const drawCards = async (count) => {
        if (!deckId) return []
        const responses = await Promise.all(Array.from({ length: count }, () => getCard(deckId)));
        return responses.filter(response => response.success).flatMap(response => response.cards);
    };

    const startGame = async () => {
        const deck = await getDeck();
        setDeckId(deck.deck_id);
        setPlayerCards([]);
        setDealerCards([]);
        setPlayerScore(0);
        setDealerScore(0);
        setGameOver(false);

        // Получаем начальные карты для игрока и дилера
        const initialCards = await drawCards(4); // Запрашиваем 4 карты
        // if (initialCards.length >= 4) {
        //     setPlayerCards(initialCards.slice(0, 2)); // Первые две карты игрока
        //     setDealerCards(initialCards.slice(2, 4)); // Первые две карты дилера
        //     setPlayerScore(calculateScore(initialCards.slice(0, 2)));
        //     setDealerScore(calculateScore(initialCards.slice(2, 4)));
        // }
    };

    const handleHit = async () => {
        const newCard = (await drawCards(1))[0];
        if (newCard) {
            setPlayerCards(prevCards => {
                const updatedCards = [...prevCards, newCard];
                const newScore = calculateScore(updatedCards);
                setPlayerScore(newScore);
                return updatedCards;
            });
        }
    };

    const handleStand = async () => {
        let newDealerScore = dealerScore;
        let newDealerCards = [...dealerCards];

        // Покажем все карты дилера и добавим карты, пока не наберется 17 или больше
        while (newDealerScore < 17) {
            const newCard = (await drawCards(1))[0]; // Возвращаем одну карту
            if (newCard) {
                newDealerCards.push(newCard);
                newDealerScore = calculateScore(newDealerCards);
            }
        }

        setDealerCards(newDealerCards);
        setDealerScore(newDealerScore);
        setGameOver(true);

        // Определяем победителя
        if (playerScore > 21) {
            alert('Перебор!');
        }
        if (newDealerScore > 21 || (playerScore > newDealerScore && playerScore <= 21)) {
            alert('Игрок выигрывает!');
        } else if (playerScore < newDealerScore) {
            alert('Дилер выигрывает!');
        } else if (playerScore === newDealerScore) {
            alert('Ничья!');
        }
    };

    useEffect(() => {
        startGame();
    }, []);

    return (
        <div>
            <h1>Игра 21</h1>
            <div>
                <h2>Карты игрока:</h2>
                {playerCards.map((card, index) => (
                    <div key={index}>
                        <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                    </div>
                ))}
                <p>Очки игрока: {playerScore}</p>
            </div>
            <div>
                <h2>Карты дилера:</h2>
                {dealerCards.map((card, index) => (
                    <div key={index}>
                        <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                    </div>
                ))}
                <p>Очки дилера: {dealerScore}</p>
            </div>
            <div>
                {!gameOver ? (
                    <>
                        <button onClick={handleHit}>Взять еще</button>
                        <button onClick={handleStand}>Хватит</button>
                    </>
                ) : (
                    <button onClick={startGame}>Новая игра</button>
                )}
                {gameOver && <p>Игра окончена!</p>}
            </div>
        </div>
    );
}