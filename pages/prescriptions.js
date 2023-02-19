import React, { useEffect } from "react";
import Projects_Header from "../components/Projects_Header";
import { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import userServices from "../firebase/userServices";
import { GrFormTrash } from "react-icons/gr";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/clientApp";
import { get } from "http";

const randomstring = require("randomstring");

const Prescriptions = (props) => {
  const [curMed, setCurMed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(true)

  const handleList = () => {
    setList(!list)
  }


  const [inp, setInp] = useState({
    Name: "",
    Dosage: "",
    Frequency: "",
    Notes: "",
    FilePath: "",
  });

  return (
    props.user ? (<div >
      <div className=" hidden md:block w-full h-screen overflow-hidden">
        {/* <Projects_Header /> */}
        <div className="flex-row flex flex-auto w-full h-full border-t-2">
          <MedList curMed={curMed} setCurMed={setCurMed} props={props} />
          <div className=" h-screen w-8/12 inline-block bg-gray-700 ">
            <div className="w-full inline text-center">
              {/* get type of a var */}
              {/* {JSON.stringify( props.FBuser.prescriptions)} */}
              {/* if curMed = "AddPrescrption", render a input field that when submitted calls a function that adds a new user in
                       firebase */}
              {loading === true ? (
                <div className="flex items-center justify-center text-red-300 w-full h-full">
                  <div>
                    <div class="lds-heart">
                      <div></div>
                    </div>
                    <div className="text-3xl font-semibold text-red-300">
                      Reading Text . . . Collecting Data . . . Retrieving
                      Information . . .{" "}
                    </div>
                  </div>
                </div>
              ) : curMed === "AddPrescription" ? (
                <ManualOrImage
                  inp={inp}
                  setInp={setInp}
                  curMed={curMed}
                  setCurMed={setCurMed}
                  props={props}
                  loading={loading}
                  setLoading={setLoading}
                />
              ) : (
                <>
                  <DisplayMed curMed={curMed} />
                </>
              )}
              {/* {inp.Name} */}
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE VIEW */}
      <div className=" md:hidden">
        {/* create version of this page that fits on mobile */}
        {/* <Projects_Header /> */}
        <div className="flex-row flex flex-auto w-full h-full border-t-2">
          <div onClick={() => handleList()} className={list ? "absolute top-0 left-0 right-0 bottom-0 w-screen h-screen ease-in duration-200" : "absolute top-0 left-[-100%] right-0 bottom-0 w-screen h-screen ease-in duration-200"}  >
            <MedListMob curMed={curMed} setCurMed={setCurMed} props={props} />
          </div>
          <div className=" h-screen w-full inline-block bg-gray-700 ">
            <div className="w-full inline text-center">
              {/* get type of a var */}
              {/* {JSON.stringify( props.FBuser.prescriptions)} */}
              {/* if curMed = "AddPrescrption", render a input field that when submitted calls a function that adds a new user in
                       firebase */}
              {loading === true ? (
                <div className="flex items-center justify-center text-red-300 w-full h-full">
                  <div>
                    <div class="lds-heart">
                      <div></div>
                    </div>
                    <div className="text-3xl font-semibold text-red-300">
                      Reading Text . . . Collecting Data . . . Retrieving
                      Information . . .{" "}
                    </div>
                  </div>
                </div>
              ) : curMed === "AddPrescription" ? (
                <ManualOrImageMob
                  handleList={handleList}
                  inp={inp}
                  setInp={setInp}
                  curMed={curMed}
                  setCurMed={setCurMed}
                  props={props}
                  loading={loading}
                  setLoading={setLoading}
                />
              ) : (
                <>
                  <DisplayMedMob curMed={curMed} handleList={handleList} />
                </>
              )}
              {/* {inp.Name} */}
            </div>
          </div>
        </div>

      </div>
    </div>) :
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div className='text-5xl px-2 text-center text-white'>
          {/* create sign in button thats just text */}
          <p >
            <span onClick={props.signIn} className="p-2 cursor-pointer	underline text-red-300">Sign In</span>
          </p>
          to manage prescriptions
        </div>
      </div>
  );
};

const ManualOrImage = ({
  inp,
  setInp,
  curMed,
  setCurMed,
  props,
  loading,
  setLoading,
}) => {
  const [uploadType, setUploadType] = useState("manual");

  return (
    <div className="flex-row flex-center text-white font-semibold text-lg ">
      <div className="mt-10 mx-5 inline-block">
        <button
          className={
            uploadType == "manual"
              ? "border-2 bg-gray-900 px-16 py-5 rounded-xl"
              : "border-2 px-16 py-5 rounded-xl"
          }
          onClick={() => setUploadType("manual")}
        >
          Manual Input
        </button>
      </div>
      <div className="inline-block mx-5 mt-10">
        <button
          className={
            uploadType == "image"
              ? "border-2 bg-gray-900 px-16 py-5 rounded-xl"
              : "border-2 px-16 py-5 rounded-xl"
          }
          onClick={() => setUploadType("image")}
        >
          Image Input
        </button>
      </div>
      {uploadType === "manual" ? (
        <AddMedManual
          inp={inp}
          setInp={setInp}
          curMed={curMed}
          setCurMed={setCurMed}
          props={props}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <Upload
          props={props}
          curMed={curMed}
          setInp={setInp}
          setCurMed={setCurMed}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};
const ManualOrImageMob = ({
  handleList,
  inp,
  setInp,
  curMed,
  setCurMed,
  props,
  loading,
  setLoading,
}) => {
  const [uploadType, setUploadType] = useState("manual");

  return (
    <div className="flex-row flex-center text-white font-semibold text-lg ">



      <div className="mt-15 mx-5 mt-5 ">
        <button
          className={
            uploadType == "manual"
              ? "border-2 bg-gray-900 px-16 py-5 rounded-xl"
              : "border-2 px-16 py-5 rounded-xl"
          }
          onClick={() => handleList()}
        >
          Back
        </button>
      </div>
      <div className="mt-5 mx-5 ">
        <button
          className={
            uploadType == "manual"
              ? "border-2 bg-gray-900 px-16 py-5 rounded-xl"
              : "border-2 px-16 py-5 rounded-xl"
          }
          onClick={() => setUploadType("manual")}
        >
          Manual Input
        </button>
      </div>
      <div className="inline-block mx-5 mt-5">
        <button
          className={
            uploadType == "image"
              ? "border-2 bg-gray-900 px-16 py-5 rounded-xl"
              : "border-2 px-16 py-5 rounded-xl"
          }
          onClick={() => setUploadType("image")}
        >
          Image Input
        </button>
      </div>
      {uploadType === "manual" ? (
        <AddMedManualMob
          inp={inp}
          setInp={setInp}
          curMed={curMed}
          setCurMed={setCurMed}
          props={props}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <UploadMob
          props={props}
          curMed={curMed}
          setInp={setInp}
          setCurMed={setCurMed}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

const DisplayMed = ({ curMed }) => {
  return (
    <div className="w-full text-left ">
      <div>
        <div className="text-6xl border-b-2 border-gray-500 tracking-wide  mx-8 p-10 text-white">
          {" "}
          {curMed.Name}
        </div>
        <div>
          <div className="flex border-b-2 flex-row  h-full mx-8 border-gray-500 ">
            {curMed.filePath ? (
              <img src={curMed.filePath} className="rounded-xl w-3/12 m-10" />
            ) : (
              <div></div>
            )}
            <div className="flex flex-col pr-5 w-8/12  my-8">
              <div className="text-xl my-10 text-white">
                Dosage:{" "}
                {curMed.Dosage == "1"
                  ? curMed.Dosage + " Pill"
                  : curMed.Dosage
                    ? curMed.Dosage + " Pills"
                    : "No Information"}
              </div>
              <div className="text-xl   text-white inline-block">
                Frequency: {curMed.Frequency} a Day
              </div>
              <div className="text-xl   text-white inline-block">
                Notes: {curMed.Notes}
              </div>
            </div>
            <div className="text-white p-5 border-l-2 border-gray-500">
              {curMed.Description ? (
                <div>
                  <h3 className="text-xl font-semibold ">Description</h3>
                  <p className="pb-4">
                    {
                      JSON.parse(curMed.Description)[
                      "Description/what it treats"
                      ]
                    }
                  </p>
                  <h3 className="text-xl font-semibold ">Side Effects</h3>
                  <p>{JSON.parse(curMed.Description)["Side effects"]}</p>
                </div>
              ) : (
                <p></p>
              )}
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const DisplayMedMob = ({ curMed, handleList }) => {
  return (
    // make a left arrow


    <div className="w-full text-left ">
      <div>
        <div className="text-5xl border-b-2 border-gray-500 mx-auto p-10 text-center text-white">
          <div className="flex justify-center items-center w-full">
            <div className="px-2 text-red-300">
              <FaArrowCircleLeft
                onClick={() => { handleList() }}
                size={40} />
            </div>
            <div className="px-2">{curMed.Name}</div>
          </div>
        </div>
        <div>
          <div className="flex border-b-2 flex-row  h-full mx-8 border-gray-500 ">

            <div className="flex flex-col pr-5 w-8/12  my-8">
              <div className="text-xl my-4 text-white">
                <p>Dosage:{" "}</p>
                <p>
                  {curMed.Dosage == "1"
                    ? curMed.Dosage + " Pill"
                    : curMed.Dosage
                      ? curMed.Dosage + " Pills"
                      : "No Information"}
                </p>
              </div>
              <div className="text-xl my-4  text-white inline-block">
                Frequency: {curMed.Frequency} a Day
              </div>
              <div className="text-xl my-4  text-white inline-block">
                Notes: {curMed.Notes}
              </div>
            </div>
            <div className="text-white p-5 border-l-2 border-gray-500">
              {curMed.Description ? (
                <div>
                  <h3 className="text-xl font-semibold ">Description</h3>
                  <p className="pb-4">
                    {
                      JSON.parse(curMed.Description)[
                      "Description/what it treats"
                      ]
                    }
                  </p>
                  <h3 className="text-xl font-semibold ">Side Effects</h3>
                  <p>{JSON.parse(curMed.Description)["Side effects"]}</p>
                </div>
              ) : (

                <p></p>
              )}
              <p></p>

            </div>
          </div>
        </div>
      </div>
      {curMed.filePath ? (
        <img src={curMed.filePath} className="rounded-xl w-3/12  m-10" />
      ) : (
        <div></div>
      )}
    </div>
  );
};

const AddMedManual = ({ inp, setInp, curMed, setCurMed, props }) => {
  var handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };
  return (
    <div className="w-full">
      {curMed === "AddPrescription" ? (
        <div className="text-3xl   w-full p-5 text-gray-800">
          {/* MAKE SURE TO ADD ON CHANGE UFNCTIONS HERE */}

          <input
            className="m-4 p-4 w-9/12 text-center rounded-xl"
            type="text"
            placeholder="Name of Prescription"
            onChange={(e) => setInp({ ...inp, Name: e.target.value })}
          />
          <input
            className="m-4 p-4 w-9/12 text-center rounded-xl"
            type="text"
            placeholder="Number of Pills"
            onChange={(e) => setInp({ ...inp, Dosage: e.target.value })}
          />
          <input
            className="m-4 p-4 w-9/12 text-center rounded-xl"
            type="text"
            placeholder="How many times a day"
            onChange={(e) => setInp({ ...inp, Frequency: e.target.value })}
          />
          <input
            className="m-4 p-4 w-9/12 text-center rounded-xl"
            type="text"
            placeholder="Notes"
            onChange={(e) => setInp({ ...inp, Notes: e.target.value })}
          />

          {/* MAKE IT ADD JUST A STRING FOR NOWs */}
          <div>
            <button
              className="text-white border-4 font-bold rounded-lg p-4 m-10 hover:bg-red-300"
              onClick={() => {
                props.addPrescription(inp).then(() => {
                  setCurMed(inp);
                  handleReset();
                  setInp("");
                });
              }}
            >
              Add Prescription
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
const AddMedManualMob = ({ inp, setInp, curMed, setCurMed, props }) => {
  var handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };
  return (
    <div className="w-full ">
      {curMed === "AddPrescription" ? (
        <div className="text-3xl   w-full p-5 text-gray-800">
          {/* MAKE SURE TO ADD ON CHANGE UFNCTIONS HERE */}

          <input
            className="m-2 p-2 w-9/12 text-center rounded-xl"
            type="text"
            placeholder="Name of Prescription"
            onChange={(e) => setInp({ ...inp, Name: e.target.value })}
          />
          <input
            className="m-2 p-2 w-9/12 text-center rounded-xl"
            type="text"
            placeholder="Number of Pills"
            onChange={(e) => setInp({ ...inp, Dosage: e.target.value })}
          />
          <input
            className="m-2 p-2 w-9/12 text-center rounded-xl"
            type="text"
            placeholder="How many times a day"
            onChange={(e) => setInp({ ...inp, Frequency: e.target.value })}
          />
          <input
            className="m-2 p-2 w-9/12 text-center rounded-xl"
            type="text"
            placeholder="Notes"
            onChange={(e) => setInp({ ...inp, Notes: e.target.value })}
          />

          {/* MAKE IT ADD JUST A STRING FOR NOWs */}
          <div>
            <button
              className="text-white border-4 font-bold rounded-lg p-4 m-10 hover:bg-red-300"
              onClick={() => {
                props.addPrescription(inp).then(() => {
                  setCurMed(inp);
                  handleReset();
                  setInp("");
                });
              }}
            >
              Add Prescription
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};


const MedList = ({ curMed, setCurMed, props }) => {
  useEffect(() => {
    // console.log(props.FBuser.prescriptions);
    if (props.FBuser.prescriptions !== undefined) {
      JSON.stringify(props.FBuser.prescriptions) == "[]"
        ? setCurMed("AddPrescription")
        : setCurMed(
          props.FBuser.prescriptions[props.FBuser.prescriptions.length - 1]
        );
    }
  }, [props.FBuser.prescriptions]);

  return (
    <div class="relative  border-r-2 overflow-auto h-screen w-4/12 inline-block h-full text-white  ">
      <div className="h-full bg-black-300 flex flex-col">
        {/* map list to jsx elemnts */}
        <div
          onClick={() => setCurMed("AddPrescription")}
          className={
            curMed === "AddPrescription"
              ? "hover:bg-gray-900 bg-gray-800 border-b-2 border-neutral-700 ease-in duration-100 py-1 "
              : "hover:bg-gray-900 bg-black-800 border-b-2 ease-in border-neutral-700 duration-100 py-1"
          }
        >
          <div className="flex justify-between font-semibold items-center px-4">
            <FaArrowCircleRight
              className={
                curMed === "AddPrescription"
                  ? "text-gray-500 ease-in duration-300 "
                  : "text-gray-500 ease-in duration-100 opacity-0 "
              }
              size={40}
              opacity={0}
            />
            <div className="flex items-center justify-center p-4  ">
              <div className="p-1">Add Prescription</div>
              <AiOutlinePlusCircle size={25} className="" />
            </div>
            <FaArrowCircleRight
              className={
                curMed === "AddPrescription"
                  ? "text-black-500 ease-in duration-300 "
                  : "text-gray-500 ease-in duration-100 opacity-0 "
              }
              size={25}
              opacity={0.75}
            />
          </div>
        </div>
        {props.FBuser.prescriptions?.map((item, index) => (
          <div
            key={index}
            onClick={() => setCurMed(item)}
            className={
              item.Name === curMed.Name
                ? " border-b-2 bg-gray-600 ease-in duration-300 text-red-300"
                : "hover:bg-gray-700  border-b linear duration-100 "
            }
          >
            <div className="flex items-center justify-between p-4  ">
              {/* <img class="w-12 h-12 Prescriptions" src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" /> */}
              <div className="flex flex-col">
                <strong className="text-black-900 font-bold text-lg font-medium">
                  {item.Name}
                </strong>
                <span className="text-black-500 text-sm font-medium ">
                  <button onClick={() => {
                    props.sendTwilio(item.Name).then
                    console.log(item.Name)
                  }}>Remind Me</button>
                </span>
              </div>

              <div className="flex items-center">
                <div className="border-1  hover:bg-white rounded-full m-4 ease-in duration-100">
                  <GrFormTrash
                    className="text-white"
                    onClick={() => {
                      props.deletePrescription(item).then(() => {
                        setCurMed(
                          JSON.stringify(props.FBuser.prescriptions) == "[]"
                            ? "AddPrescription"
                            : props.FBuser.prescriptions[0]
                        );
                      });
                    }}
                    size={40}
                  />
                </div>
                <FaArrowCircleRight
                  className={
                    item.Name === curMed.Name
                      ? "text-black ease-in duration-300  "
                      : "text-black ease-in duration-100 opacity-0 "
                  }
                  size={40}
                  opacity={1}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const MedListMob = ({ curMed, setCurMed, props }) => {
  useEffect(() => {
    // console.log(props.FBuser.prescriptions);
    if (props.FBuser.prescriptions !== undefined) {
      JSON.stringify(props.FBuser.prescriptions) == "[]"
        ? setCurMed("AddPrescription")
        : setCurMed(
          props.FBuser.prescriptions[props.FBuser.prescriptions.length - 1]
        );
    }
  }, [props.FBuser.prescriptions]);

  return (
    <div class="relative overflow-auto h-full w-full text-white bg_thatblack ">
      <div className="h-full bg-black-300 flex flex-col">
        {/* map list to jsx elemnts */}
        <div
          onClick={() => setCurMed("AddPrescription")}
          className={
            curMed === "AddPrescription"
              ? "hover:bg-gray-900 bg-gray-800 border-b-2 border-neutral-700 ease-in duration-100 py-1 "
              : "hover:bg-gray-900 bg-black-800 border-b-2 ease-in border-neutral-700 duration-100 py-1"
          }
        >
          <div className="flex justify-between font-semibold items-center px-4">
            <FaArrowCircleRight
              className={
                curMed === "AddPrescription"
                  ? "text-gray-500 ease-in duration-300 "
                  : "text-gray-500 ease-in duration-100 opacity-0 "
              }
              size={40}
              opacity={0}
            />
            <div className="flex items-center justify-center p-4  ">
              <div className="p-1">Add Prescription</div>
              <AiOutlinePlusCircle size={25} className="" />
            </div>
            <FaArrowCircleRight
              className={
                curMed === "AddPrescription"
                  ? "text-black-500 ease-in duration-300 "
                  : "text-gray-500 ease-in duration-100 opacity-0 "
              }
              size={25}
              opacity={0.75}
            />
          </div>
        </div>
        {props.FBuser.prescriptions?.map((item, index) => (
          <div
            key={index}
            onClick={() => setCurMed(item)}
            className={
              item.Name === curMed.Name
                ? " border-b-2 bg-gray-600 ease-in duration-300 text-red-300"
                : "hover:bg-gray-700  border-b linear duration-100 "
            }
          >
            <div className="flex items-center justify-between p-4  ">
              {/* <img class="w-12 h-12 Prescriptions" src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" /> */}
              <div className="flex flex-col">
                <strong className="text-black-900 font-bold text-lg font-medium">
                  {item.Name}
                </strong>
                <span className="text-black-500 text-sm font-medium">
                  <button onClick={() => {
                    (props.sendTwilio())
                    // console.log(item.Name)
                  }
                  }>Remind Me</button>
                </span>
              </div>

              <div className="flex items-center">
                <div className="border-1  hover:bg-white rounded-full m-4 ease-in duration-100">
                  <GrFormTrash
                    className="text-white"
                    onClick={() => {
                      props.deletePrescription(item).then(() => {
                        setCurMed(
                          JSON.stringify(props.FBuser.prescriptions) == "[]"
                            ? "AddPrescription"
                            : props.FBuser.prescriptions[0]
                        );
                      });
                    }}
                    size={40}
                  />
                </div>
                <FaArrowCircleRight
                  className={
                    item.Name === curMed.Name
                      ? "text-black ease-in duration-300  "
                      : "text-black ease-in duration-100 opacity-0 "
                  }
                  size={40}
                  opacity={1}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Upload = ({ props, setCurMed, setInp, loading, setLoading }) => {
  var handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  // State to store uploaded file
  const [file, setFile] = useState("");
  const [data, setData] = useState();
  const [imageUrl, setImageUrl] = useState();

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  getDownloadURL(
    ref(storage, "/files/Screen Shot 2023-02-02 at 11.26.40 PM.png")
  )
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // Or inserted into an <img> element
      const img = document.getElementById("myimg");
      img.setAttribute("src", url);
    })
    .catch((error) => {
      // Handle any errors
    });

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }
    var filePath = "/files/" + randomstring.generate() + ".jpeg";
    const storageRef = ref(storage, filePath);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    var urlPromise;
    setLoading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // console.log(url);
          const response = fetch("/api/img_parse", {
            method: "POST",
            body: url,
          });
          response.then((response) => {
            response.json().then((json) => {
              json = JSON.parse(json);
              // console.log("JSON: " + json);
              const desc = fetch("/api/gpt_description", {
                method: "POST",
                body: json["Name of Drug(short name)"],
              });
              desc.then((desc) => {
                desc.json().then((desc) => {
                  desc = JSON.parse(desc);
                  // console.log("DESCRPTION", desc);
                  var inp = {
                    Name: json["Name of Drug(short name)"],
                    Dosage: json["how many to take in a dose"],
                    Frequency: json["how many doses to take in a day"],
                    Notes:
                      json[
                      "any extra notes such as take by mouth or with food"
                      ],
                    filePath: url,
                    Description: JSON.stringify(desc),
                  };
                  props.addPrescription(inp).then(() => {
                    setCurMed(inp);
                    handleReset();
                    setInp("");
                    setLoading(false);
                  });
                });
              });
            });
          });
        });
        // .then((json) => {
        //   console.log("DATA:" + json);
        // });
      }
    );
  };

  return (
    <div className="">
      <div className="flex-col flex mt-16 border-t-2 border-gray-500">
        <p className="m-10 text-5xl">Upload Picture of Your Perscription</p>
        <input
          type="file"
          onChange={handleChange}
          className="m-auto border-2 text-xl border-gray-500 text-center rounded-lg p-5 "
        ></input>
        <button
          className=" bg-gray-900 mt-24 w-3/12 text-xl rounded-xl py-2 mx-auto hover:bg-red-300"
          onClick={handleUpload}
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};
const UploadMob = ({ props, setCurMed, setInp, loading, setLoading }) => {
  var handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  // State to store uploaded file
  const [file, setFile] = useState("");
  const [data, setData] = useState();
  const [imageUrl, setImageUrl] = useState();

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  getDownloadURL(
    ref(storage, "/files/Screen Shot 2023-02-02 at 11.26.40 PM.png")
  )
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // Or inserted into an <img> element
      const img = document.getElementById("myimg");
      img.setAttribute("src", url);
    })
    .catch((error) => {
      // Handle any errors
    });

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }
    var filePath = "/files/" + randomstring.generate() + ".jpeg";
    const storageRef = ref(storage, filePath);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    var urlPromise;
    setLoading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // console.log(url);
          const response = fetch("/api/img_parse", {
            method: "POST",
            body: url,
          });
          response.then((response) => {
            response.json().then((json) => {
              json = JSON.parse(json);
              // console.log("JSON: " + json);
              const desc = fetch("/api/gpt_description", {
                method: "POST",
                body: json["Name of Drug(short name)"],
              });
              desc.then((desc) => {
                desc.json().then((desc) => {
                  desc = JSON.parse(desc);
                  // console.log("DESCRPTION", desc);
                  var inp = {
                    Name: json["Name of Drug(short name)"],
                    Dosage: json["how many to take in a dose"],
                    Frequency: json["how many doses to take in a day"],
                    Notes:
                      json[
                      "any extra notes such as take by mouth or with food"
                      ],
                    filePath: url,
                    Description: JSON.stringify(desc),
                  };
                  props.addPrescription(inp).then(() => {
                    setCurMed(inp);
                    handleReset();
                    setInp("");
                    setLoading(false);
                  });
                });
              });
            });
          });
        });
        // .then((json) => {
        //   console.log("DATA:" + json);
        // });
      }
    );
  };

  return (
    <div className="">
      <div className="flex-col flex mt-16 border-t-2 border-gray-500">
        <p className="m-10 text-5xl">Upload Picture of Your Perscription</p>
        <input
          type="file"
          onChange={handleChange}
          className="border-2 text-xl border-gray-500 text-center rounded-lg  "
        ></input>
        <button
          className=" bg-gray-900 mt-24 w-3/12 text-xl rounded-xl py-2 mx-auto hover:bg-red-300"
          onClick={handleUpload}
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default Prescriptions;