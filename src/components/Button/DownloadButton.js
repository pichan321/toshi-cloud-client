import React from "react";
import Button from 'rsuite/Button';
import { useState } from "react";
import { API_URL } from "../../utils/API";
import { extract_filename } from "../../utils/file";

export default function DownloadButton({getFiles, file}) {
    const [loading, setLoading] = useState(false)

    async function downloadFile(file) {
       setLoading(true)
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
       } catch {
        setLoading(false)
        return
       }
     
      getFiles()
      setLoading(false)
    }
    
      return (<Button appearance="primary" color="green" onClick={() => downloadFile(file)} loading={loading} style={{color: "black", fontWeight: "bold"}}>Download</Button>)
  }