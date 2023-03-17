import logo from "./logo.svg";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";
import "./App.css";
import { get } from "./utils/API";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import DownloadButton from "./components/Button/DownloadButton";
import DeleteButton from "./components/Button/DeleteButton";
import Login from "./pages/Login/Login";
import { userActions } from "./utils/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Main from "./pages/Main/Main";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Stream from "./pages/Stream/Stream";
import { API_URL } from "./utils/API";
import Content from "./pages/Content/Content";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const gridRef = useRef(null);

  async function getFiles() {
    if (user.uuid === "") {return}

    let response = await get(`${API_URL}/get-files/${user.uuid}`);
    setFiles(response);
  }

  useEffect(() => {
    getFiles();
  }, []);

  async function downloadFile(file) {
    console.log(file);
    await fetch(`${API_URL}/download/${user.username}/${file.handle}`)
      .then((response) => response.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = file.filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }


  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
              user.isLoggedIn ?   <Main/>   : <Login getFiles={getFiles} />
          }
        />
        <Route path="/stream/:fileUuid" element={<Stream/>} />
        <Route path="/content/:fileUuid" element={<Content />} />
      </Routes>
    </div>
  );
}

export default App;
/*
   <div className="App">
      <input onChange={(e) => onUserChange(e)} value={user}></input>
      <button onClick={() => getFiles()}>Get Files</button>
      <div className=''>
        <div className='row'>
          <DragDrop user={user}/>
        </div>
      </div>
 
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <div className="ag-theme-alpine-dark ag-grid-container">
              <AgGridReact rowData={files} columnDefs={columnDefs} ref={gridRef}></AgGridReact>
            </div>
          </div>
          
        </div>
     
      </div>
    </div>
*/
