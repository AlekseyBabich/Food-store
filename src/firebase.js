import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: 'AIzaSyDKOZvBFhPKQBq4B7lR3x-LeSdEceWw8Vo',
  authDomain: 'foodstore-153eb.firebaseapp.com',
  projectId: 'foodstore-153eb',
  storageBucket: 'foodstore-153eb.appspot.com',
  messagingSenderId: '670377177071',
  appId: '1:670377177071:web:e872cf2377cd1ce092901a',
  measurementId: 'G-JGS4CSK1GX'
}

const app = initializeApp(firebaseConfig)
getFirestore(app)


