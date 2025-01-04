export const getCard = async (drawId) => {
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${drawId}/draw/`, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching deck:', error);
    }
}