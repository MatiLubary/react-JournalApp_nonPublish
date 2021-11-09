import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { googleAuthProvider } from '../components/firebase/firebase-config';
import {types} from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2'
import { noteLogout } from './notes';
 
export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) =>{

        dispatch (startLoading());
       
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
            
            dispatch (login(user.uid, user.displayName))

            dispatch (finishLoading());

        })
        .catch((error) => {
            console.log(error);
            Swal.fire("Error", error.message)
        })
    }
}


export const startRegEmailPwName = (email, password, name) => {

    return (dispatch) => {

        const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then( async({ user }) => {

            await updateProfile( user, { displayName: name });

            dispatch (login(user.uid, user.displayName))
        })

        .catch (e => {
            console.log(e);
            Swal.fire("Error", e.message)
        })
    }

}
 
export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}
 
export const login = (uid, displayName) =>(
    {
        type:types.login,
        payload: {
            uid,
            displayName
        }
    }
)

export const startLogout = () => {
    return async(dispatch) => {
        const auth = getAuth();
        await auth.signOut();

        dispatch(logout())
        dispatch(noteLogout())

    }
}

export const logout = () =>({
    type: types.logout
})