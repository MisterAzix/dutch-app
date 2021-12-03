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
    const [cardPit, setCardPit] = useState([]);
    const [playerDeck, setPlayerDeck] = useState([]);
    const [AIDeck, setAIDeck] = useState([]);
    const [cardPicked, setCardPicked] = useState("");
    const [activePlayerCard, setActivePlayerCard] = useState(false);
    const [modal, setModal] = useState("");
    const [playerTurn, setPlayerTurn] = useState(true);
    /* const [round, setRound] = useState(0); */

    // Reset de la partie
    useEffect(() => {
        if (play) return;
        setGlobalDeck([]);
        setAIDeck([]);
        setCardPit([]);
        setActivePlayerCard(false);
    }, [play]);

    // Donner la main à l'IA après celle du joueur
    useEffect(() => {
        if (cardPicked) return;
        setPlayerTurn(false);
    }, [cardPicked]);

    // Permet de récupérer la valeur numérique de la carte
    const getValue = (valueText, symbol) => {
        switch (valueText) {
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
                return parseInt(valueText);
        }
    };

    // Logique de l'IA
    const handleAITurn = useCallback(() => {
        // TO DO
        // Check si la valeur de la carte de la fausse est inférieur à 5
        // Dans ce cas là piocher une carte de la fausse
        // Sinon piocher dans la pioche

        let tempIndexArray = AIDeck.map((_, i) => i);
        let indexArray = tempIndexArray.filter((i) => AIDeck[i]?.known === false);

        // TODO
        // S'il reste des cartes non connues par l'IA, les échanger en premier
        // et seulement lorsque toutes les cartes sont connues, échanger la plus grande carte

        // Faire fonction qui retourne valeur numérique de la carte selon sa valeur textuelle

        console.log(indexArray);

        let randomIndex = null;
        if (indexArray.length === 0) {
            console.log("All cards are known!");
            let maxValue = Math.max(...Array.from(AIDeck, (obj) => getValue(obj.value, obj.symbol)));
            randomIndex = AIDeck.findIndex((o) => getValue(o.value, o.symbol) === maxValue);
        } else {
            console.log("There are unknown cards!");
            randomIndex = indexArray[(Math.random() * indexArray.length) | 0];
        }
        if (randomIndex < 0) return console.log("error : ", randomIndex);

        if (cardPit[cardPit.length - 1]?.value <= 5) {
            console.log("CARDPIT");
            handleUpdateItem(
                randomIndex,
                {
                    value: cardPit[cardPit.length - 1].value,
                    symbol: cardPit[cardPit.length - 1].symbol,
                    known: true,
                },
                AIDeck,
                setAIDeck
            );
            handleUpdateItem(
                cardPit.length - 1,
                {
                    value: AIDeck[randomIndex].value,
                    symbol: AIDeck[randomIndex].symbol,
                },
                cardPit,
                setCardPit
            );
        } else {
            console.log("GLOBALDECK");
            handleUpdateItem(
                randomIndex,
                {
                    value: globalDeck[0].value,
                    symbol: globalDeck[0].symbol,
                    known: true,
                },
                AIDeck,
                setAIDeck
            );
            handleRemoveItem(0, globalDeck, setGlobalDeck);
            setCardPit([
                ...cardPit,
                {
                    value: AIDeck[randomIndex].value,
                    symbol: AIDeck[randomIndex].symbol,
                },
            ]);
        }
    }, [globalDeck, cardPit, AIDeck]);

    // Trigger de l'IA
    useEffect(() => {
        if (playerTurn) return;
        handleAITurn();
        setPlayerTurn(true);
    }, [playerTurn, handleAITurn]);

    // Initialisation de la pioche
    const handlePlay = () => {
        let tempGlobalDeck = generateGlobalDeck();
        let tempShuffledDeck = shuffleGlobalDeck(tempGlobalDeck);
        givePlayerCards(tempShuffledDeck);
        setPlay(true);
    };

    // Distribution des cartes au joueur et à l'IA
    const givePlayerCards = (tempGlobalDeck) => {
        const tempPlayerDeck = [];
        const tempIADeck = [];
        for (let i = 0; i < 4; i++) {
            tempPlayerDeck.push(tempGlobalDeck.shift());
            tempIADeck.push({ ...tempGlobalDeck.shift(), known: false });
        }
        setGlobalDeck(tempGlobalDeck);
        setPlayerDeck(tempPlayerDeck);
        setAIDeck(tempIADeck);
    };

    // Fin de partie : vérification du gagnant
    const handleDutch = () => {
        if (!play) return setModal("The game has not started!");
        if (!playerTurn) return setModal("It's not your turn!");
        setActivePlayerCard(true);

        const calculateScore = (arrayDeck) => {
            return arrayDeck.map(({ value, symbol }) => getValue(value, symbol)).reduce((prev, curr) => prev + curr);
        };

        let playerScore = calculateScore(playerDeck);
        let IAScore = calculateScore(AIDeck);

        if (playerScore < IAScore) {
            setModal(`You won the game with ${playerScore} points VS ${IAScore} points for the IA!`);
        } else {
            setModal(`You lost the game with ${playerScore} points VS ${IAScore} points for the IA!`);
        }

        setEnd(true);
    };

    const handlePick = () => {
        if (!play) return setModal("The game has not started!");
        if (!playerTurn) return setModal("It's not your turn!");
        if (cardPicked) return;
        if (globalDeck.length <= 0) return setModal("Deck is empty!");
        setCardPicked("globalDeck");
    };

    const handleDeposit = useCallback(() => {
        if (!play) return setModal("The game has not started!");
        if (!playerTurn) return setModal("It's not your turn!");
        if (cardPicked !== "globalDeck" && cardPit.length <= 0) return setModal("Pit is empty!");
        if (cardPicked === "pitDeck") return;
        if (!cardPicked) return setCardPicked("pitDeck");
        // if (!cardPicked) return setModal("Please picked up a card in deck before deposit!");
        setCardPit([...cardPit, { value: globalDeck[0].value, symbol: globalDeck[0].symbol }]);
        handleRemoveItem(0, globalDeck, setGlobalDeck);
        setCardPicked("");
    }, [play, playerTurn, cardPicked, cardPit, globalDeck]);

    const handleSwitch = useCallback(
        (e) => {
            if (!playerTurn) return setModal("It's not your turn!");
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
        [playerTurn, cardPicked, cardPit, globalDeck, playerDeck]
    );

    const handleModal = () => {
        if (end) setPlay(false);
        setModal("");
    };

    return (
        <div className={styles.container}>
            <Rules className={styles.rules} />
            <PlayerDeck ai>
                {AIDeck.map((card, key) => (
                    <Card key={key} symbol={card.symbol} value={card.value} defaultActive={activePlayerCard} />
                ))}
            </PlayerDeck>
            {modal && <Modal onClick={handleModal}>{modal}</Modal>}
            <div className={styles.board}>
                {globalDeck.length > 0 ? (
                    <Card
                        onClick={handlePick}
                        symbol={globalDeck[0]?.symbol}
                        value={globalDeck[0]?.value}
                        defaultActive={cardPicked === "globalDeck"}
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
