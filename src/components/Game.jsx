import React, { useEffect, useState } from 'react';
import { calculateScore } from '../utils/calculateScore'
import { getDeck } from '../fetchers/getDeck';
import { getCard } from '../fetchers/getCard';
import PlayerHand from './PlayerHand';
import DealerHand from './DealerHand';
import GameControls from './GameControls';

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


        while (newDealerScore < 17) {
            const newCard = (await drawCards(1))[0];
            if (newCard) {
                newDealerCards.push(newCard);
                newDealerScore = calculateScore(newDealerCards);
            }
        }

        setDealerCards(newDealerCards);
        setDealerScore(newDealerScore);
        setGameOver(true);


        if (playerScore > 21) {
            alert('Перебор! Вы проиграли');
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
            <PlayerHand cards={playerCards} score={playerScore} />
            <DealerHand cards={dealerCards} score={dealerScore} />
            <GameControls
                gameOver={gameOver}
                onHit={handleHit}
                onStand={handleStand}
                onNewGame={startGame}
            />
        </div>
    );
}
