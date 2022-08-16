import React from 'react'
import SignIn from './signIn'

function Header({user}) {
  return (
    <div className="header" >
        <div className='logo'>Where's Waldo?</div>
        <ul  className='header-links'>
            <li><a className='transition header-link'>Repository</a></li>
            <li><a className='transition header-link' href=''>Projects+</a></li>
            <li>{user ? <div className='profile'><img  className='profile-pic pointer transition' src={user.photoURL}></img>{user.displayName}
            <div className='user-menu transition'>
          <div style={{color: 'yellowgreen',fontFamily: 'open sans,sans-serif'}}>Saving Scores In Cloud</div>
          <button className='menu-item transition'>Sign Out</button>
          <button className='menu-item transition'></button>
        </div>
        </div> : <SignIn />}</li>
        </ul>

    </div>
  )
}

export default Header