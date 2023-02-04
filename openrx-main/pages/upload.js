import React from 'react'
import { storage } from '../firebase/clientApp'
import { useState,  } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";




const Upload = () => {
    // State to store uploaded file
    const [file, setFile] = useState("");

    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    getDownloadURL(ref(storage, '/files/Screen Shot 2023-02-02 at 11.26.40 PM.png'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `/files/${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

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
                });
            }
        );
    };
    return (
        <div className='p-24 text-white'>
            <div>Upload</div>
            <div>
                <input type="file" onChange={handleChange} accept="" />
                <button onClick={handleUpload}>Upload to Firebase</button>
                <p>{percent} "% done"</p>
            </div>
            <img id="myimg" src="" alt="" />
        </div>
    )
}

export default Upload