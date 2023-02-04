import React, { useState, useEffect } from "react";

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/img_parse", {
        method: "POST",
        body: "https://firebasestorage.googleapis.com/v0/b/turing-emitter-367107.appspot.com/o/files%2FScreen%20Shot%202023-02-04%20at%201.03.49%20PM.png?alt=media&token=a270ab7e-fc44-40ba-a013-ee564263867c" 
      });
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);



  return <div className="p-24 text-white">{data ? JSON.stringify(data) : "Loading..."}</div>;
};

export default MyComponent;