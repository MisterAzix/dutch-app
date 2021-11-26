import React from "react";
import logo from '../../logo.svg';
import styles from './home.module.css';

import Button from '../../components/Button/Button';
import Navbar from '../../components/NavBar/Navbar';
import Card from '../../components/Card/Card';

const Home = () => {
    // let buttonName = 'Dutch!';

    return (
        <div className={styles.container}>

            <Navbar />
            <Card />
            
            
            
            
            
            {/* <Button value={buttonName}></Button> */}

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
