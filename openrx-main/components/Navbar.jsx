import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import LogoutBtn from "./LogoutBtn";

const Navbar = (props) => {
    const [nav, setNav] = useState(false);
    const [cur, setCur] = useState("Home");
    const [color, setColor] = useState("transparent");
    const [textColor, setTextColor] = useState("white");

    const handleNav = () => {
        setNav(!nav);
      };
    
    useEffect(() => {
      const changeColor = () => {
        if (window.scrollY >= 90) {
          setColor('#1D1F1C');
          setTextColor('#ffffff');
        } else {
          setColor('transparent');
          setTextColor('#ffffff');
        }
      };
      window.addEventListener('scroll', changeColor);
    }, []);

  return (
    <div style={{ backgroundColor: `${color}` }} className="fixed left-0 top-0 w-full z-20 ease-in duration-300">
      <div className=" m-auto flex md:justify-between justify-between items-center p-4 text-white">
        <Link className = "md:block hidden " href="/">
          <h1 style={{ color: `${textColor}` }} className="text-4xl">Medication</h1>
        </Link>
        <ul style={{ color: `${textColor}` }} className="hidden md:flex items-center">

          {props.user ? (
          <li className="p-4">
            <button onClick={props.signOut} className="text-white bg-red-300  py-2 px-4 rounded-full">
            Sign Out
             
            </button>
          </li>) : (
            <li className="p-4">
              <button onClick={props.signIn} className="text-white bg-red-300  py-2 px-4 rounded-full">
              Sign In With Google
              </button>
            </li>
          )}


          <li className={cur === "Home"? "p-4 font-bold	ease-in duration-100": "p-4 ease-in duration-100"}>
            <Link onClick={()=>{handleNav; setCur('Home')}} href="/">Home</Link>
          </li>
          <li className={cur === "Prescriptions"? "p-4 font-bold	ease-in duration-100": "p-4 ease-in duration-100"}>
            <Link onClick={()=>{handleNav; setCur('Prescriptions')}} href="/prescriptions">My Prescriptions</Link>
          </li>
          {/* <li className="p-4">
            <Link href="/work">Work</Link>
          </li>
          <li className="p-4">
            <Link href="/contact">Contact</Link>
          </li> */}
        </ul>
        <div className="block md:hidden">Medication</div>
        <div onClick={handleNav} className='block md:hidden z-10'>
          {nav ? (
            <AiOutlineClose size={20} style={{ color: nav ? '#ffffff': `${textColor}`   } } />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
          )}
        </div>
        {/* mobile */}
        <div 
          className={
            nav
              ? "md:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-200"
              : "md:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-200"
          } 
        >
          <ul>
            <li className={cur === "Home"? "font-bold p-4 text-4xl hover:text-gray-500": "p-4 text-4xl hover:text-gray-500"}>
              <Link onClick={()=>{handleNav(); setCur('Home');}} href="/">Home</Link>
            </li>
            <li className={cur === "Prescriptions"? "font-bold p-4 text-4xl hover:text-gray-500": "p-4 text-4xl hover:text-gray-500"}>
              <Link onClick={()=>{handleNav(); setCur('Prescriptions');}} href="/Prescriptions">Prescriptions</Link>
            </li>
            {/* <li className="p-4 text-4xl hover:text-gray-500">
              <Link href="/work">Work</Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href="/contact">Contact</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
