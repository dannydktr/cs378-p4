import React, {useState} from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
//import { uid } from 'uid';

export default function Notetake() {
  return (
    <div>
        <h2>Notetaker</h2>
        <div>
            <input type="test" placeholder="add text"></input>
            <button>add</button>
        </div>
    </div>
  )
}