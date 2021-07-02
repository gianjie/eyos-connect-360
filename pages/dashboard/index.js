import React from 'react';
import styles from '../../styles/Home.module.css';
import Link from 'next/link'
import { useRouter } from 'next/router';
import appRoutes from "../../lib/constants";

export default function Home() {
  const Router = useRouter();

  const onClick = async () => {
    Router.push(appRoutes.CAMERA)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
          {' '}
          <Link href="/">
            <a><br/>DASHBOARD</a>
          </Link>
        </h1>
        <button id="get-access" onClick={onClick}>Get access to camera</button>
        <video/>
      </main>
    </div>
  );
}
