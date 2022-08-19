import logo from './logo.svg';
import './App.css';
import './reset.css'
import './site.css'
import SignIn from './components/signIn';
import {signOut, getAuth} from 'firebase/auth'
import { auth } from './fireabse'
import React, { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen'

import backgroundImage from './components/images/img1.jpg'
import odlaw from './components/images/odlaw.webp'
import waldo from './components/images/waldo.webp'
import wenda from './components/images/wenda.webp'
import wizard from './components/images/wizard.webp'
import Header from './components/Header';
import Sidebox from './components/Sidebox';





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
  //document.addEventListener('click', printMousePos)
  
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

  const [status,setStatus]=useState(true)
  let opener='shady'
  let box=''

  //define states-------->
  const [waldoFound,setWaldoFound]=useState(false)
  const [wizardFound,setWizardFound]=useState(false)
  const [wendaFound,setWendaFound]=useState(false)
  const [odlawFound,setOdlawFound]=useState(false)


  useEffect(()=>{ //sets sidebox variables everytime page is loaded
    opener=document.querySelector('.character-card-opener')
    box=document.querySelector('.side-box')
  })

  function openBox(){
    box.style.left='-300px'
    opener.style.transform='rotate(180deg)'
    setStatus(false)
  }
  function closeBox(){
    box.style.left='0px'
    opener.style.transform='rotate(-0deg)'
    setStatus(true)
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
      <Header user={user} signOut={signOutUser}/>
      <div className='char-selector hide'></div>
      <div className='image-container'></div>
      <img src={backgroundImage} className="background-image"/>
      <Sidebox waldoFound={waldoFound} wizardFound={wizardFound} odlawFound={odlawFound} wendaFound={wendaFound} status={status} waldo={waldo} wenda={wenda} wizard={wizard } odlaw={odlaw} openBox={openBox} closeBox={closeBox} setWaldoFound={setWaldoFound} />
    </div>
  );
}

export default App;
