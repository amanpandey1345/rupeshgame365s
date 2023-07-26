'use client'
import { useRef, useState } from "react"

const Music = () => {
    const videoRef = useRef()
    const [off, setOff] = useState(false)

    const music = () => {
        setOff(!off);
        if (off === true) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    }

    return (
        <>
            <audio autoPlay unmuted='true' style={{ display: "none" }} loop ref={videoRef} id='video' src="/media/music.mp3" />
            {/* <video autoPlay unmuted='true' style={{ display: "none" }} loop ref={videoRef} id='video' src="/media/video.mp4" /> */}
            <button className='btn btn-info d-none' onClick={music}>Music</button>
        </>
    )

}

export default Music