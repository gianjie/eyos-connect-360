import React from 'react';
import styles from '../../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
          {' '}
          <a href="https://nextjs.org"><br/>AUTHENTICATION</a>
        </h1>
      </main>
    </div>
  );
}