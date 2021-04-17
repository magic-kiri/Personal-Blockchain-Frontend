import './App.css';
import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import icon from './icon.png';
import { Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { getDefaultNormalizer } from '@testing-library/dom';
const fetch = require('node-fetch');

//modal style imported from materialui

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



async function postData(url, packet) {
  try {
    let res = await fetch('http://localhost:4000/' + url, {
      method: 'post',
      body: JSON.stringify(packet),
      headers: { 'Content-Type': 'application/json' }
    })

    return { statusCode: res.status, body: await res.json() };
  } catch (err) {
    // console.log(err) 
  }
}

async function getData(url) {
  let res = await fetch('http://localhost:4000/' + url);
  return { statusCode: res.status, body: await res.json() };
}

//main app function

function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openShowBlockchain, setOpenShowBlockchain] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openCredentials, setOpenCredential] = useState(false);
  const [openConfirmationSignIn, setOpenConfirmationSignIn] = useState(false);
  const [openConfirmationSignUp, setOpenConfirmationSignUp] = useState(false);
  const [openTransactionSuccess, setOpenTransactionSuccess] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sender, setSender] = useState("");
  const [reciever, setReciever] = useState("");
  const [info, setInfo] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      //login
      setUser(user);
    } else {
      //logout
      setUser(null);
    }

  }, [user, username]);



  const signUp = (event) => {
    event.preventDefault();

    setUser("user");

    setOpenConfirmationSignUp(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    setUser("user");

    setOpenConfirmationSignIn(false);
  }

  const signUpConfirmation = async (event) => {
    event.preventDefault();

    if (username !== "" && password !== "") {
      const packet = { username: username, password: password };
      let res = await postData('sign_up', packet);

      console.log(res.statusCode);

      setConfirmation(res.statusCode);

      console.log(confirmation);

      setOpenSignUp(false);
      setOpenConfirmationSignUp(true);
    }
  }

  const signInConfirmation = async (event) => {
    event.preventDefault();

    if (username !== "" && password !== "") {
      const packet = { username: username, password: password };
      let res = await postData('sign_in', packet);

      console.log(res.statusCode);

      setConfirmation(res.statusCode);

      console.log(confirmation);

      setOpenSignIn(false);
      setOpenConfirmationSignIn(true);
    }
  }

  const logOut = (event) => {
    event.preventDefault();

    setUser(null);
  }

  const transaction = (event) => {
    event.preventDefault();

    setSender(null);
    setReciever(null);
    setInfo(null);

    setOpenTransactionSuccess(false);
  }

  const transactionSuccess = async (event) => {
    event.preventDefault();

    if (sender !== "" && reciever !== "" && info !== "") {
      const packet = { sender: sender, reciever: reciever, info: info };
      let res = await postData('add_transaction', packet);

      setConfirmation(res.statusCode);

      setOpenTransaction(false);
      setOpenTransactionSuccess(true);
    }
  }

  const showBlockchain = (event) => {
    event.preventDefault();

    setOpenShowBlockchain(null);
  }

  const history = (event) => {
    event.preventDefault();

    setOpenHistory(null);
  }

  const userCredential = (event) => {
    event.preventDefault();

    setOpenCredential(null);
  }

  return (
    <div className="app">

      {/* modal for signup */}

      <Modal
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__form">
            <center>
              <img
                className="icon"
                src={icon}
                alt=""
                height="30"
                width="30"
              />
            </center>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button__modal" type="submit" onClick={signUpConfirmation}>Sign Up</button>
          </form>
        </div>
      </Modal>

      {/* modal for signin */}

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__form">
            <center>
              <img
                className="icon"
                src={icon}
                alt=""
                height="30"
                width="30"
              />
            </center>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button__modal" type="submit" onClick={signInConfirmation}>Sign In</button>
          </form>
        </div>
      </Modal>

      {/* modal for signup confirmation */}

      <Modal
        open={openConfirmationSignUp}
        onClose={() => setOpenConfirmationSignUp(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="app__form">
            {confirmation === 200
              ? <div className="app__form">
                <p className="text__modal">
                  You're signed up! {confirmation}
                </p>
                <button className="button__modal" type="submit" onClick={signUp}>Great!</button>
              </div>
              : <div className="app__form">
                <p className="text__modal">
                  Error {confirmation}.
                  This username is already taken. Try a new one.
                </p>
                <button className="button__modal" type="submit" onClick={() => setOpenConfirmationSignUp(false)} >Sorry!</button>
              </div>
            }

          </div>
        </div>
      </Modal>

      {/* modal for signin confirmation */}

      <Modal
        open={openConfirmationSignIn}
        onClose={() => setOpenConfirmationSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="app__form">
            {confirmation === 200
              ? <div className="app__form">
                <p className="text__modal">
                  You're logged in!
                </p>
                <button className="button__modal" type="submit" onClick={signIn}>Great!</button>
              </div>
              : <div className="app__form">
                <p className="text__modal">
                  Error {confirmation}.
                  Try again.
                </p>
                <button className="button__modal" type="submit" onClick={() => setOpenConfirmationSignIn(false)} >Oops!</button>
              </div>
            }

          </div>
        </div>
      </Modal>

      {/* modal for transaction */}

      <Modal
        open={openTransaction}
        onClose={() => setOpenTransaction(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__form">
            <Input
              type="text"
              label="multiline"
              multiline rows="1"
              variant="outlined"
              placeholder="Sender"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            />
            <Input
              type="text"
              label="multiline"
              multiline rows="1"
              variant="outlined"
              placeholder="Reciever"
              value={reciever}
              onChange={(e) => setReciever(e.target.value)}
            />
            <Input
              type="text"
              label="multiline"
              multiline rows="5"
              variant="outlined"
              placeholder="Description"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />

            <button className="button__modal" type="submit" onClick={transactionSuccess}>Add Transaction</button>
          </form>
        </div>
      </Modal>

      {/* modal for transaction success */}

      <Modal
        open={openTransactionSuccess}
        onClose={() => setOpenTransactionSuccess(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="app__form">
            {confirmation === 200
              ? <div className="app__form">
                <p className="text__modal">
                  Successfully added to transaction pool.
                </p>
                <button className="button__modal" type="submit" onClick={transaction}>Success!</button>
              </div>
              : <div className="app__form">
                <p className="text__modal">
                  Error {confirmation}.
                  Try again.
                </p>
                <button className="button__modal" type="submit" onClick={() => setOpenTransactionSuccess(false)} >Sorry!</button>
              </div>
            }
          </div>
        </div>
      </Modal>

      {/* modal for show blockchain */}

      <Modal
        open={openShowBlockchain}
        onClose={() => setOpenShowBlockchain(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="app__form">
            <p className="text__modal">
              This is where the Blockchain will be showed after retrieval.
            </p>
            <button className="button__modal" type="submit" onClick={showBlockchain}>Ok</button>
          </div>
        </div>
      </Modal>

      {/* modal for history */}

      <Modal
        open={openHistory}
        onClose={() => setOpenHistory(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="app__form">
            <p className="text__modal">
              Your transaction history.
            </p>
            <button className="button__modal" type="submit" onClick={history}>Ok</button>
          </div>
        </div>
      </Modal>

      {/* modal for user credentials */}

      <Modal
        open={openCredentials}
        onClose={() => setOpenCredential(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="app__form">
            <p className="text__modal">
              <b>Username</b> : {username}
            </p>
            <p className="text__modal">
              <b>Public Key</b> : Your Public Key
            </p>
            <p className="text__modal">
              <b>Private Key</b> : Your Private Key
            </p>

            <button className="button__modal" type="submit" onClick={userCredential}>Ok</button>
          </div>
        </div>
      </Modal>

      {/* webpage views */}

      <div className="app__image">
        <img
          className="image"
          src={logo}
          alt=""
        />
      </div>

      {user ? (
        <div className="body__button">
          <button className="button" onClick={() => setOpenTransaction(true)}>
            Request a Transaction
          </button>

          <button className="button" onClick={() => setOpenShowBlockchain(true)}>
            Show Blockchain
          </button>

          <button className="button" onClick={() => setOpenHistory(true)}>
            History
          </button>

          <button className="button" onClick={() => setOpenCredential(true)}>
            User Credentials
          </button>

          <button className="logout__button" onClick={logOut}>
            Log Out
          </button>
        </div>
      ) : (
        <div className="body__button">
          <p className="text">
            This is your very own Personal Blockchain running on your local network. Create a Wallet to get started. If you have an existing one, then just sign in!
          </p>

          <button className="button" onClick={() => setOpenSignUp(true)}>
            Create a New Wallet
            </button>

          <button className="button" onClick={() => setOpenSignIn(true)}>
            Use an Existing Wallet
            </button>
        </div>
      )
      }


    </div>
  );
}

export default App;
