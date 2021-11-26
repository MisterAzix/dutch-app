import React from "react";
import styles from "./home.module.css";

import Navbar from "../../components/NavBar/Navbar";
import PlayerDeck from "../../components/PlayerDeck/PlayerDeck";
import Card from "../../components/Card/Card";

const Home = () => {
    // let buttonName = 'Dutch!';

    return (
        <div className={styles.container}>
            <div className={styles.board}>
                <Card symbol="club" value="8" />
                <Card symbol="spade" value="4" />
            </div>
            <div className={styles.player_container}>
                <PlayerDeck />
                <Navbar />
            </div>
        </div>
    );
};

export default Home;
