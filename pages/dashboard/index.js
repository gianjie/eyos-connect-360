import React from 'react';
import styles from '../../styles/Home.module.css';

export default function Home() {
  const upload = (file) => {
    console.log(file)
  };

 const onClick = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    const videoTracks = stream.getVideoTracks()
    const track = videoTracks[0]
    alert(`Getting video from: ${track.label}`)
    document.querySelector('video').srcObject = stream
    document.querySelector('#get-access').setAttribute('hidden', true)
    //The video stream is stopped by track.stop() after 3 second of playback.

  
  } catch (error) {
    alert(`${error}`)
    console.error(error)
  }
 }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
          {' '}
          <a href="https://nextjs.org"><br/>DASHBOARD</a>
        </h1>
        <button id="get-access" onClick={onClick}>Get access to camera</button>
        <video autoPlay></video>
      </main>
    </div>
  );
}
