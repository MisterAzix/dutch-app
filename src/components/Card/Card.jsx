import React from 'react';
import styles from './card.module.css';

import Diamond from '../../icons/Diamond';
import Spade from '../../icons/Spade';
import Heart from '../../icons/Heart';
import Club from '../../icons/Club';

export default function Card() {
    return (
        <div className={styles.card}>
            <div className={styles.top}>A</div>
                <Diamond className={styles.icon} />
            <div className={styles.bottom}>A</div>

            
        </div>
    )
}
