import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase/clientApp.js"
import userServices from "../firebase/userServices";



export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [FBuser, setFBuser] = useState("base");


  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const signIn = () => {
    auth.signInWithPopup(provider)
  };
  const signOut = () => {
    auth.signOut()
    setFBuser("base")
  };

  // delete spesific prescription from FBuser.prescriptions, get new users from FB to update state
  async function deletePrescription(prescription) {
    console.log("d", FBuser) 
    console.log("delete", prescription)
    var testarr = ["Fish Oil", "Vitamins", "Test", "Test2","Fish Oil1", "Vitamins1", "Test1", "Test21"]
    var newPrescriptions = FBuser.prescriptions.filter((p) => p.Name !== prescription.Name)
    console.log("newPrescriptions", prescription)
    await userServices.updateUser(FBuser.id, { prescriptions: newPrescriptions })
    // await userServices.updateUser(FBuser.id, { prescriptions: ["Fish Oil", "Vitamins", "Test", "Test2","Fish Oil1", "Vitamins1", "Test1", "Test21"] })
    // var u = await getUserFirebase(FBuser.id)
    // setFBuser(u)
    return getUserFirebase(FBuser.id).then( (u) => {
      setFBuser(u)
      return u
    })
  }

  // add prescription to FBuser.prescriptions, get new prescritption from getUserFirebase and update state
  async function addPrescription(prescription) {
    var newPrescriptions = FBuser.prescriptions.concat(prescription)
    await userServices.updateUser(FBuser.id, { prescriptions: newPrescriptions })
    // var u = await getUserFirebase(FBuser.id)
    // setFBuser(u)
    return getUserFirebase(FBuser.id).then( (u) => {
      setFBuser(u)
      return u
    })
  }
    


  async function getUserFirebase(id) {
    const data = await userServices.getUser(id);
    console.log("TeSTER", data.id)
    // var user_raw = data.data();
    var user = { ...data.data(), id: data.id }
    return user
  }
  async function getFBFromUid() {
    const data = await userServices.getAllUsers()
    var FBusers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // console.log(FBusers[3].uid, user.uid );
    for (let FBuser of FBusers) {
      if (FBuser.uid === user.uid) {
        return FBuser;
      }
      console.log('no_match')
    }
    return null;
  }
  async function handleLoad() {
    if (user) {
      var FB = await getFBFromUid()
      if (FB) {
        setFBuser(FB)
      } else {
        userServices.addUser({ uid: user.uid, name: user.displayName, email: user.email, photoURL: user.photoURL, prescriptions: [] })
      }
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (u) => {
      setUser(u);
      // u != null? handleLoad():setFBuser(undefined)
    });
  }, []);

  useEffect(() => { handleLoad() }, [user])


  return (
    <div className="bg_thatblack	sb_center">
      {/* <Analytics /> */}
      <Head>
        <title>Sunny Jayaram</title>
        <meta name="description" content="Sunny Jayaram's Webside " />
        <link rel="icon" href="IMG_8285 2-modified (1).png" />
      </Head>
      <Navbar
        db={db}
        user={user}
        handleLoad={handleLoad}
        FBuser={FBuser}
        signIn={signIn}
        signOut={signOut}
      />
      <Component
        {...pageProps}
        db={db}
        user={user}
        handleLoad={handleLoad}
        FBuser={FBuser}
        signIn={signIn}
        signOut={signOut}
        deletePrescription={deletePrescription}
        addPrescription={addPrescription}
      />
    </div>
  );
}
