import logo from './logo.svg';
import React, {useEffect, useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/styles/index.less';
import 'rsuite/dist/rsuite.min.css'
import {get, post} from '../../utils/API' 
import { AgGridReact } from 'ag-grid-react';
import Uppy from '@uppy/core'
import DragDrop from '../../components/Upload/Upload';
//import ProgressBar from '@uppy/progress-bar'
import Tus from '@uppy/tus'
import Button from 'rsuite/Button';
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import DownloadButton from '../../components/Button/DownloadButton';
import DeleteButton from '../../components/Button/DeleteButton';
import { API_URL } from '../../utils/API';
import { userActions } from '../../utils/Slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import './Main.css'
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import FileView from '../../components/FileView/FileView';
import { useNavigate } from "react-router-dom";

export default function Main() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const gridRef = useState(null)
    const [files, setFiles] = useState([])


    // const [columnDefs] = useState([
    //     { field: "name", headerName: "File Name", type: 'leftAligned', autoHeight: true, rowHeight: 100},
    //     { field: 'size', headerName: "Size", type: 'leftAligned', autoHeight: true},
    //     { field: 'uploadedDate', headerName: "Date Uploaded", type: 'leftAligned', autoHeight: true},
    //     {field: 'handle',
    //     headerName: '' ,
    //     cellRenderer:  DownloadButton, 
    //     cellRendererParams: {
    //       clicked: function(field) {
    //         downloadFile(field)
    //       }
    //     }},
    //     {field: 'handle',
    //     headerName: '' ,
    //     cellRenderer:  DeleteButton, 
    //     cellRendererParams: {
    //       clicked: function(field) {
    //         deleteFile(field)
    //       }
    //     }}
    //   ]);

      async function getFiles() {
        let response = await get("http://localhost:8080/get-files/" + user.uuid)
        setFiles(response)
      }
    
      useEffect(() => {
        const interval = setInterval(() => {
          getFiles()
        }, 5000);
        return () => clearInterval(interval);
      }, []);
    
     
    
    
    
      // useEffect(() => {
      //   const interval = setInterval(() => {
      //     getFiles()
      //   }, 10000);
      //   return () => clearInterval(interval);
      // }, []);
    
    useEffect(() => {
      if (!files) {
        return
      }
      if (gridRef === null) {return}
      try { 
        gridRef.current.api.sizeColumnsToFit()
        const rowHeight = gridRef.current.api.getRowHeight
        console.log("Row height")
        console.log(rowHeight)
      } catch {
    
      }
     
    
     
    }, [files])

    function logout() {
        localStorage.removeItem("@toshi-cloud-token")
        dispatch(userActions.updateIsLoggedIn(false))
    }

    useEffect(() => {
      getFiles()
    }, [])

    return (
        <div className="main" style={{background: "black"}}>
        <div className='logout-button-container'>
 
                <img src="https://cdn-icons-png.flaticon.com/512/8914/8914308.png" onClick={() => logout()} className="logout-button"/>

        </div>
        <div className=''>
          <div className='row'>

          </div>
          <div className='row p-5'>
            <DragDrop user={user}/>
          </div>
        </div>
   
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className="ag-theme-alpine-dark ag-grid-container">
  
              {files.length > 0 ?
              <div className='container-fluid'>
                <div className='row'>
                  <FileView files={files} getFiles={getFiles}/>
                </div>
              </div>  
           
      
               : null }
     
              </div>
            </div>
                
          </div>
                
        </div>
      </div>
    )
}