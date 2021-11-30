import React, { useState, useEffect } from "react";
import styles from "./card.module.css";

import Diamond from "../../icons/Diamond";
import Heart from "../../icons/Heart";
import Spade from "../../icons/Spade";
import Club from "../../icons/Club";

export default function Card({ symbol, value, defaultActive, placeholder }) {
    const [active, setActive] = useState(false);
    useEffect(() => {
        setActive(defaultActive);
    }, [defaultActive]);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <div
            onClick={handleClick}
            className={`${active ? styles.card_active : styles.card} ${
                symbol === "diamond" || symbol === "heart" ? styles.red : ""
            } ${placeholder ? styles.placeholder : ''}`}
        >
            {!active || placeholder ? (
                <>
                    <div className={styles.top_back}></div>
                    <div className={styles.txt_back}>
                        DUTCH
                        <br />
                        APP
                    </div>
                    <div className={styles.bottom_back}></div>
                </>
            ) : (
                <>
                    <div className={styles.top}>{value}</div>
                    {symbol === "diamond" && (
                        <Diamond className={styles.icon} />
                    )}
                    {symbol === "heart" && <Heart className={styles.icon} />}
                    {symbol === "club" && <Club className={styles.icon} />}
                    {symbol === "spade" && <Spade className={styles.icon} />}
                    <div className={styles.bottom}>{value}</div>
                </>
            )}
        </div>
    );
}
