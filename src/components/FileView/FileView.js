import './FileView.css'
import DownloadButton from '../Button/DownloadButton'
import DeleteButton from '../Button/DeleteButton'
import UploadView from '../UploadView/UploadView'
import { Button } from 'rsuite'
import { useNavigate, Link } from 'react-router'
import { stringToArray } from 'ag-grid-community'
import { API_URL, CLIENT_URL } from '../../utils/API'
import { extract_filename } from '../../utils/file'

export default function FileView({files, getFiles}) {
    const navigate = useNavigate()

    async function viewFile(file) {
        // navigate("/stream", {state: {filename: file.name}})
        //window.open(`http://localhost:8080/stream/${file.uuid}/${file.bucketUuid}`, "_blank")
        window.open(`${CLIENT_URL}/stream/${file.uuid}`, "_blank")
    }


    return (
        <div className="container-fluid file-view">
             <div className='row justify-content-center m-3'>
                <UploadView files={files}/>
             </div>
            <div className='row justify-content-center'>
                <div className='file-view-container'>
                <div className='row'>
                    <div className='col-4'>
                        <h4>Name</h4>
                    </div>
                    <div className='col-2'>
                        <h4>Size</h4>
                    </div>
                    <div className='col-2 d-none d-md-block'>
                        <h4>Uploaded Date</h4>
                    </div>
                </div>
                    {files && 
                  
                    files.map((file) =>
                   
                        {
                            if (file.status === "100.0") {
                                    
                            return ( 
                            <div>
                            <div className='row m-2 align-items-center'>
                        <div className='col-4'>
                                <p>{extract_filename(file.name)}</p>
                            </div>
                            <div className='col-2'>
                                <p>{file.size}</p>
                            </div>
                            <div className='col-2 d-none d-md-block'>
                                <p>{file.uploadedDate}</p>
                            </div>
                            <div className='col-1'>
                                {String(file.name).includes(".mp4") && <Button file={file} getFiles={getFiles} appearance="primary" onClick={() => viewFile(file)} style={{color: "black", fontWeight: "bold"}}>View</Button>} 
                            </div>
                            <div className='col-1'>
                                <DownloadButton file={file} getFiles={getFiles}/>
                            </div>
                            <div className='col-1'>
                                <DeleteButton file={file} getFiles={getFiles}/>
                            </div>
                         
                        </div>
                        <div className='line'></div>
                        </div>
                        )
                            } else {
                        
                        }}
                    )

                    }
                </div>
            </div>
             
        </div>
       
    )
}