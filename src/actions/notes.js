import {db} from '../components/firebase/firebase-config';
import { collection, addDoc } from "firebase/firestore";
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import { doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';


//	https://api.cloudinary.com/v1_1/duutidqkf

// react-journal


export const startNewNote = () => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth


        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }




        const doc = await addDoc(collection(db, `${ uid }`, "journal/notes"), newNote);

        dispatch(activeNote(doc.id, newNote))
        dispatch(addNewNote(doc.id, newNote));
        
        document.querySelector(`[data-id="${doc.id}"]`).classList.add('animate__bounceInLeft')


    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

        document.querySelectorAll('.journal__entry').forEach(entry => {
            entry.classList.add('animate__fadeIn')
        })

    }
}


export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})


export const startSaveNote = (note) => {

    return async(dispatch, getState) => {
        const {uid} = getState().auth
     
        if(!note.url){
          delete note.url
        }
     
        const noteToFirestore = {...note}
        delete noteToFirestore.id
        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
        await updateDoc(noteRef,noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore));

        Swal.fire('Saved', note.title, 'success')

      }
}

export const refreshNote = (id, note) => ({

    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }

})

export const startUploading = (file) => {
    return async(dispatch, getState) => {

        const {active:activeNote} = getState().notes;

        Swal.fire({
            title: "Uploading...",
            text: "Please wait...",
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl =  await fileUpload(file);
        
        activeNote.url = fileUrl
        dispatch(startSaveNote(activeNote))

        Swal.close();


    }
}

export const startDeleteing = (id) => {
    return async(dispatch, getState) => {

        const uid = getState().auth.uid;
        const noteRef = doc(db, `${uid}/journal/notes/${id}`)
        await deleteDoc(noteRef);


        if (document.querySelector(`[data-id="${id}"]`).classList.contains('animate__fadeIn')) {
            document.querySelector(`[data-id="${id}"]`).classList.replace('animate__fadeIn', 'animate__bounceOutLeft')
        } else if (document.querySelector(`[data-id="${id}"]`).classList.contains('animate__bounceInLeft')) {
            document.querySelector(`[data-id="${id}"]`).classList.replace('animate__bounceInLeft', 'animate__bounceOutLeft')
        }
 
        setTimeout(() => {
            dispatch(deleteNote(id));
        }, 350);
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({

    type: types.notesLogoutCleaning,
})

