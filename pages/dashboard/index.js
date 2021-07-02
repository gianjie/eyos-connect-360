import React, {useEffect} from 'react';
import styles from '../../styles/Home.module.css';
import Link from 'next/link'

export default function Home() {

  useEffect(() => {
    var video = document.createElement('video');
    video.style.width = 200 + 'px';
    video.style.height = 200 + 'px';
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
  }, []);

  
  const onClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'environment'
        }
      })
      const videoTracks = stream.getVideoTracks()
      // const track = videoTracks[0]

      document.querySelector('video').srcObject = stream
      document.querySelector('video').style.width = window.outerWidth + 'px';
      document.querySelector('video').style.height = window.outerHeight + 'px';
      document.querySelector('video').setAttribute('autoplay', '');
      document.querySelector('video').setAttribute('muted', '');
      document.querySelector('video').setAttribute('playsinline', '');
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
