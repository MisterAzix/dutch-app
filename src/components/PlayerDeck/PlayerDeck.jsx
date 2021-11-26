import React from 'react';
import styles from './playerDeck.module.css';

import Card from '../Card/Card';

export default function PlayerDeck() {
    return (
        <div className={styles.deck}>
            <Card symbol="heart" value="A" />
            <Card symbol="diamond" value="K" />
            <Card symbol="club" value="3" />
            <Card symbol="heart" value="7" />
        </div>
    )
}
