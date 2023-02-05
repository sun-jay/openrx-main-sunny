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
      if (window.scrollY >= 20) {
        setColor("#1D1F1C");
        setTextColor("#ffffff");
      } else {
        setColor("transparent");
        setTextColor("#ffffff");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  return (<div>
    
      <div style={{ backgroundColor: `${color}` }} className="hidden md:block">
        <div
          className="flex flex-row justify-between text-xl"
          style={{ color: `${textColor}` }}
        >
          <Link className="p-10 px-10 inline-block" href="/">
            <h1
              style={{ color: `${textColor}` }}
              className="text-4xl font-semibold "
            >
              OpenRx
            </h1>
          </Link>
          <div className="">
            {props.user ? (
              <div className="inline-block p-12">
                <button onClick={props.signOut} className="">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="inline-block p-12 font-semibold">
                <button onClick={props.signIn} className="">
                  Sign In
                </button>
              </div>
            )}
            <div
              className={
                cur === "Home"
                  ? " my-5 py-3 px-8 inline-block bg-red-300 rounded-xl inline-block"
                  : "p-8 inline-block"
              }
            >
              <Link
                onClick={() => {
                  handleNav;
                  setCur("Home");
                }}
                href="/"
              >
                Home
              </Link>
            </div>
            <div
              className={
                cur === "Prescriptions"
                  ? "my-5 py-3 px-6 mx-2 bg-red-300 rounded-xl inline-block"
                  : "p-8 inline-block"
              }
            >
              <Link
                onClick={() => {
                  handleNav;
                  setCur("Prescriptions");
                }}
                href="/prescriptions"
              >
                My Prescriptions
              </Link>
            </div>
          </div>
          {/* <li className="p-4">
              <Link href="/work">Work</Link>
            </li>
            <li className="p-4">
              <Link href="/contact">Contact</Link>
            </li> */}
        </div>
      </div>
    <div>
      {/* make a simple mobile navbar that links to prescriptions and to home and to sign in*/}
      <div className="md:hidden bg-gray-500">
        <div className="flex flex-row justify-between text-xl">
          <Link className="p-4" href="/">
            <h1 className="text-4xl font-semibold">OpenRx</h1>
          </Link>
          <div className="p-4">
            <button onClick={handleNav}>
              {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
        {nav && (
          <div className="text-center">
            <div className="p-4">
              <Link href="/">Home</Link>
            </div>
            <div className="p-4">
              <Link href="/prescriptions">Prescriptions</Link>
            </div>
            <div className="p-4">
              {props.user ? (
                <button onClick={props.signOut}>Sign Out</button>
              ) : (
                <button onClick={props.signIn}>Sign In</button>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  </div>);
};

export default Navbar;
