import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import pinkImg from './assets/pinkscape.png'
import './App.css'

// Socket.io Verbindung
import { io } from 'socket.io-client'
const socket = io("http://localhost:3000");

//Eingabefelder für bestehenden User und sein Passwort
function InputUsername() {
  return (
      <label htmlFor="username">Benutzername:</label>
  );
}
function InputPassword() {
  return (
      <label htmlFor="userpassword">Passwort:</label>
  );
}
function NewUsername() {
  return (
      <label htmlFor="newusername">Benutzername:</label>
  );
}
function NewUserPassword() {
  return (
      <label htmlFor="newuserpassword">Passwort (min. 8 Zeichen):</label>
  );
}
function RegisterForm() {
  function HandleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const newusername = form.elements.newusername.value;
    const newuserpassword = form.elements.newuserpassword.value;

    const userData = {
      username: newusername,
      password: newuserpassword,
    };

    console.log("JSON-Daten zum Senden:", userData);
    socket.emit("new user", userData);


  }


  return (
      <form onSubmit={HandleFormSubmit}>

        <h3>Noch keinen Benutzernamen?</h3>
        <h2>Geben Sie einen Benutzernamen und ein Passwort ein:</h2>

        <NewUsername />
        <input type="text" id="newusername" name="newusername" required />

        <NewUserPassword />
        <input type="password" id="newuserpassword" name="newuserpassword" minLength={8} required />

        <input type="submit" value="Registrieren" />
      </form>
  );
}



function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <section id="center">
          <div className="hero">


            <img src={pinkImg} className="pink" width="200" alt="Pink logo"/>
          </div>

          <div>
            <h1>321-Chat-App</h1>
            <h2>Geben Sie Ihren Benutzernamen und Ihr Passwort ein:</h2>
          </div>
          <InputUsername/>
          <input type="text" id="username" name="username" required/>
          <InputPassword/>
          <input type="password" id="userpassword" name="userpassword" minLength={8} required/>
          <input type="submit" value="Anmelden"/>
          <RegisterForm/>



        </section>



        <div className="ticks"></div>
        <section id="spacer"></section>
      </>
  )
}

export default App