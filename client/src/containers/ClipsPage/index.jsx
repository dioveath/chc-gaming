import React from 'react'

export default function ClipsPage() {
  return (
    <article>
      <div className="relative w-full h-[80%]">
        <video className="absolute top-0 left-0 w-full h-full object-cover -z-10 bg-opacity-90" id="background-video" loop={true} muted={true} autoPlay={true} poster="">
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>                        
    </article>
  )
}
