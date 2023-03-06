import React, { useState } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import {set, ref} from 'firebase/database';
import { uid } from 'uid';

export default function Notetake() {

    const [note, setNote] = useState('');
    const [listOfNotes, setListOfNotes] = useState([]);


    const writeToDatabase = () => {
        const cur_uid = uid();
        set(ref(db, `/${auth.currentUser.uid}/${cur_uid}`), {
            note: note,
            cur_uid: cur_uid,
        })
        setNote("");
    };


    return (
        <div>
            <h2>Notetaker</h2>
            <div>
                <input type="text" placeholder="add text" value={note} onChange={(e) => setNote(e.target.value)}></input>
                <button onClick={writeToDatabase}>add</button>
            </div>
        </div>
    )
}
