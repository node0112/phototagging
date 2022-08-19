import React from 'react'
import firebase from 'firebase/compat/app'
import { auth } from '../fireabse'

function SignIn() {
    async function signIn(){
        const provider = new firebase.auth.GoogleAuthProvider()
        try{
            await auth.signInWithPopup(provider)
        } catch(error){
            console.log(error)
        }
        console.log(auth.currentUser)
        
    }
  return (
    <div>
        <button className='sign-in transition pointer' onClick={signIn}>Sign In</button>
    </div>
  )
}

export default SignIn