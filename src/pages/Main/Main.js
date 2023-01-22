import logo from './logo.svg';
import React, {useEffect, useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/styles/index.less';
import 'rsuite/dist/rsuite.min.css'
import {get, post} from '../../utils/API' 
import { AgGridReact } from 'ag-grid-react';
import Uppy from '@uppy/core'
import Upload from '../../components/Upload/Upload';
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
import { Checkbox } from 'rsuite';
import { Input, InputGroup, Grid, Row, Col } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import SearchBar from '../../components/SearchBar/SearchBar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Modal from "../../components/Modal/Modal";
import {
  Box,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Wrap,
  WrapItem,
  AvatarGroup,
} from '@chakra-ui/react'
import ChangePassword from '../../components/ChangePassword/ChangePassword';
// import ChangePassword from '../ChangePassword/ChangePassword';

export default function Main() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const gridRef = useState(null)
    const [files, setFiles] = useState([])
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [showHidden, setShowHidden] = useState(false)
    const [search, setSearch] = useState("")


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

        let response = await get(`${API_URL}/get-files/${user.uuid}?search=${search}&showHidden=${showHidden}`)
        setFiles(response)
      }
    
      useEffect(() => {
        const interval = setInterval(() => {
          getFiles()
        }, 5000);
        return () => clearInterval(interval);
      }, [user, search]);
    
     
    
    
    
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
    }, [search])

    useEffect(() => {
      getFiles()
    }, [])

    return (
      <>

  
      <div className="main">
        <div className='user-popover-container'>
          <Popover alignItems="center">
            <PopoverTrigger>
              <Avatar src="https://otakuusamagazine.com/wp-content/uploads/2021/09/gunmachan.jpg" className='user-avatar'/>
            </PopoverTrigger>
            <PopoverContent borderColor="black">
              <div className='user-popover p-3'>
                <PopoverHeader alignItems={"center"}>
                    <Center>
                    <Wrap>
                      <WrapItem>
                        <Avatar name={user.username} src='https://otakuusamagazine.com/wp-content/uploads/2021/09/gunmachan.jpg' sx={{width: 100, height: 100}}/>
                      </WrapItem>
                    </Wrap>
                    </Center>
                    <div className='m-2'>
                      <p><strong>Username:</strong> {user.username}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                    </div>
                 
                </PopoverHeader>
                <PopoverBody>
                  <Box>
                    <Divider color={"black"}/>
                    <div className='popover-icon m-1' onClick={() => setChangePasswordModal(true)}>
                      <img src="https://cdn-icons-png.flaticon.com/512/3256/3256783.png" alt="" width={35} height={35}/> Change Password
                    </div>
                    <Divider color={"black"}/>
                    <div className='popover-icon m-1' onClick={() => logout()}>
                      <img src="https://img.icons8.com/plasticine/512/logout-rounded.png" alt="" width={40} height={40}/> Log Out
                    </div>
                    <Divider color={"black"}/>
                  </Box>
                </PopoverBody>
              
  
 
              </div>
            </PopoverContent>
          </Popover>
          {/* <Modal Component={<ChangePassword/>} close={null}/> */}
        </div>

          <div className='row align-items-center'>
            <div className='col-12 col-md-3'>
              <Upload user={user}/>
            </div>
            <div className='col-12 col-md-6 p-3'>
            <div style={{width: "100%"}}>
                <InputGroup inside style={{zIndex: 999}}>
                  <Input placeholder={"Search file"} onChange={(e) => setSearch(e)}/>
                  <InputGroup.Button>
                    <SearchIcon onClick={() => getFiles()}/>
                  </InputGroup.Button>
                </InputGroup>
              </div>
            </div>

  

          </div>
          <Checkbox style={{color: "white"}} checked={showHidden} onChange={(e, checked) => setShowHidden(checked)}>Show Hidden Files</Checkbox>
        
          {changePasswordModal && <Modal Component={ChangePassword} close={() => setChangePasswordModal(false)}/>}

        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className="ag-theme-alpine-dark ag-grid-container">
  
              {files.length > 0 ?
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-12'>
                    <FileView files={files} getFiles={getFiles} showHidden={showHidden} search={search}/>
                  </div>
                
                </div>
              </div>  
           
      
               : null }
     
              </div>
            </div>
                
          </div>
                
        </div>
      </div>
          
  
     
      </>
    )
}