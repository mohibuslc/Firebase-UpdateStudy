import {getAuth , signInWithPopup , GoogleAuthProvider} from "firebase/auth";
import  {useState} from 'react';
import './App.css';
import {  signOut } from "firebase/auth";


import firebaseApp from './firebaseConfig';
const auth = getAuth(firebaseApp);


function App() {

  const [user , setUser] = useState({

    isSignedIn: false,
    name:'',
    email:'',
    photo:'',

   });
   

  const handleClick = () =>{

    const provider = new GoogleAuthProvider()


    signInWithPopup (auth , provider)
    
   .then(res => {

     const {displayName, photoURL , email}= res.user;

    

      const signedInUser = {

        isSignedIn : true,
        name : displayName,
        email: email,
        photo:photoURL
      }

      setUser(signedInUser)

     console.log (displayName, photoURL , email);

   }).catch (err =>{


   });

  
  }

  const handleClickOut = ()=>{

    signOut(auth).then(() => {
      // Sign-out successful.

      const signOut ={

        isSignedIn : false,
        name: '',
        photo:'',
        email: ''
      }

      setUser(signOut);
      
    }).catch((error) => {
      // An error happened.
    });

  }


  return (
    <div className="App">
      <header>

      {  
      
      user.isSignedIn ? <button onClick ={handleClickOut}>Sign-Out</button> :

      <button onClick ={handleClick}>Sign-In</button>
    }

      {

        user.isSignedIn && <div className="center">
          
          <p>Welcome , Name : {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt=""></img>
 
        </div>
      }
      </header>
    </div>
  );
}

export default App;
