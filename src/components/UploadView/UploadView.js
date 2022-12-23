import ProgressBar from '../ProgressBar/ProgressBar'
import './UploadView.css'
import { extract_filename } from '../../utils/file'

export default function UploadView({files}) {


    return (
        <div>
            {files.map((file) => 
            {
                if (file.status !== "100.0") {
                    return (
                        <div className='upload-view-container m-1'>
                        <div className='upload-item p-3'>
                            <p>{extract_filename(file.name)}</p>
                            <p>{file.status + " %"}</p>
                            <div className="upload-progress-bar">
                                <ProgressBar width={file.status + "%"}></ProgressBar>
                            </div>
                           
                        </div>
                        </div>
                        )
                }
            })}
        </div>
    )
}