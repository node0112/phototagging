import React from 'react'

function LoadingScreen({loadingText}) {
  return (
    <div class="loading-screen hide">
      <div className='loading-text'>{loadingText}</div>
      <div id="loading"></div>
    </div>
  )
}

export default LoadingScreen