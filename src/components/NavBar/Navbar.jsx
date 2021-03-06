import React, { useState } from "react";
import styles from "./navbar.module.css";

const myEmojis = ['ðĨ', 'ð', 'ðģ', 'ð', 'ðĪĐ', 'ðļ', 'ð', 'ðĪ­', 'ðĪŠ', 'ðĪĢ', 'ð', 'ð', 'ð', 'ð§', 'ðĢ', 'ð ', 'ðĪ', 'ðķ', 'ð', 'ðē', 'ðŪ', 'ð', 'ðĨ', 'ðĪ', 'ðū'];

export default function Navbar(props) {
    const [emoji, setEmoji] = useState(myEmojis[Math.floor(Math.random() * myEmojis.length)]);

    const handleClick = () => {
        setEmoji(myEmojis[Math.floor(Math.random() * myEmojis.length)]);
    };

    return (
        <nav className={styles.navbar}>
            <button className={styles.emoji} onClick={handleClick}>{emoji}</button>
            {props.children}
            <button className={styles.chat}>ðŽ</button>
        </nav>
    );
}
