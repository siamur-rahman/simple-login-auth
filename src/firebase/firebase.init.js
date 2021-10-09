import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';


const inializeAuthentication = () => {
   initializeApp(firebaseConfig);
}

// const app = initializeApp(firebaseConfig);
export default inializeAuthentication;