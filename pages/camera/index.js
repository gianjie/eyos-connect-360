import React, {useEffect} from 'react';
import styles from '../../styles/Home.module.css';
import Link from 'next/link'

export default function Home() {

  useEffect(() => {
    setupCamera()
  }, []);

  
  const captureVideo = (video) => {
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var canvasContext = canvas.getContext("2d");
    canvasContext.drawImage(video, 0, 0);
    return canvas.toDataURL('image/png');
  }

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'environment'
        }
      })
      // const videoTracks = stream.getVideoTracks()
      // const track = videoTracks[0]

      document.querySelector('video').srcObject = stream
      document.querySelector('video').style.position = 'fixed';
      document.querySelector('video').style.height = window.outerHeight + 'px';
      // document.querySelector('video').style.width = window.outerWidth + 'px';
      // document.querySelector('#get-access').setAttribute('hidden', true)
      //The video stream is stopped by track.stop() after 3 second of playback.

      const mediaStreamTrack = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(mediaStreamTrack);

      await imageCapture.getPhotoCapabilities()
      
      const btn = document.querySelector('.switch');
      btn.addEventListener('click', function(){
        try {
          mediaStreamTrack.applyConstraints({
            advanced: [{torch: true}]
          });
        } catch (e) {
          alert(`${e}`)
          console.log(e)
        }
      });
      //Create image capture object and get camera capabilities
      // const imageCapture = new ImageCapture(track)
      // imageCapture.getPhotoCapabilities().then(() => {
      //   try {
      //     //todo: check if camera has a torch
      //     //let there be light!
      //     const btn = document.querySelector('.switch');
      //     btn.addEventListener('click', function(){
      //       track.applyConstraints({
      //         advanced: [{torch: true}]
      //       });
      //     });
      //   } catch (err) {
      //     console.log(err)
      //   }
      // });

      document.querySelector('video').addEventListener('click', function() {
        const blobImage64 = captureVideo(document.querySelector('video'));
        console.log({blobImage64})
      });
      
    } catch (error) {
      alert(`${error}`)
      console.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <video autoPlay muted={true} playsInline/>
        <button className="switch" style={{zIndex:1}}>On / Off</button>
      </main>
    </div>
  );
}
