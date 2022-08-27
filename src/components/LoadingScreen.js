import React from 'react'
import './loaderAnimation.css'

function LoadingScreen({loadingText}) {
  return (
    <div class="loading-screen">
      <div className='loading-text'>{loadingText}</div>
      <div id="loading"></div>
    </div>
  )
}

export default LoadingScreen