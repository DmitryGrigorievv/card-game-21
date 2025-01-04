export const getDeck = async () => {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching deck:', error);
    }
}