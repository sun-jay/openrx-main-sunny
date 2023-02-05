import React from "react";
import userServices from "../firebase/userServices";
import { useState, useEffect } from "react";

export default function Home(props) {

  // const [FBuserID, setFBuserID] = useState([]); 
  // const [userDeats, setUserDeats] = useState("");

  // async function getIdFromUid() {
  //   const data = await userServices.getAllUsers()
  //   var FBusers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //   // console.log(FBusers[3].uid, props.user.uid );
  //   for (let FBuser of FBusers) {
  //     if (FBuser.uid === props.user.uid) {
  //       return FBuser.id;
  //     }
  //     console.log('no_match')
  //   }
  //   return null;
  // }
  // async function handleLoad() {
  //   if (props.user.uid) {
  //     var id = await getIdFromUid()

  //     if (id) {
  //       console.log("id valid");
  //       setFBuserID(id)

  //     } else {
  //       userServices.addUser({ uid: props.user.uid, name: props.user.displayName, email: props.user.email, photoURL: props.user.photoURL })
  //     }
  //   }
  // }



  // async function updatePrecription(){
  //   if await getUserData(props.user.uid)
  // }

  return (
    <div className="text-white w-screen h-screen ">
      {/* <p className="z-20 pt-24"></p> */}
      <div className="flex items-center justify-center w-full h-full">
        {props.user ? (
          <>
            {/* <div>Signed in as : {JSON.stringify(props.user.uid)}</div> */}
            {/* <div>FBuserID : {props.FBuserID}</div> */}
            {/* <div>{JSON.stringify(userDeats.prescriptions)}</div> */}
            {/* for prescription in prescriptions, return a unordered list element */}
            {/* <ul>{ userDeats.prescriptions?.map((prescription) => ( <li className="p-4">{prescription}</li> ))}</ul> */}


            <div className='text-6xl p-8 '>
              Hello, {props.user.displayName}
            </div>

          </>
        ) : (
          <div className='text-6xl  '>
            Please Sign In
          </div>
        )}
      </div>
    </div>
  );
}
