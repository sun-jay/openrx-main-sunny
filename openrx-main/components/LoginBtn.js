import React from 'react'

const Logout = () => {

    return (


        <button onClick={() =>removeCookie("user")} className="text-white bg-red-300 font-bold py-2 px-4 rounded-full">
            Logout
        </button>
    )
}

export default Logout