import React from "react";
import styles from "./card_badge.module.css";

import Drop from "../../icons/Drop";
import Switch from "../../icons/Switch";

export default function CardBadge(props) {
    return (
        <div className={styles.badge}>
            {props.badge && (props.badge === "switch" ? <Switch /> : <Drop />)}
        </div>
    );
}
