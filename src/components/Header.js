import React from 'react'

function Header() {
  return (
    <div className="header" >
        <div className='logo'>Where's Waldo?</div>
        <ul  className='header-links'>
            <li><a className='transition header-link'>Repository</a></li>
            <li><a className='transition header-link' href=''>Projects+</a></li>
        </ul>
    </div>
  )
}

export default Header