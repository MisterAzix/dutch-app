import React from 'react';
import styles from './navbar.module.css';

import Button from '../../components/Button/Button';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <button className={styles.emoji}>🔥</button>
            <Button>Dutch!</Button>
            <button className={styles.chat}>💬</button>
        </nav>
    )
}
