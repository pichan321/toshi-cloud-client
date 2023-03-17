import "./FileView.css";
import DownloadButton from "../Button/DownloadButton";
import DeleteButton from "../Button/DeleteButton";
import UploadView from "../UploadView/UploadView";
import { Button } from "rsuite";
import { useNavigate, Link } from "react-router";
import { stringToArray } from "ag-grid-community";
import { API_URL, CLIENT_URL, DELETE } from "../../utils/API";
import { extract_filename } from "../../utils/file";
import { get } from "../../utils/API";
import MenuVertical from "../MenuVertical/MenuVertical";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from "react";
import FileAvatar from "./FileAvatar";
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Center, HStack} from '@chakra-ui/react'

export default function FileView({ files, getFiles, showHidden, search}) {
  const navigate = useNavigate();
  const [deleteMultipleModal, setDeleteMultipleModal] = useState(false)
  const [width, setWidth] = useState(100)
  const [checks, setChecks] = useState([])

  function checkAll(e) {

    if (!e) {setChecks([])}

    var tempArr = []
    if (showHidden && e) {
      files.forEach(file => {
        if (!checks.includes(file.uuid)) {
          tempArr.push(file.uuid)
        }
      });
      setChecks(checks.concat(tempArr))
      return
    }

    if (!showHidden && e) {
      files.forEach(file => {
        if (!checks.includes(file.uuid) && !file.hidden) {
          tempArr.push(file.uuid)
        }
      });
      setChecks(checks.concat(tempArr))
      return
    }
  }

  function checkOne(e, uuid) {
    if (e) {
      setChecks([...checks, uuid])
    } else {
      setChecks(checks.filter(eachUuid => {
        if (eachUuid !== uuid) {
          return eachUuid
        }
      }))
    }
  }

  async function deleteMultiple() {
    var response = await DELETE(`${API_URL}/delete-multiple`, checks)
    console.log(response)
  }

  useEffect(() => {
    console.log(checks)
  }, [checks])
 
  async function viewFile(file) {
    // navigate("/stream", {state: {filename: file.name}})
    //window.open(`http://localhost:8080/stream/${file.uuid}/${file.bucketUuid}`, "_blank")
    window.open(`${CLIENT_URL}/stream/${file.uuid}`, "_blank");
  }

  async function getFileContent(file) {
    window.open(`${CLIENT_URL}/content/${file.uuid}`, "_blank");
  }

  function updateSize() {
    if (window.innerWidth < 768) {
      setWidth(100)
    } else {
      setWidth(50)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [])

  console.log();

  return (
    <div>
       <Modal
        open={deleteMultipleModal}
        onClose={() => setDeleteMultipleModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 0,
}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You are about to delete {checks.length} files. Do you still want to do so?
            
          </Typography>
          <div style={{width: "100%"}}>
  
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Center color='white'>
              <HStack spacing='24px'>
              <Box w='40px' h='40px'>
              <Button  className="" onClick={() => deleteMultiple()} color="red" appearance="primary" m={5}>Delete</Button>
              </Box>
              <Box w='40px' h='40px'>
              <Button  className="" onClick={() => setDeleteMultipleModal(false)} appearance="primary">Cancel</Button>
              </Box>
              </HStack>
            </Center>
          </Typography>
          </div>
        
        </Box>
      </Modal>

      <div className="container-fluid" style={{height: "auto", color: "black", width: `${width}vw`}}>
      <Checkbox check={false} style={{borderColor: "white", backgroundColor: "white"}} className="me-3" onChange={(e) => checkAll(e.target.checked)}>Checkbox</Checkbox>
      <Button  className="" onClick={() => setDeleteMultipleModal(true)}> {/**onClick={()=> parseUpload()} */}
        <img src="https://cdn-icons-png.flaticon.com/512/2496/2496740.png" alt="" width={30} height={30}/>
      </Button>
        <div className="container-fluid file-view pt-5 pb-5">
          <div className="col-12">
            <UploadView files={files} getFiles={getFiles} />
          </div>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }} style={{borderRadius: 15}}> {/**style={{borderRadius: 15}} */}
          {files.map((file) => {

                if (file.status === "100.0" && file.hidden === false) {
                  return (
                    (<>
            <div className="row">
              <div className="col-10">
              <ListItem style={{ width: '100%', height: "auto"}} key={file.uuid}>
              <Checkbox onChange={(e) => checkOne(e.target.checked, file.uuid)} checked={checks.includes(file.uuid) ? true : false}>Checkbox</Checkbox>
     <ListItemAvatar>
    

      <FileAvatar type={extract_filename(file.name).split(".")[extract_filename(file.name).split(".").length - 1]}/>
     </ListItemAvatar>
     <ListItemText 
     primary={<div style={{fontWeight: "bold"}}>{file.shared_file && <img src="https://img.icons8.com/plasticine/512/share.png" alt="Shared File" width={30} height={30}/>} {extract_filename(file.name)}</div>} 
     secondary={
     <div>
       <p><strong>Size:</strong> {file.size}</p> 
       <p><strong>Uploaded Date:</strong> {file.uploadedDate}</p> 
     </div>} />

       {/**      <MenuVertical file={file} getFiles={getFiles} />*/}

   </ListItem>




              </div>
              <div className="col-2">
                <div className="menu-vertical-container" style={{height: "100%", display: "flex", justifyContent: "end", alignItems: "center", width: "100%"}}>
                  <MenuVertical file={file} getFiles={getFiles}/>
                </div>
              
              </div>
              <Divider variant="inset" component="li" />
            </div>

            
          </>)
                  );
                } else if (showHidden) {
 
                  return (

                    (<>
            <div className="row">
              <div className="col-10">
              <ListItem style={{ width: '100%', height: "auto"}} key={file.uuid}>
              <Checkbox onChange={(e) => checkOne(e.target.checked, file.uuid)} checked={checks.includes(file.uuid) ? true : false}>Checkbox</Checkbox>
     <ListItemAvatar>

      <FileAvatar type={extract_filename(file.name).split(".")[extract_filename(file.name).split(".").length - 1]}/>


     </ListItemAvatar>
     <ListItemText 
     primary={<div style={{fontWeight: "bold"}}><img src="https://img.icons8.com/nolan/512/hide.png" alt="Hidden" width={30} height={30}/> {file.shared_file && <img src="https://img.icons8.com/plasticine/512/share.png" alt="Shared File" width={30} height={30}/>} {extract_filename(file.name)}</div>} 
     secondary={
     <div>
       <p><strong>Size:</strong> {file.size}</p> 
       <p><strong>Uploaded Date:</strong> {file.uploadedDate}</p> 
     </div>} />

       {/**      <MenuVertical file={file} getFiles={getFiles} />*/}
  

   </ListItem>
              </div>
              <div className="col-2">
                <div className="menu-vertical-container" style={{height: "100%", display: "flex", justifyContent: "end", alignItems: "center", width: "100%"}}>
                  <MenuVertical file={file} getFiles={getFiles}/>
                </div>
              
              </div>
              <Divider variant="inset" component="li" />
            </div>

            
          </>)
           
                    
                  );
                }
              })}
              </List>
     
     </div>
     </div>

      </div>
    

  );
}

