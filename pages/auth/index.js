import React from 'react';
import styles from '../../styles/Home.module.css';
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
          {' '}
          <Link href="/onboard">
            <a><br/>TO ONBOARDING</a>
          </Link>
        </h1>
      </main>
    </div>
  );
}
