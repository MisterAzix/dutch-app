import React from 'react';

import styles from './button.module.css';

export default function Button(props) {
    return (
        <button onClick={props.onClick} className={`${styles.btn} ${props.secondary && styles.secondary}`}>
           {props.children}
        </button>
    )
}
