import React from "react";
import styles from "./modal.module.css";

import Button from "../Button/Button";

export default function Modal(props) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>{props.children}</p>
                <Button onClick={props.onClick}>Ok!</Button>
            </div>
        </div>
    );
}
