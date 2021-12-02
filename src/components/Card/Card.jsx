import React, { useState, useEffect } from "react";
import styles from "./card.module.css";

import Diamond from "../../icons/Diamond";
import Heart from "../../icons/Heart";
import Spade from "../../icons/Spade";
import Club from "../../icons/Club";
import CardBadge from "../CradBadge/CardBadge";

export default function Card({
    onClick,
    symbol,
    value,
    defaultActive,
    placeholder,
    handleActive,
    badge,
    id
}) {
    const [active, setActive] = useState(false);
    useEffect(() => {
        setActive(defaultActive);
    }, [defaultActive]);

    useEffect(() => {
        placeholder && setActive(false);
    }, [placeholder])

    const handleClick = () => {
        setActive(true);
    };

    return (
        <div
            onClick={(e) => {
                onClick?.(e);
                handleActive && handleClick();
            }}
            id={id}
            className={`${active ? styles.card_active : styles.card} ${
                symbol === "diamond" || symbol === "heart" ? styles.red : ""
            } ${placeholder ? styles.placeholder : ""}`}
        >
            {badge && <CardBadge badge={badge} />}
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
