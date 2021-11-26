import React from 'react';
import styles from './card.module.css';

import Diamond from '../../icons/Diamond';
import Heart from '../../icons/Heart';
import Spade from '../../icons/Spade';
import Club from '../../icons/Club';

export default function Card(props) {

    return (
        <div className={`${styles.card} ${(props.symbol === "diamond"||props.symbol === "heart") ?styles.red:styles.black}`}>
            <div className={styles.top}>{props.value}</div>
                {props.symbol === "diamond" && <Diamond className={styles.icon} /> }
                {props.symbol === "heart" && <Heart className={styles.icon} /> }
                {props.symbol === "club" && <Club className={styles.icon} /> }
                {props.symbol === "spade" && <Spade className={styles.icon} /> }
            <div className={styles.bottom}>{props.value}</div>
        </div>
    )
}
