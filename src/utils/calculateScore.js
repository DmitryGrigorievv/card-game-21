export const calculateScore = (cards) => {
        let score = 0;
        let aces = 0;

        cards.forEach(card => {
            if (card.value === 'ACE') {
                score += 11;
                aces += 1;
            } else if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
                score += 10;
            } else {
                score += parseInt(card.value);
            }
        });

       
        while (score > 21 && aces > 0) {
            score -= 10;
            aces -= 1;
        }

        return score;
    };