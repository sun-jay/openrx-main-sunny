import React, { useEffect } from "react";
import Projects_Header from "../components/Projects_Header";
import { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import userServices from "../firebase/userServices";
import { GrFormTrash } from "react-icons/gr";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/clientApp";
import { get } from "http";

const randomstring = require("randomstring");

const Prescriptions = (props) => {
  const [curMed, setCurMed] = useState(0);
  const [inp, setInp] = useState({
    Name: "",
    Dosage: "",
    Frequency: "",
    Notes: "",
    FilePath: "",
  });

  return (
    <div className="w-full h-screen overflow-hidden">
      {/* <Projects_Header /> */}

      <div className="flex-row flex flex-auto w-full h-full border-t-2">
        <MedList curMed={curMed} setCurMed={setCurMed} props={props} />

        <div className=" h-screen w-8/12 inline-block bg-gray-700 ">
          <div className="w-full inline text-center">
            {/* get type of a var */}
            {/* {JSON.stringify( props.FBuser.prescriptions)} */}
            {/* if curMed = "AddPrescrption", render a input field that when submitted calls a function that adds a new user in
                     firebase */}

            {curMed === "AddPrescription" ? (
              <ManualOrImage
                inp={inp}
                setInp={setInp}
                curMed={curMed}
                setCurMed={setCurMed}
                props={props}
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
  );
};

const ManualOrImage = ({ inp, setInp, curMed, setCurMed, props }) => {
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
        />
      ) : (
        <Upload
          props={props}
          curMed={curMed}
          setInp={setInp}
          setCurMed={setCurMed}
        />
      )}
    </div>
  );
};

const DisplayMed = ({ curMed }) => {
  return (
    <div className="w-full text-left ">
      <div>
        <div className="text-6xl underline font-semibold p-10 text-white">
          {" "}
          {curMed.Name}
        </div>
        {curMed.filePath ? (
          <img src={curMed.filePath} className="rounded-xl w-3/12 m-10" />
        ) : (
          <div></div>
        )}
        <div className="text-5xl p-10 text-white">
          Dosage:{" "}
          {curMed.Dosage == "1"
            ? curMed.Dosage + " Pill"
            : curMed.Dosage
            ? curMed.Dosage + " Pills"
            : "No Information"}
        </div>
      </div>
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
              className="text-white border-4 font-bold rounded-lg p-4 m-10 hover:bg-gray-800"
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
    console.log(props.FBuser.prescriptions);
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
        {props.FBuser.prescriptions?.map((item) => (
          <div
            onClick={() => setCurMed(item)}
            className={
              item.Name === curMed.Name
                ? "border-b-2 bg-gray-600 ease-in duration-300"
                : "hover:bg-gray-700  border-b linear duration-100"
            }
          >
            <div className="flex items-center justify-between p-4  ">
              {/* <img class="w-12 h-12 Prescriptions" src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" /> */}
              <div className="flex flex-col">
                <strong className="text-black-900 font-bold text-lg font-medium">
                  {item.Name}
                </strong>
                <span className="text-black-500 text-sm font-medium">
                  Medication
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
                      ? "text-black ease-in duration-300 "
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

const Upload = ({ props, setCurMed, setInp }) => {
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
          console.log(url);
          const response = fetch("/api/img_parse", {
            method: "POST",
            body: url,
          });
          response.then((response) => {
            response.json().then((json) => {
              json = JSON.parse(json);
              console.log(json);

              var inp = {
                Name: json["Name of Drug(short name)"],
                Dosage: json["how many to take in a dose"],
                Frequency: json["how many doses to take in a day"],
                Notes:
                  json["any extra notes such as take by mouth or with food"],
                filePath: url,
              };
              props.addPrescription(inp).then(() => {
                setCurMed(inp);
                handleReset();
                setInp("");
              });
            });
          });
        });
        // .then((json) => {
        //   console.log("DATA:" + json);
        // });
      }
    );
    async function fetchData() {
      const response = await fetch("/api/img_parse", {
        method: "POST",
        body: imageUrl,
      });
      const json = await response.json();
      return json;
    }
    fetchData();
    console.log(data);
  };
  return (
    <div className="p-24 text-white">
      <div>Upload</div>
      <div>
        <input type="file" onChange={handleChange} accept="" />
        <button onClick={handleUpload}>Upload to Firebase</button>
        <p>{percent} "% done"</p>
      </div>
      <img id="myimg" src="" alt="" />
    </div>
  );
};

export default Prescriptions;
