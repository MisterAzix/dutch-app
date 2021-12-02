import React, { useState, useCallback, useEffect } from "react";
import styles from "./home.module.css";

import { generateGlobalDeck, shuffleGlobalDeck } from "../../libs/deckGenerator";
import { handleUpdateItem, handleRemoveItem } from "../../libs/helpers";

import Navbar from "../../components/NavBar/Navbar";
import PlayerDeck from "../../components/PlayerDeck/PlayerDeck";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Rules from "../../components/RulesButton/Rules";
import Modal from "../../components/Modal/Modal";

const Home = () => {
    const [play, setPlay] = useState(false);
    const [end, setEnd] = useState(false);
    const [globalDeck, setGlobalDeck] = useState([]);
    const [playerDeck, setPlayerDeck] = useState([]);
    const [cardPit, setCardPit] = useState([]);
    const [cardPicked, setCardPicked] = useState("");
    const [activePlayerCard, setActivePlayerCard] = useState(false);
    const [modal, setModal] = useState("");
    /* const [round, setRound] = useState(0); */

    useEffect(() => {
        if (!play) {
            setGlobalDeck([]);
            setCardPit([]);
            setActivePlayerCard(true);
        }
    }, [play]);

    const handlePlay = () => {
        let tempGlobalDeck = generateGlobalDeck();
        let tempShuffledDeck = shuffleGlobalDeck(tempGlobalDeck);
        givePlayerCards(tempShuffledDeck);
        setPlay(true);
    };

    const givePlayerCards = (tempGlobalDeck) => {
        const tempPlayerDeck = [];
        for (let i = 0; i < 4; i++) {
            tempPlayerDeck.push(tempGlobalDeck.shift());
        }
        setGlobalDeck(tempGlobalDeck);
        setPlayerDeck(tempPlayerDeck);
    };

    const handleDutch = () => {
        if (!play) return setModal("The game has not started!");
        setActivePlayerCard(true);
        let score = playerDeck
            .map(({ value, symbol }) => {
                switch (value) {
                    case "A":
                        return 1;
                    case "V":
                        return 10;
                    case "D":
                        return 10;
                    case "R":
                        if (symbol === "diamond" || symbol === "heart") return 0;
                        return 13;
                    default:
                        return parseInt(value);
                }
            })
            .reduce((prev, curr) => prev + curr);
        setModal(`You finish the game with ${score} points!`);
        setEnd(true);
    };

    const handlePick = () => {
        if (!play) return setModal("The game has not started!");
        if (cardPicked) return;
        if (globalDeck.length <= 0) return setModal("Deck is empty!");
        setCardPicked("globalDeck");
    };

    const handleDeposit = useCallback(() => {
        if (!play) return setModal("The game has not started!");
        if (cardPicked !== "globalDeck" && cardPit.length <= 0) return setModal("Pit is empty!");
        if (cardPicked === "pitDeck") return;
        if (!cardPicked) return setCardPicked("pitDeck");
        // if (!cardPicked) return setModal("Please picked up a card in deck before deposit!");
        setCardPit([...cardPit, { value: globalDeck[0].value, symbol: globalDeck[0].symbol }]);
        handleRemoveItem(0, globalDeck, setGlobalDeck);
        setCardPicked("");
    }, [play, cardPicked, cardPit, globalDeck]);

    const handleSwitch = useCallback(
        (e) => {
            switch (cardPicked) {
                case "globalDeck":
                    handleUpdateItem(
                        e.target.id,
                        {
                            value: globalDeck[0].value,
                            symbol: globalDeck[0].symbol,
                        },
                        playerDeck,
                        setPlayerDeck
                    );
                    handleRemoveItem(0, globalDeck, setGlobalDeck);
                    setCardPit([
                        ...cardPit,
                        {
                            value: playerDeck[e.target.id].value,
                            symbol: playerDeck[e.target.id].symbol,
                        },
                    ]);
                    break;
                case "pitDeck":
                    // const tempCardPit = [...cardPit];
                    // const tempPlayerDeck = [...playerDeck];
                    handleUpdateItem(
                        e.target.id,
                        {
                            value: cardPit[cardPit.length - 1].value,
                            symbol: cardPit[cardPit.length - 1].symbol,
                        },
                        playerDeck,
                        setPlayerDeck
                    );
                    handleUpdateItem(
                        cardPit.length - 1,
                        {
                            value: playerDeck[e.target.id].value,
                            symbol: playerDeck[e.target.id].symbol,
                        },
                        cardPit,
                        setCardPit
                    );
                    break;
                default:
                    return setModal("Please picked up a card in deck before switch!");
            }
            setCardPicked("");
        },
        [cardPicked, cardPit, globalDeck, playerDeck]
    );

    const handleModal = () => {
        if (end) setPlay(false);
        setModal("");
    };

    return (
        <div className={styles.container}>
            <Rules className={styles.rules} />
            {modal && <Modal onClick={handleModal}>{modal}</Modal>}
            <div className={styles.board}>
                {globalDeck.length > 0 ? (
                    <Card
                        onClick={handlePick}
                        symbol={globalDeck[0]?.symbol}
                        value={globalDeck[0]?.value}
                        handleActive
                    />
                ) : (
                    <Card onClick={handlePick} placeholder />
                )}
                {cardPit.length > 0 ? (
                    <Card
                        onClick={handleDeposit}
                        symbol={cardPit[cardPit.length - 1]?.symbol}
                        value={cardPit[cardPit.length - 1]?.value}
                        badge={cardPicked === "globalDeck" ? "drop" : false}
                        defaultActive
                    />
                ) : (
                    <Card onClick={handleDeposit} placeholder badge={cardPicked === "globalDeck" ? "drop" : false} />
                )}
            </div>
            <div className={styles.player_container}>
                {play ? (
                    <PlayerDeck>
                        {playerDeck.map((card, key) => (
                            <Card
                                onClick={handleSwitch}
                                id={key}
                                key={key}
                                symbol={card.symbol}
                                value={card.value}
                                defaultActive={activePlayerCard}
                                badge={cardPicked ? "switch" : false}
                            />
                        ))}
                    </PlayerDeck>
                ) : (
                    <Button onClick={handlePlay}>Play</Button>
                )}
            </div>
            <Navbar>
                <Button onClick={handleDutch}>Dutch!</Button>
            </Navbar>
        </div>
    );
};

export default Home;
