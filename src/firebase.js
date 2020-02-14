import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCgZWFqsFMofkbCuEhyAcuCF6Ef1nRBAw",
    authDomain: "react-morty.firebaseapp.com",
    databaseURL: "https://react-morty.firebaseio.com",
    projectId: "react-morty",
    storageBucket: "react-morty.appspot.com",
    messagingSenderId: "814543407240",
    appId: "1:814543407240:web:1546c4f0c0d34a29faf73d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//crear una base de datos


let db = firebase.firestore().collection('favorite')
//leer base de datos
export function getDateFirestore(iud) {
    return db.doc(iud).get()
        .then(snap => {
            return snap.data()
            console.log(snap.data().favoritos)
        }).catch(e => {
            console.log(e)
        })
}
//actualizar base de datos
export function upDateDB(array, iud) {
    console.log(array, iud)
    return db.doc(iud).set({ favoritos: [...array] })
}

//cierra la sesion de google
export let logOutGoogle = () => {
    return firebase.auth().signOut()
}
//sistema de logueo con google
export default function firebaseLogin() {
    //crea un objeto de tipo firebase.auth.GoogleAuthProvider
    let googleProvider = new firebase.auth.GoogleAuthProvider()
    //retornamos una promesaque al ser llamada activa el popup de google
    return firebase.auth().signInWithPopup(googleProvider)
        .then(snap => snap.user)
}
