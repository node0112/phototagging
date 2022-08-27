import logo from './logo.svg';
import './App.css';
import './reset.css'
import './site.css'
import SignIn from './components/signIn';
import {signOut, getAuth} from 'firebase/auth'
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth } from './fireabse'
import React, { useCallback, useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen'

import backgroundImage from './components/images/img1.jpg'
import odlaw from './components/images/odlaw.webp'
import waldo from './components/images/waldo.webp'
import wenda from './components/images/wenda.webp'
import wizard from './components/images/wizard.webp'
import Header from './components/Header';
import Sidebox from './components/Sidebox';





function App() {

  let posX,posY,leftPos,topPos,modalX,modalY;
  let selectorRendered=false

  //define states-------->
  const [waldoFound,setWaldoFound]=useState({found : false})
  const [wizardFound,setWizardFound]=useState({found : false})
  const [wendaFound,setWendaFound]=useState({found : false})
  const [odlawFound,setOdlawFound]=useState({found : false})


  const [status,setStatus]=useState(true)
  const [highScore,setHighScore]=useState(0)
  const updateHighScore=()=>setHighScore((currentScore)=>currentScore+1)
  let opener='shady'
  let box=''

  function printMousePos(event) {
    let header=document.querySelector('.header')
    let headerHieght=header.offsetHeight; 
    if(selectorRendered==false){
    var rect = container.getBoundingClientRect();
      posX=event.clientX + container.scrollLeft - rect.left;
      posY=event.clientY + container.scrollTop - rect.top;
      leftPos=posX-30
      topPos=posY-30
      modalX=leftPos+70 //places it right beside the selection square
      modalY=posY-60
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
  document.addEventListener('click', (event)=>{
    selectorRendered ? removeSquare() : printMousePos(event)
  })
  
  function checkCharacterSelection(setCharacter,left,right,top,bottom){
    function checkPointPos(){
      removeSquare()
      if(posX>=left && posX<=right && posY>=top && posY<=bottom){
        return true
      }
      else{
        return false
      }
    }
    if(checkPointPos() === true ){//setwhatever character is chosen to true and update it in cloud as well as highscore
      setCharacter.found=true
      updateHighScore(highScore+1)
      if(user){
        updateScore()
      }
    }
    else if(checkPointPos() === false){ //shows error on top of page
      let errorModal=document.querySelector('.error-modal')
      errorModal.classList.remove('hide')
      errorModal.style.opacity='1'
      setTimeout(() => {
        errorModal.style.opacity='0'
      }, 5000);
      setTimeout(() => {
        errorModal.classList.add('hide')
      }, 6000);
    }
  }

  function drawSquare(){
    //change position of current square to place where user has clicked
    let square=document.querySelector(".char-selector")
    let menu=document.querySelector('.selection-menu')
    square.classList.remove('hide')
    menu.classList.remove('hide')
    square.style.top=topPos+'px'
    square.style.left=leftPos+'px'
    menu.style.left=modalX+'px'
    menu.style.top=modalY+'px'
  }
  function removeSquare(){
    document.querySelector(".char-selector").classList.add('hide')
    let menu=document.querySelector('.selection-menu')
    menu.classList.add('hide')
    selectorRendered=false
  }



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
  async function updateScore(){
    const db= await firebase.firestore().collection(user.displayName).get()
    let data=db.docs.map(doc => doc.data())
    let id=db.docs.map(doc => doc.id)
    if(data.length === 0){
      try {
        await addDoc(collection(getFirestore(), user.displayName), { //creates document if it doesnt exist
          waldoFound: waldoFound.found,
          wendaFound: wendaFound.found,
          odlawFound: odlawFound.found,
          wizardFound: wizardFound.found,
          highScore: highScore
        })
      }
      catch(error) {
        console.error('Error writing new message to Firebase Database', error);
      }
    }
    else if(data.length !== 0){
      firebase.firestore().collection(user.displayName).doc(id[0]).update("waldoFound",waldoFound.found)
      firebase.firestore().collection(user.displayName).doc(id[0]).update("odlawFound",odlawFound.found)
      firebase.firestore().collection(user.displayName).doc(id[0]).update("wizardFound",wizardFound.found)
      firebase.firestore().collection(user.displayName).doc(id[0]).update("wendaFound",wendaFound.found)
      
    }
  }
  async function resetData(){
    const db= await firebase.firestore().collection(user.displayName).get()
    let data=db.docs.map(doc => doc.data())
    let id=db.docs.map(doc => doc.id)
    if(data.length !== 0){
      firebase.firestore().collection(user.displayName).doc(id[0]).update("waldoFound",false)
      firebase.firestore().collection(user.displayName).doc(id[0]).update("odlawFound",false)
      firebase.firestore().collection(user.displayName).doc(id[0]).update("wizardFound",false)
      firebase.firestore().collection(user.displayName).doc(id[0]).update("wendaFound",false)
      waldoFound.found=false
      odlawFound.found=false
      wendaFound.found=false
      wizardFound.found=false
    }
  }
  const [dataRaceieved,setDataRaceieved] = useState(false)
  async function getData(){
    const db= await firebase.firestore().collection(user.displayName).get()
    let data=db.docs.map(doc => doc.data())
    if(data.length !== 0){
      waldoFound.found= data[0].waldoFound
      wendaFound.found= data[0].wendaFound
      odlawFound.found= data[0].odlawFound
      wizardFound.found= data[0].wizardFound
      setHighScore(data[0].highScore)
    }
    if(db){
      setDataRaceieved(true)
    }
  }


  
  

  let fetchedInitData=false

  useEffect(()=>{ //retrieves data if user is logged in
    if(user && fetchedInitData === false && dataRaceieved === false){
      getData()
      fetchedInitData=true
      console.log('logged in')
     }   
  })
 


  if(initializing) return <LoadingScreen loadingText={"Fetching User Data From Server "}/>
  if(dataRaceieved === false){
    return(<LoadingScreen loadingText={"Fetching Character Data From Server "}/>)
  }

  return (
    <div>
      <Header user={user} signOut={signOutUser} resetData={resetData}/>
      <div className='error-modal flex hide'><span class="material-icons" style={{color:'brown', fontSize: '1.2em', borderRight: '2px solid brown',marginRight: '5px'}}>close</span> Wrong Character</div>
      <div className='char-selector hide'>
      </div>
      <div className='selection-menu hide'>
          {waldoFound.found ? null : <div className='selection-text transition pointer' onClick={()=>{checkCharacterSelection(waldoFound,553,613,631,691)}}>Waldo</div> }
          {odlawFound.found ? null : <div className='selection-text transition pointer' onClick={()=>{checkCharacterSelection(odlawFound,102,162,723,783)}}>Odlaw</div> }
          {wendaFound.found ? null : <div className='selection-text transition pointer' onClick={()=>{checkCharacterSelection(wendaFound,395,455,531,591)}} >Wenda</div> }
          {wizardFound.found ? null : <div className='selection-text transition pointer' onClick={()=>{checkCharacterSelection(wizardFound,1125,1185,558,678)}}>Wizard</div> }
        </div>
      <div className='image-container'></div>
      <img src={backgroundImage} className="background-image"/>
      <Sidebox waldoFound={waldoFound.found} wizardFound={wizardFound.found} odlawFound={odlawFound.found} wendaFound={wendaFound.found} status={status} waldo={waldo} wenda={wenda} wizard={wizard } odlaw={odlaw} openBox={openBox} closeBox={closeBox}  />
    </div>
  );
}

export default App;
