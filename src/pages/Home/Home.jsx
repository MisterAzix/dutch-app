import React from "react";
import logo from '../../logo.svg';
import styles from './home.module.css';
import Button from '../../components/Button/Button'

const Home = () => {
    return (
        <div className={styles.container}>

            <Button>Dutch!</Button>

            {/* <header className={styles.header}>
                <img src={logo} className={styles.logo} alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className={styles.link}
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header> */}
        </div>
    );
};

export default Home;
