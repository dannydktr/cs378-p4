import React, {useState} from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { uid } from 'uid';

export default function Notetake() {
  return (
    <div>Notetake
    </div>
  )
}
