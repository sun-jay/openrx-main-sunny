import React from "react";
import userServices from "../firebase/userServices";
import { useState, useEffect } from "react";

export default function Home(props) {


  return (
    <div className="text-white w-screen h-screen ">

      <div className="hidden md:flex h-auto w-full">
        <div className="flex flex-col items-center justify-center w-8/12 h-full">
          <div className='text-6xl py-10 '>
            What is OpenRx?
          </div>
          <div id="vid" className=" w-full px-20 aspect-video">
            <iframe
              src="https://www.youtube.com/embed/_BUq-WnVlhU"
              frameborder=""
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

        </div>
        <div className="flex flex-col justify-center text-center mr-20 items-center">

          {props.user ? (
            <div className='text-6xl '>
              Hello, {props.user.displayName}
            </div>

          ) : (
            <div className='text-6xl  '>

              {/* create sign in button thats just text */}
              <p >
                <span onClick={props.signIn} className="p-2 cursor-pointer underline text-red-300">Sign In</span>
              </p>
              to get started

            </div>
          )}
        </div>
      </div>


      <div className="md:hidden flex flex-col h-full w-full">
        <div className="flex flex-col items-center justify-center w-full ">
          <div className='text-6xl text-center py-10 '>
            What is OpenRx?
          </div>
          <div id="vid" className=" w-full px-4 aspect-video">
            <iframe
              src="https://www.youtube.com/embed/_BUq-WnVlhU"
              frameborder=""
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

        </div>
        <div className="flex flex-col justify-center text-center pt-16 items-center">

          {props.user ? (
            <div className='text-6xl '>
              Hello, {props.user.displayName}
            </div>

          ) : (
            <div className='text-5xl px-2 '>

              {/* create sign in button thats just text */}
              <p >
                <span onClick={props.signIn} className="p-2 cursor-pointer	underline text-red-300">Sign In</span>
              </p>
              to get started
            </div>
          )}
        </div>
      </div>



    </div>
  );
}
