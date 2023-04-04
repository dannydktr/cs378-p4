import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import {set, ref, onValue, remove} from 'firebase/database';
import { uid } from 'uid';

export default function Notetake() {

    const [note, setNote] = useState('');
    const [listOfNotes, setListOfNotes] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {
                    setListOfNotes([]);
                    const data = snapshot.val();
                    if (data != null) {
                        Object.values(data).map(note => {
                            setListOfNotes((oldArray) => [...oldArray, note]);
                        })
                    }
                })                
            }
        })
    }, []);


    const writeToDatabase = () => {
        const cur_uid = uid();
        set(ref(db, `/${auth.currentUser.uid}/${cur_uid}`), {
            note: note,
            cur_uid: cur_uid,
        })
        setNote("");
    };

    //update


    //delete
    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
    }

    return (
        <div>
            <h2>Notetaker</h2>
            <div>
                <input type="text" placeholder="add text" value={note} onChange={(e) => setNote(e.target.value)}></input>
                <button onClick={writeToDatabase}>add</button>
                {
                    listOfNotes.map(note => (
                        <div>
                            <li>{note.note}</li>
                            <button> update </button>
                            <button onClick={() => handleDelete(note.cur_uid)}> delete </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
