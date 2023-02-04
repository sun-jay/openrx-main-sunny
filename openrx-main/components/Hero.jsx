import React from "react";
import Socials from "./socials";
import Anim from "./Anim";
import Anim2 from "./Anim2";
import { FaArrowCircleDown } from "react-icons/fa";
import Project from "./Project";
import { useState, useEffect } from "react";
import Zoom from "react-reveal/Zoom"; // Importing Zoom effect


const hero = () => {
  return (
    <div className="flex flex-row items-end  justify-center md:h-screen bigh w-full">
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 h-screen w-full bg-auto md:bg-cover bg-fixed bg-center custom-img z -z-50"></div> */}
      <div className="bg_thatblack text-white flex flex-col items-center justify-center absolute -z-10 top-0 left-0 right-0 bottom-0 md:h-screen bigh w-full ">
        <div className="absoloute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
          <p className="linear-wipe m-2 max-[350px]:text-3xl text-4xl lg:text-6xl text-center z-10 text-white">
            Sunny-Jay.com
          </p>
          LOADING...
        </div>
      </div>
      {/* <div className="hidden md:absolute md:block top-0 left-0 right-0 bottom-0 bigh md:h-screen w-full ">
        <Anim/>
      </div> */}
      <div className="absolute  top-0 left-0 right-0 bottom-0 bigh md:h-screen w-full ">
        <Anim2 />
      </div>

      <div className="fade-d fade-m md:mt-0 mt-8 absolute top-0 left-0 right-0 bottom-0 grid place-items-center md:h-screen bigh  w-full ">
        <div className="items-center m-auto flex flex-col md:flex-row w-9/12  ">
          <div className="flex-col items-center w-9/12 md:w-4/12 ">
            <img className=" z-10" src="IMG_8285 2-modified (1).png" />
            {/* <div className = "mt-2 p-1 lg:bg-black lg:rounded-full lg:bg-opacity-50 lg:m-4 lg:border-black"> */}
            <div className="mt-2 p-1 lg:bg-black lg:rounded-full lg:bg-opacity-50 lg:m-4 lg:border-black">
              <Socials />
              {/* <p className="text-white">{String(isLoaded)}</p> */}
            </div>
          </div>

          <div class="w-full bg-black bg-opacity-80 rounded-lg md:w-8/12 mt-1 md:ml-8 m-2">
            <p className=" m-2 max-[350px]:text-3xl text-4xl lg:text-6xl text-center z-10 text-white">
              {/* Sunny-Jay.com */}
              <div className="linear-wipe">
              <TypeAnimation
                sequence={[
                  "Sunny-Jay.com", // Types 'One'
                  1000, // Waits 1s
                  "Personal Site", // Deletes 'One' and types 'Two'
                  1000, // Waits 2s
                  "Project Portfilio", // Types 'Three' without deleting 'Two'
                  1000,
                ]}
                wrapper="div"
                cursor={false}
                repeat={Infinity}
              />
              </div>
              
            </p>
            <div className="md:m-4  m-1 mt-5 mb-4">
              <p className="max-[360px]:text-xs text-xl text-center text-white	">
                Hi, I&#39;m Sunny Jayaram. I&#39;m a student at California High
                School going into Comp Sci. I enjoy playing the piano, coding,
                lifting, gaming, competing at hackathons, basketball, music
                production, and many other hobbies.
              </p>
            </div>
            <div className="md:m-4  m-1 mt-5 mb-4">
              <p className="max-[360px]:text-xs text-xl text-center text-white	">
                This website was coded from scratch using Next.js, React.js,
                TailWind CSS, and Spline 3D, and serves as a record of my
                progress in frontend development, while also documenting my
                other projects and achievements.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FaArrowCircleDown
        className="fade-d fade-m  pb-16 md:block hidden animate-[bounce_2s_ease-in-out_infinite]  text-white/70 select-none z-[2]"
        size={140}
        opacity={0.5}
      />
    </div>
  );
};

export default hero;
