import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD9jOxl6SbUqfCbxNDIK7-E3JA2YE2Kykk',
  authDomain: 'netflix-clone-b4e95.firebaseapp.com',
  projectId: 'netflix-clone-b4e95',
  storageBucket: 'netflix-clone-b4e95.appspot.com',
  messagingSenderId: '182988107370',
  appId: '1:182988107370:web:b1307d26f957694b2ba413'
}

const app = firebase.initializeApp(firebaseConfig)

export const auth = app.auth()
export const db = getFirestore(app)
