const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "V", "D", "R"];
const cardSymbols = ["diamond", "heart", "club", "spade"];

const generateGlobalDeck = () => {
    const tempGlobalDeck = [];

    for (let i = 0; i < cardSymbols.length; i++) {
        for (let j = 0; j < cardValues.length; j++) {
            tempGlobalDeck.push({
                value: cardValues[j],
                symbol: cardSymbols[i],
            });
        }
    }
    return tempGlobalDeck;
};

const shuffleGlobalDeck = (tempGlobalDeck) => {
    for (let i = tempGlobalDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempGlobalDeck[i], tempGlobalDeck[j]] = [
            tempGlobalDeck[j],
            tempGlobalDeck[i],
        ];
    }
    return tempGlobalDeck;
};

export { generateGlobalDeck, shuffleGlobalDeck }