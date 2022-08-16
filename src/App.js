import logo from './logo.svg';
import './App.css';
import './reset.css'
import './site.css'
import SignIn from './components/signIn';
import firebase from "firebase/compat/app";
import { auth } from './fireabse'
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen'

import backgroundImage from './components/img1.jpg'
import Header from './components/Header';





function App() {

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
      if(topPos>headerHieght-10){
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
  //------------Firebase Functions Here----------------//

  

  if(initializing) return <LoadingScreen loadingText={"Fetching Data From Server "}/>

  return (
    <div>
      <Header />

      <div className='char-selector hide'></div>
      <div className='image-container'></div>
      <img src={backgroundImage} className="background-image"/>
    </div>
  );
}

export default App;
