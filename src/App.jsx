// import { useState } from "react";

import { useEffect, useState } from "react";
import "./App.css";
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";

function App() {
  // const [count, setCount] = useState(0);
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("copy");

  const generatePassword = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()";

    for (let index = 0; index < length; index++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordtoClipboard = () => {
    window.navigator.clipboard.writeText(password);
    // NotificationManager.success("Copied");
    setCopy("copied");
    setTimeout(() => {
      setCopy("copy"); // Change "default" to whatever the previous state was
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
        />
        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copyPasswordtoClipboard}
        >
          {copy}
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className=" flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
            name=""
            id=""
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className=" flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className=" flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characters">Characters</label>
        </div>
      </div>
      {/* <NotificationContainer /> */}
    </div>
  );
}

export default App;
