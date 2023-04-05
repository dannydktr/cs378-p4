import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { uid } from 'uid';

export default function Notetake() {

    const [note, setNote] = useState('');
    const [listOfNotes, setListOfNotes] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUid, setTempUid] = useState('');

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
    const handleUpdate = (note) => {
        setIsEdit(true);
        setNote(note.note);
        setTempUid(note.cur_uid);
    }

    const handleEditConfirm = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUid}`), {
            note: note,
            cur_uid: tempUid,
        });
        setNote('');
        setIsEdit(false);
    }


    //delete
    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    }

    return (
        <div>
            <h2>Notetaker</h2>
            <div>
                <input type="text" placeholder="add text" value={note} onChange={(e) => setNote(e.target.value)}></input>
                {isEdit ? (<div>
                    <button onClick={handleEditConfirm}>confirm</button>
                </div>) :
                    (<div>
                        <button onClick={writeToDatabase}>add</button>
                    </div>)}
                {
                    listOfNotes.map(note => (
                        <div>
                            <li>{note.note}</li>
                            <button onClick={() => handleUpdate(note)}> update </button>
                            <button onClick={() => handleDelete(note.cur_uid)}> delete </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
