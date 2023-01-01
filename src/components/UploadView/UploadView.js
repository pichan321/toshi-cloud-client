import ProgressBar from "../ProgressBar/ProgressBar";
import "./UploadView.css";
import { extract_filename } from "../../utils/file";
import { Button } from "rsuite";
import {get, API_URL} from '../../utils/API'

export default function UploadView({ files, getFiles}) {

    async function deleteFile(file) {
        try {
          var response = await get(`${API_URL}/delete/${file.uuid}`)
        } catch {
          return
        }
        getFiles()
      }

    return (
    <div className="upload-view">
      {files.map((file) => {
        if (file.status !== "100.0") {
          return (
            <div className="upload-view-container m-1">
              <div className="upload-item p-3">
                <div className="upload-name-container">
                    <div className="upload-name">
                        <p>{extract_filename(file.name)}</p>
                    </div>
                
                    <div className="cancel-button">
                      <Button appearance="subtle" active onClick={() => deleteFile(file)}>
                        Cancel
                      </Button>
                    </div>
                </div>
               

                <p>{file.status + " %"}</p>
                <div className="upload-progress-bar">
                  <ProgressBar width={file.status + "%"}></ProgressBar>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
