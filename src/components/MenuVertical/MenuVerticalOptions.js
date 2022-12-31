import React, { useEffect } from "react";
import DeleteButton from "../Button/DeleteButton";
import DownloadButton from "../Button/DownloadButton";
import './MenuVertical.css'
import { CLIENT_URL, API_URL, get, post } from "../../utils/API";
import { extract_filename } from "../../utils/file";

export default function MenuVerticalOptions({file, getFiles, setShowOptions, showOptions}) {

    function view(file) {
        var type = file.name.split(".")
        type = type[type.length - 1]
        if (type === "mp4") {
            viewFile(file)
        }
 
        var supportedFileTypes = ["txt", "jpg", "png", "gif"]
        if (supportedFileTypes.includes(type)) {getFileContent(file)}


    }

    async function viewFile(file) {
        window.open(`${CLIENT_URL}/stream/${file.uuid}`, "_blank");
      }

      async function getFileContent(file) {
        window.open(`${CLIENT_URL}/content/${file.uuid}`, "_blank");
      }

    async function downloadFile(file) {
        try {
         await fetch(`${API_URL}/download/${file.uuid}`)
         .then(response => response.json())
         .then(response => {
             var a = document.createElement('a');
             a.href = response.message;
             a.download = extract_filename(file.name)
             a.download = "export.txt"
             document.body.appendChild(a);
             a.click();    
             a.remove();  
         });
         setShowOptions(false)
        } catch {
        //  setLoading(false)
         return
        }
        setShowOptions(false)
       getFiles()
    //    setLoading(false)
     }


     async function deleteFile(file) {
        // setLoading(true)
        try {
          var response = await get(`${API_URL}/delete/${file.uuid}`)
          setShowOptions(false)
          getFiles()
        } catch {
          return
        }
        // setLoading(false)
      }

      async function hide(file) {
        try {
            var response = await get(`${API_URL}/hide/${file.uuid}`)
            setShowOptions(false)
            getFiles()
          } catch {
            return
          }
      }

      async function unhide(file) {
        try {
            var response = await get(`${API_URL}/unhide/${file.uuid}`)
            setShowOptions(false)
            getFiles()
          } catch {
            return
          }
      }

    return (
        <div className="menu-vertical-options-container p-3">
            <div className="container-fluid" style={{width: "100%"}}>
                <div className="row justify-content-center">
                    <div className="col-12 p-2 option-item" onClick={() => view(file)}>
                            <div style={{display: "flex", alignItems: "center"}}>
                            <p><img src="https://img.icons8.com/office/512/external-link.png" alt="View" width={30} height={30}/> View</p>
                        </div>
                    </div>
                    <div className="col-12 p-2 option-item">
                        <div style={{display: "flex", alignItems: "center"}} onClick={() => downloadFile(file)}>
                            <p><img src="https://img.icons8.com/office/512/download.png" alt="Download" width={30} height={30}/> Download</p>
                        </div>
                        
                    </div>
                  
                    {file.hidden ?    
                    <div className="col-12 p-2 option-item">
                        <div style={{display: "flex", alignItems: "center"}} onClick={() => unhide(file)}>
                            <p><img src="https://img.icons8.com/external-soft-fill-juicy-fish/512/external-woke-emotional-intelligence-soft-fill-soft-fill-juicy-fish.png" alt="Hide" width={30} height={30}/> Unhide</p>
                        </div>
                    </div>
                    :
                    <div className="col-12 p-2 option-item">
                            <div style={{display: "flex", alignItems: "center"}} onClick={() => hide(file)}>
                            <p><img src="https://img.icons8.com/nolan/512/hide.png" alt="Hide" width={30} height={30}/> Hide</p>
                        </div>
                    </div>
                    
                    }
                    <div className="col-12 p-2 option-item">
                        <div style={{display: "flex", alignItems: "center"}} onClick={() => deleteFile(file)}>
                            <p><img src="https://img.icons8.com/external-soft-fill-juicy-fish/512/external-delete-folders-soft-fill-soft-fill-juicy-fish.png" alt="Delete" width={30} height={30}/> Delete</p>
                        </div>
                    </div>
                   
                </div>
     
            </div>
     

        </div>
    )
}