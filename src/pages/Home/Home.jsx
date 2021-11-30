import React, { useState } from "react";
import styles from "./home.module.css";

import Navbar from "../../components/NavBar/Navbar";
import PlayerDeck from "../../components/PlayerDeck/PlayerDeck";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

const cardValues = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "V",
    "D",
    "R",
];
const cardSymbols = ["diamond", "heart", "club", "spade"];

const Home = () => {
    const [play, setPlay] = useState(false);
    const [globalDeck, setGlobalDeck] = useState([]);
    const [playerDeck, setPlayerDeck] = useState([]);

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
        shuffleGlobalDeck(tempGlobalDeck);
    };

    const shuffleGlobalDeck = (tempGlobalDeck) => {
        for (let i = tempGlobalDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempGlobalDeck[i], tempGlobalDeck[j]] = [
                tempGlobalDeck[j],
                tempGlobalDeck[i],
            ];
        }
        givePlayerCards(tempGlobalDeck);
    };

    const givePlayerCards = (tempGlobalDeck) => {
        const tempPlayerDeck = [];
        for (let i = 0; i < 4; i++) {
            tempPlayerDeck.push(tempGlobalDeck.shift());
        }
        setGlobalDeck(tempGlobalDeck);
        setPlayerDeck(tempPlayerDeck);
    };

    const handlePlay = () => {
        generateGlobalDeck();
        setPlay(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.board}>
                <Card symbol="club" value="8" />
                <Card symbol="spade" value="4" />
            </div>
            <div className={styles.player_container}>
                {play ? (
                    <PlayerDeck>
                        {playerDeck.map((card, key) => (
                            <Card key={key} symbol={card.symbol} value={card.value} />
                        ))}
                    </PlayerDeck>
                ) : (
                    <Button onClick={handlePlay}>Play</Button>
                )}
            </div>
            <Navbar />
        </div>
    );
};

export default Home;
