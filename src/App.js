import logo from './logo.svg';
import './App.css';
import './reset.css'
import './site.css'
import SignIn from './components/signIn';
import {signOut, getAuth} from 'firebase/auth'
import { auth } from './fireabse'
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen'

import backgroundImage from './components/images/img1.jpg'
import odlaw from './components/images/odlaw.webp'
import waldo from './components/images/waldo.webp'
import wenda from './components/images/wenda.webp'
import wizard from './components/images/wizard.webp'
import Header from './components/Header';





function App() {

  

  let posX,posY,leftPos,topPos,modalX,modalY

  let selectorRendered=false

  function printMousePos(event) {
    let header=document.querySelector('.header')
    let headerHieght=header.offsetHeight; 
    if(selectorRendered==false){
    var rect = container.getBoundingClientRect();
      posX=event.clientX + container.scrollLeft - rect.left;
      posY=event.clientY + container.scrollTop - rect.top;
      leftPos=posX-30
      topPos=posY-30
      modalX=leftPos+60 //places it right beside the selection square
      modalY=posY
      if(topPos>headerHieght-10){ //prevents square from rendering on header
        drawSquare()
        selectorRendered=true
      }
    }
    else{
      removeSquare()
    }
  }
  
  const container = document.querySelector('body')
  document.addEventListener('click', printMousePos)
  
  function drawSquare(){
    //change position of current square to place where user has clicked
    let square=document.querySelector(".char-selector")
    square.classList.remove('hide')
    square.style.top=topPos+'px'
    square.style.left=leftPos+'px'
  }
  function removeSquare(){
    document.querySelector(".char-selector").classList.add('hide')
    selectorRendered=false
  }
  let status='opened'
  const handleSideBox = ()=>{document.querySelector('.character-card-opener').addEventListener('click',()=>{
      let box=document.querySelector('.side-box')
      let opener=document.querySelector('.character-card-opener')
      if(status=='opened'){
        box.style.left='-300px'
        opener.style.transform='rotate(180deg)'
        status='closed'
      }
      else{
        box.style.left='0'
        opener.style.transform='rotate(-0deg)'
        status='opened'
      }
    })
  }
  
  //------------Firebase Functions Here----------------//

  const [user,setUser]=useState(()=>auth.currentUser)
  const [initializing,setInitializing]=useState(true)
  useEffect(()=>{
    const unsubscribe= auth.onAuthStateChanged(user => {
      if(user){
        setUser(user)
      }
      else{
        setUser(null)
      }
      if(initializing){
        setInitializing(false)
      }
    })
    return unsubscribe
  },[])

  function signOutUser() { //signs out user
    // Sign out of Firebase.
    signOut(getAuth());
  }

  if(initializing) return <LoadingScreen loadingText={"Fetching Data From Server "}/>

  return (
    <div>
      <Header user={user}/>
      <div className='char-selector hide'></div>
      <div className='image-container'></div>
      <img src={backgroundImage} className="background-image"/>
      <div className='side-box flex transition' onLoad={handleSideBox}>
        <div className='character-box flex column transition'>
          <div style={{fontFamily: 'open sans',fontSize: '1.5em',marginBottom: '20px'}}>Characters To Find:</div>
          <div className='character-card flex'>
            <img className='character-image' src={waldo}/>
            <div className='character-text'>Waldo</div>
          </div>
          <div className='character-card flex'>
            <img className='character-image' src={wenda}/>
            <div className='character-text'>Wenda</div>
          </div>
          <div className='character-card flex'>
            <img className='character-image' src={wizard}/>
            <div className='character-text'>Wizard</div>
          </div>
          <div className='character-card flex'>
            <img className='character-image' src={odlaw}/>
            <div className='character-text'>Odlaw</div>
          </div>
        </div>
        <div className='character-card-opener flex'>◀</div>
      </div>
    </div>
  );
}

export default App;
