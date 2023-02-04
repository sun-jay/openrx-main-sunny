import React, { useEffect } from 'react'
import Projects_Header from '../components/Projects_Header'
import { useState } from 'react'
import { FaArrowCircleRight } from "react-icons/fa";
import userServices from '../firebase/userServices'
import { GrFormTrash } from "react-icons/gr";
import { AiOutlinePlusCircle } from "react-icons/ai"

const Prescriptions = (props) => {
    const [curMed, setCurMed] = useState(0)
    const [inp, setInp] = useState({ Name: "", Dosage: "", Frequency: "", Notes: "" })
    // const [userFB, setUserFB] = useState("");

    useEffect(() => {
        console.log(props.FBuser.prescriptions)
        if (props.FBuser.prescriptions !== undefined) {
        JSON.stringify(props.FBuser.prescriptions) == '[]' ? setCurMed("AddPrescription") : setCurMed(  props.FBuser.prescriptions[props.FBuser.prescriptions.length -1 ])  
        }
    }, [props.FBuser.prescriptions])

    // async function getUserFirebase(id) {
    //     const data = await userServices.getUser(id);
    //     var user = data.data();
    //     console.log(user)
    //     return user
    //   }

    // useEffect(async () => {  setUserFB(await getUserFirebase( props.FBuserID ))  }, [])

    // function to change the current medication
    var handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );

    };


    return (
        <div>
            <Projects_Header />
            <div className='w-screen h-screen flex flex-row'>
                <div class="relative overflow-auto w-4/12 ">
                    <div className="overflow-y-scroll h-full bg-red-300 flex flex-col">

                        {/* map list to jsx elemnts */}
                        <div onClick={() => setCurMed("AddPrescription")} className={curMed === "AddPrescription" ? 'hover:bg-lime-200 bg-lime-100 border-b-1 ease-in duration-100' : 'hover:bg-lime-200 bg-lime-300 border-b-1 ease-in duration-100'}   >

                            <div className='flex justify-between items-center px-4'>
                                <FaArrowCircleRight
                                    className={curMed === "AddPrescription" ? "text-gray-500 ease-in duration-300 " : "text-gray-500 ease-in duration-100 opacity-0 "}
                                    size={40}
                                    opacity={0}
                                />
                                <div className="flex items-center justify-center p-4  ">
                                    <div className='p-1'>Add Prescription</div>
                                    <AiOutlinePlusCircle size={25} className='' />
                                </div>
                                <FaArrowCircleRight
                                    className={curMed === "AddPrescription" ? "text-black-500 ease-in duration-300 " : "text-gray-500 ease-in duration-100 opacity-0 "}
                                    size={25}
                                    opacity={0.75}
                                />
                            </div>

                        </div>
                        {props.FBuser.prescriptions?.map((item) =>
                            <div onClick={() => setCurMed(item)} className={item.Name === curMed.Name ? 'border-b-2 bg-red-100 ease-in duration-300' : 'hover:bg-red-200 border-b linear duration-100'}  >
                                <div className="flex items-center justify-between p-4  ">
                                    {/* <img class="w-12 h-12 Prescriptions" src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" /> */}
                                    <div className="flex flex-col">
                                        <strong className="text-black-900 text-lg font-medium">{item.Name}</strong>
                                        <span className="text-black-500 text-sm font-medium">Medication</span>
                                    </div>

                                    <div className='flex items-center'>
                                        <div className='border-1 hover:bg-white rounded-full m-4 ease-in duration-100'>
                                            <GrFormTrash
                                                onClick={() => {
                                                    props.deletePrescription(item).then(() => {
                                                        setCurMed(JSON.stringify(props.FBuser.prescriptions) == '[]' ? "AddPrescription" : props.FBuser.prescriptions[0])
                                                    })
                                                }}
                                                size={40}
                                            />
                                        </div>
                                        <FaArrowCircleRight
                                            className={item.Name === curMed.Name ? "text-white ease-in duration-300 " : "text-white ease-in duration-100 opacity-0 "}
                                            size={40}
                                            opacity={1}
                                        />


                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
                <div className='w-8/12 h-screen text-center bg-gray-600 '>
                    {/* get type of a var */}
                    {/* {JSON.stringify( props.FBuser.prescriptions)} */}
                    {/* if curMed = "AddPrescrption", render a input field that when submitted calls a function that adds a new user in
                     firebase */}
                    {curMed === "AddPrescription" ?
                        <div className='text-5xl p-24 text-lime-300'>

                            {/* MAKE SURE TO ADD ON CHANGE UFNCTIONS HERE */}

                            <input className="m-4 p-2 rounded-lg" type="text" placeholder="Name of Prescription"
                                onChange={(e) => setInp({ ...inp, Name: e.target.value })}
                            />
                            <input className="m-4 p-2 rounded-lg" type="text" placeholder="Number of Pills"
                                onChange={(e) => setInp({ ...inp, Dosage: e.target.value })}
                            />
                            <input className="m-4 p-2 rounded-lg" type="text" placeholder="How many times a day"
                                onChange={(e) => setInp({ ...inp, Frequency: e.target.value })}
                            />
                            <input className="m-4 p-2 rounded-lg" type="text" placeholder="Notes"
                                onChange={(e) => setInp({ ...inp, Notes: e.target.value })}
                            />

                            {/* MAKE IT ADD JUST A STRING FOR NOWs */}
                            <div><button onClick={() => {
                                props.addPrescription(inp).then(() => {
                                    setCurMed(inp)
                                    handleReset()
                                    setInp('')
                                })
                            }
                            }>Add Prescription
                            </button></div>
                        </div>
                        :
                        <div>
                            <div className='text-5xl p-24 text-lime-300'> Medication: {curMed.Name}</div>
                            <div className='text-5xl p-24 text-lime-300'>Dosage: {curMed.Dosage == "1" ? curMed.Dosage + " Pill" :
                            curMed.Dosage?  curMed.Dosage + " Pills" : "No Information"}</div>
                        </div>
                        }
                        {/* {inp.Name} */}

                </div>
            </div>
        </div>

    )
}

export default Prescriptions