import React from 'react';
import styles from './playerDeck.module.css';

export default function PlayerDeck(props) {
    return (
        <div className={styles.deck}>
            {props.children}
        </div>
    )
}
