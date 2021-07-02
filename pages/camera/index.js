import React, {useEffect, useState} from 'react';
import styles from '../../styles/Home.module.css';
import Image from 'next/image'
import { useRouter } from 'next/router';
// import Link from 'next/link'

const style = {
  button : {
    zIndex: 1, width: 60, height: 60, borderRadius: 40,
    border: 'none', position:"fixed", bottom: 50, backgroundColor:"white"
  },
  XContainer: {
    position:'absolute', top: 20, left: 25, padding: 10
  },
  SubmitContainer: {
    position:'absolute', bottom: 40, left: 0, right: 0,
    display:'flex', justifyContent: 'center', zIndex: 5
  }
}
export default function Home() {
  const Router = useRouter();

  const [takePhoto, setTakePhoto] = useState(null);

  useEffect(() => {
    setupCamera()
  }, []);

  const reTakePhoto = () => setTakePhoto(null);
  const submitPhoto = () => {
    vidOff();
    Router.back()
  };


  const vidOff = () => {
    const video = document.querySelector('video');
    // A video's MediaStream object is available through its srcObject attribute
    const mediaStream = video.srcObject;
    // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
    const tracks = mediaStream.getTracks();
    // Tracks are returned as an array, so if you know you only have one, you can stop it with: 
    tracks[0].stop();
    // Or stop all like so:
    tracks.forEach(track => track.stop())
  }

  const captureVideo = (video) => {
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var canvasContext = canvas.getContext("2d");
    canvasContext.drawImage(video, 0, 50);
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
      document.querySelector('video').style.height = window.outerHeight + 'px'
      // document.querySelector('video').style.width = window.outerWidth + 'px';
      // document.querySelector('#get-access').setAttribute('hidden', true)
      //The video stream is stopped by track.stop() after 3 second of playback.

      document.querySelector('button').addEventListener('click', function() {
        const blobImage64 = captureVideo(document.querySelector('video'));
        setTakePhoto(blobImage64)
      });
      
    } catch (error) {
      alert(`${error}`)
      console.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <video id="vid" autoPlay muted playsInline/>
        <div style={{zIndex:1}}>
          <span style={{height: 50, width: 50, borderRadius: 25, backgroundColor:"red"}}></span>
        </div>
        <button style={style.button}/>
        {takePhoto && 
          <div style={{
            zIndex: 2, position:"fixed", backgroundColor:'black', 
            top:0, left: 0,
            height: window?.visualViewport.height, 
            width: window?.visualViewport.width,
            display:'flex', justifyContent:"center", alignItems:"center",
          }}>
            <span style={{
              height: window?.visualViewport.height, 
              width: window?.visualViewport.width,
            }}>
              <Image 
                src={takePhoto} 
                height={window?.visualViewport.height}
                width={window?.visualViewport.width}
                layout={'fixed'}
                objectFit={'contain'}
                alt="eyos photo taken"
              />
            </span>
          
            
            <div style={style.XContainer} onClick={reTakePhoto}>
              <span style={{color:'white', fontSize: 25}}>X</span>
            </div>

            <div style={style.SubmitContainer} onClick={submitPhoto}>
              <span style={{color:'white', fontSize: 15, border: '1px solid white', padding: '5px 20px', borderRadius: 20}}>Submit</span>
            </div>
          </div>
        }
      </main>
    </div>
  );
}
