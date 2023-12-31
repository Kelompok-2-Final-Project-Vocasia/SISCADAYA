import React from 'react'
import HomeButton from '../ButtonHome';

const Video = () => {
  return (
    <div>
      <HomeButton/>
        <p className="video-subheading">Video</p>
        <h1 className="video-heading">
          Video Cagar Budaya Indonesia
        </h1>
        
      <section className="container video-content" id="content">
        <section className="videoplay justify-content-center">
          <section className="embed-responsive embed-responsive-16by9 videoIframe">
            <iframe className="embed-responsive-item video" src="https://www.youtube-nocookie.com/embed/G7ePJRF2W38" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
            encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </section>
        </section>
      </section>
    </div>
  )
}


export default Video;