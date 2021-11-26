import React from 'react';
import styles from './playerDeck.module.css';

import Card from '../Card/Card';

export default function PlayerDeck() {
    return (
        <div className={styles.deck}>
            <Card symbol="heart" value="A" active={false} />
            <Card symbol="heart" value="A" active={false} />
            <Card symbol="heart" value="A" active={true} />
            <Card symbol="heart" value="A" active={true} />
        </div>
    )
}
