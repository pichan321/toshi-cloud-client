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
import Sharing from '../../components/Sharing/Sharing';
import ShareFileView from '../../components/ShareFileView/ShareFileView';
// import ChangePassword from '../ChangePassword/ChangePassword';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


export default function Main() {
    // const { user: USER, isAuthenticated, isLoading, loginWithRedirect, logout: Auth0Logout} = useAuth0();
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const gridRef = useState(null)
    const [files, setFiles] = useState([])
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [sharingModal, setSharingModal] = useState(false)
    const [showHidden, setShowHidden] = useState(false)
    const [search, setSearch] = useState("")
    const [quota, setQuota] = useState("0.0")
    const [showMain, setShowMain] = useState(false)
    const [showShareFiles, setShowShareFiles] = useState(false)
    const [profile, setProfile] = useState("")
    const profileRef = useRef(null)

    const { user: USER, isAuthenticated, isLoading, loginWithRedirect, getIdTokenClaims, logout: Auth0Logout} = useAuth0();


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
        var token = localStorage.getItem("@toshi-cloud")
        var response = await axios.get(`${API_URL}/get-files?search=${search}&showHidden=${showHidden}`, {headers: {"authorization": "Bearer " + token}})
        setFiles(response.data)
      }

      async function getQuota() {
        var token = localStorage.getItem("@toshi-cloud")
        var response = await axios.get(`${API_URL}/get-quota`, {headers: {"authorization": "Bearer " + token}})
        console.log(response)
        setQuota(response.data)
      }
    
      useEffect(() => {
        const interval = setInterval(() => {
          getFiles()
          getQuota()
        }, 7500);
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

    async function getProfile() {
      try {
        var response = await get(API_URL + `/get-profile/${user.uuid}`)
        setProfile(response)
      } catch {
        return
      }
    }

    async function uploadProfile(e) {
      const form = new FormData()
      form.append("userUuid", user.uuid)
      form.append("file", e.target.files[0])
      form.append("fileName", e.target.files[0].name)
      var token = localStorage.getItem("@toshi-cloud")
      fetch(
          `${API_URL}/upload-profile`,
          {
              headers: {
                "Authorization": "Bearer " + token
              },
              method: 'POST',
              body: form,
          }
      )
          .then((response) => response.json())
          .catch((error) => {
              console.error('Error:', error);
          });
      
          setTimeout(() => {getProfile()}, 5000)
    }

    useEffect(() => {
      getFiles()
    }, [search])

    const logout = () => {
      localStorage.removeItem("@toshi-cloud")
      dispatch(userActions.updateIsLoggedIn(false))
      Auth0Logout()
    }

    useEffect(() => {
      const getUserMetadata = async () => {
          var response = await getIdTokenClaims()

          if (response === null || response === undefined) {
            return
          }
          var response = await axios.get(`${API_URL}/profile`, {headers: {"authorization": "Bearer " + response.__raw}})
          console.log(response)
          if (response.status !== 200) {
            return
          }
          console.log("Dispatching")
          dispatch(userActions.updateMetadata(response.data))
          dispatch(userActions.updateIsLoggedIn(true))
      }
      getUserMetadata()
     
  }, [isAuthenticated, USER?.sub])

  useEffect(() => {
    if (!user?.isLoggedIn) {
      navigate("/")
    }
  }, [])

  useEffect(() => {
    console.log(user)
  })

    return (
      <>
        <div className='background'>
          <div className=''>
          <div className='grid grid-cols-12'>
            <div className='col-span-3'>
                <Upload user={user}/>
                <Checkbox style={{color: "white"}} checked={showHidden} onChange={(e, checked) => setShowHidden(checked)}>Show Hidden Files</Checkbox>
            </div>
            <div className='col-span-6 flex items-center justify-center '>

                <InputGroup inside style={{zIndex: 999}}>
                    <Input placeholder={"Search file"} onChange={(e) => setSearch(e)}/>
                    <InputGroup.Button>
                      <SearchIcon onClick={() => getFiles()}/>
                    </InputGroup.Button>
                  </InputGroup>

           
            </div>
            <div className=''>
            <div style={{position: "absolute", right: "1em", top: "1em"}}>
        <Popover alignItems="center" className="" >
            <PopoverTrigger>
              <Avatar src={user?.metadata?.picture}  className='user-avatar'/>
            </PopoverTrigger>
            <PopoverContent borderColor="black">
              <div className='user-popover p-3'>
                <PopoverHeader alignItems={"center"}>
                    <Center>
                    <Wrap>
                      <WrapItem>
                        <Avatar name={user?.username} src={user?.metadata?.picture} sx={{width: 100, height: 100}}/>
                      </WrapItem>
                    </Wrap>
                    </Center>
                    <div className='m-2'>
                      <p><strong>Username:</strong> {user?.metadata?.nickname}</p>
                      <p><strong>Email:</strong> {user?.metadata?.email}</p>
                      <p><strong>Storage Quota:</strong> {quota} / 1000.0 GB</p>
                    </div>
                 
                </PopoverHeader>
                <PopoverBody>
                  <Box>
                    <Divider color={"black"}/>
                    <div className='popover-icon m-1' onClick={() => logout()}>
                      <span className='flex items-center'>
                        <img src="https://img.icons8.com/plasticine/512/logout-rounded.png" alt="" width={40} height={40}/>
                        <p>Log Out</p>
                      </span>
                
                    </div>
                    <Divider color={"black"}/>
                  </Box>
                </PopoverBody>
              
  
 
              </div>
            </PopoverContent>
          </Popover>
        </div>

            </div>
          </div>


          <div className='overflow-y-hidden' style={{height: "80vh"}}>
            <FileView files={files} getFiles={getFiles} showHidden={showHidden} search={search}/>
          </div>

  
         
        </div>
           {/* <Modal Component={<ChangePassword/>} close={null}/> */}

           {/* {files?.length > 0 ?
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <FileView files={files} getFiles={getFiles} showHidden={showHidden} search={search}/>
        </div>
      
      </div>
    </div>  
 

     : null } */}

       
</div> 
        
      </>
    )
}