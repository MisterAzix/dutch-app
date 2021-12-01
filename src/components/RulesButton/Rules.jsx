import React, { useState } from 'react';
import styles from './rules.module.css';

import Button from '../Button/Button';

export default function Rules(props) {
    const [active, setActive,] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <>
            <button className={styles.btn} onClick={handleClick}>?</button>
            {active && <div className={styles.popup}>
                <h2>Règles du jeu</h2>
                <h3><span>Objectif : </span><br/>
                Avoir le moins de points possible<br/>

                <span className={styles.bold}>Fin de la partie :</span><br/>
                Un joueur dit "Dutch" quand il est persuadé d'avoir <br/>moins de points que son(es) adversaire(s) <br/>
                <span className={styles.italic}>Dernier tour de tous les participants puis fin de la partie.</span><br/>

                <span className={styles.bold}>Valeur des cartes :</span><br/>
                Cartes de chiffres : <span className={styles.bold}>Valeur de la carte</span><br/>
                Valet, Dame : 10<br/>
                Roi rouge : 0<br/>
                Roi noir : 13<br/>

                <span className={styles.bold}>Déroulé :</span><br/>
                Chaque joueur dispose de 4 cartes, et prend connaissance de 2 d'entre elles. Il les dispose toutes face cachée.<br/>
                Le 1er joueur pioche dans la pioche ou dans le 2d <br/>
                paquet. Il a 2 choix :<br/>
                    a. L'échanger avec l'une de ses 4 cartes<br/>
                    b.La jeter dans le second paquet<br/>

                <span className={styles.bold}>Fonctionnalités :</span><br/>
                <span className={styles.italic}>Certaines cartes ont des pouvoirs qui s'activent lorsqu'elles sont jetées →</span><br/>
                <span className={styles.bold}>Dame :</span> Voir n'importe quelle carte du jeu<br/>
                <span className={styles.bold}>Valet :</span>  Echanger n'importe quelles cartes du jeu<br/>
                <span className={styles.bold}>As :</span> Donner 1 carte de la pioche au joueur de son choix</h3><br/>

                <Button onClick={handleClick} class={styles.close_btn}>Close</Button>
            </div>}
        </>
    )
}