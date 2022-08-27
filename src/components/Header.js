import React from 'react'
import SignIn from './signIn'

function Header({user,signOut,resetData}) {
  return (
    <div className="header" >
        <div className='logo'>Where's Waldo?</div>
        <ul  className='header-links'>
            <li><a className='transition header-link'>Repository</a></li>
            <li><a className='transition header-link' href=''>Projects+</a></li>
            <li>{user ? <div className='profile'><img  className='profile-pic pointer transition' src={user.photoURL}></img>{user.displayName}
            <div className='user-menu flex column transition'>
            <div className={user ? 'green' : 'red'} style={{fontFamily: 'open sans,sans-serif'}}>{user ? 'Signed In' : 'Not Signed In'}</div>
            <div style={{fontFamily: 'open sans,sans-serif'}}>{user ? 'Saving Scores In Cloud' : 'Not Saving Scores In Cloud'}</div>
            <button className='menu-item transition pointer' onClick={()=>{signOut()}}>Sign Out</button>
            <button className='menu-item transition pointer' onClick={resetData}>Reset Characters</button>
        </div>
        </div> : <SignIn />}</li>
        </ul>

    </div>
  )
}

export default Header