import React, { useState } from "react";
import styles from "./navbar.module.css";

const myEmojis = ['🔥', '😝', '😳', '🙀', '🤩', '😸', '😎', '🤭', '🤪', '🤣', '😁'];

export default function Navbar(props) {
    const [emoji, setEmoji] = useState(myEmojis[Math.floor(Math.random() * myEmojis.length)]);

    const handleClick = () => {
        setEmoji(myEmojis[Math.floor(Math.random() * myEmojis.length)]);
    };

    return (
        <nav className={styles.navbar}>
            <button className={styles.emoji} onClick={handleClick}>{emoji}</button>
            {props.children}
            <button className={styles.chat}>💬</button>
        </nav>
    );
}
