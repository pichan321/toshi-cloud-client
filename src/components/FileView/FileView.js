import "./FileView.css";
import DownloadButton from "../Button/DownloadButton";
import DeleteButton from "../Button/DeleteButton";
import UploadView from "../UploadView/UploadView";
import { Button } from "rsuite";
import { useNavigate, Link } from "react-router";
import { stringToArray } from "ag-grid-community";
import { API_URL, CLIENT_URL } from "../../utils/API";
import { extract_filename } from "../../utils/file";
import { get } from "../../utils/API";
import MenuVertical from "../MenuVertical/MenuVertical";


export default function FileView({ files, getFiles, showHidden, search}) {
  const navigate = useNavigate();

  async function viewFile(file) {
    // navigate("/stream", {state: {filename: file.name}})
    //window.open(`http://localhost:8080/stream/${file.uuid}/${file.bucketUuid}`, "_blank")
    window.open(`${CLIENT_URL}/stream/${file.uuid}`, "_blank");
  }

  async function getFileContent(file) {
    window.open(`${CLIENT_URL}/content/${file.uuid}`, "_blank");
  }

  return (
    <div>
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
                        