/**
         {/** {String(file.name).includes(".mp4") && (
                            <Button
                              file={file}
                              getFiles={getFiles}
                              appearance="primary"
                              onClick={() => viewFile(file)}
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              View
                            </Button>
                          )} 
                          
                           {String(file.name).includes(".txt") && (
                            <Button
                              file={file}
                              getFiles={getFiles}
                              appearance="primary"
                              onClick={() => getFileContent(file)}
                              style={{ color: "black",}}
                            >
                              View
                            </Button>
                                          )}
                          
                          */
                      
                         
          
        
                        /**
                            <div className="col-1">
                          <DownloadButton file={file} getFiles={getFiles} />
                        </div>
                        <div className="col-1">
                          <DeleteButton file={file} getFiles={getFiles} />
                        </div>
                         */
                        
/*
  <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <UploadView files={files} getFiles={getFiles} />
          </div>
        </div>
      </div>

      <div className="container-fluid file-view">
        <div className="row justify-content-center">
          <div className="file-view-container p-3">
            <div className="row justify-content-start">
              <div className="col-4">
                <h4>Name</h4>
              </div>
              <div className="col-2">
                <h4>Size</h4>
              </div>
              <div className="col-2 d-none d-md-block">
                <h4>Uploaded Date</h4>
              </div>
            </div>
            {search == "" ?
              files.map((file) => {
                if (file.status === "100.0" && file.hidden === false) {
                  return (
                    <div>
                      <div className="row align-items-center m-3">
                        <div className="col-4">
                          <p>{extract_filename(file.name)}</p>
                        </div>
                        <div className="col-2">
                          <p>{file.size}</p>
                        </div>
                        <div className="col-2 d-none d-md-block">
                          <p>{file.uploadedDate}</p>
                        </div>
                        <div className="col-6 col-md-4">
                          <div className="menu-vertical-col" style={{display: "flex", justifyContent: "end"}}>
                           <MenuVertical file={file} getFiles={getFiles}/>    
                          </div>
                     
                        </div>
                      </div>
                      <div className="line"></div>
                    </div>
                  );
                } else if (showHidden) {
 
                  return (
           
                    <div>
                      <div className="row align-items-center m-3">
                        <div className="col-4">
                          <p><img src="https://img.icons8.com/nolan/512/hide.png" alt="Hidden" width={30} height={30}/> {extract_filename(file.name)}</p>
                        </div>
                        <div className="col-2">
                          <p>{file.size}</p>
                        </div>
                        <div className="col-2 d-none d-md-block">
                          <p>{file.uploadedDate}</p>
                        </div>
                        <div className="col-6 col-md-4">
                          <div className="menu-vertical-col" style={{display: "flex", justifyContent: "end"}}>
                           <MenuVertical file={file} getFiles={getFiles}/>    
                          </div>
                     
                        </div>
                      </div>
                      <div className="line"></div>
                    </div>
                  );
                }
              }):
              
              files.map((file) => {
                if (file.status === "100.0" && file.hidden === false && file.name.toLowerCase().includes(search.toLowerCase())) {
                  return (
                    <div>
                      <div className="row align-items-center m-3">
                        <div className="col-4">
                          <p>{extract_filename(file.name)}</p>
                        </div>
                        <div className="col-2">
                          <p>{file.size}</p>
                        </div>
                        <div className="col-2 d-none d-md-block">
                          <p>{file.uploadedDate}</p>
                        </div>
                        <div className="col-6 col-md-4">
                          <div className="menu-vertical-col" style={{display: "flex", justifyContent: "end"}}>
                           <MenuVertical file={file} getFiles={getFiles}/>    
                          </div>
                     
                        </div>
                      </div>
                      <div className="line"></div>
                    </div>
                  );
                } else if (showHidden  && file.name.toLowerCase().includes(search.toLowerCase())) {
 
                  return (
           
                    <div>
                      <div className="row align-items-center m-3">
                        <div className="col-4">
                          <p><img src="https://img.icons8.com/nolan/512/hide.png" alt="Hidden" width={30} height={30}/> {extract_filename(file.name)}</p>
                        </div>
                        <div className="col-2">
                          <p>{file.size}</p>
                        </div>
                        <div className="col-2 d-none d-md-block">
                          <p>{file.uploadedDate}</p>
                        </div>
                        <div className="col-6 col-md-4">
                          <div className="menu-vertical-col" style={{display: "flex", justifyContent: "end"}}>
                           <MenuVertical file={file} getFiles={getFiles}/>    
                          </div>
                     
                        </div>
                      </div>
                      <div className="line"></div>
                    </div>
                  );
                }
              })
              }
          </div>
        </div>
      </div>

    */