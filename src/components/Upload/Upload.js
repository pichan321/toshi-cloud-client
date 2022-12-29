import React, { useEffect, useState, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import { post } from "../../utils/API";
import Button from 'rsuite/Button';
import './Upload.css'
import { useSelector } from "react-redux";
import ProgressBar from "../ProgressBar/ProgressBar";
import { API_URL } from "../../utils/API";
import Modal from "../Modal/Modal";
import DeleteButton from "../Button/DeleteButton";
import ParseText from "../ParseText/ParseText";
export default function Upload() {
  const [progress, setProgress] = useState("0%")

  const chunkSize = 1048576 * 150;//its 3MB, increase the number measure in mb
  const user = useSelector(state => state.user)
  const [files, setFiles] = useState([]);
  const [toSend, setToSend] = useState(null)
  const [size, setFileSize] = useState(0)
  const [currentCount, setCurrentCount] = useState(0)
  const [chunkCount, setChunkCount] = useState(0)
  const [text, setText] = useState("")
  const [begin, setBegin] = useState(0)
  const [end, setEnd] = useState(chunkSize)

  const [loading, setLoading] = useState(false)
  const [part, setPart] = useState(0)
  const [uploadId, setUploadId] = useState("")
  const [parseText, setParseText] = useState(false)

  const handleChange = (e) => {
    //prepareMultipartUpload(file)
    const allFiles = Array.from(e.target.files)
    allFiles.forEach((file) => {
      const size = parseFloat(getTwoDecimal(file.size))
      if (size < chunkSize) {
        uploadFile(file)
      } else {
        let uploadId = prepareMultipartUpload(file).then((uploadInfo) => multipartUpload(file, uploadInfo))
        console.log("Multipart")
        console.log(uploadId)
      }
    })
  

  };

  function getTotalChunk(size) {
      return size % chunkSize == 0 ? size / chunkSize : Math.floor(size / chunkSize) + 1
  }

  function getTwoDecimal(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  function fileSize(bytes) {
    var size = getTwoDecimal(bytes / 1000.0)
    
    if (size< 1000) {
      return (size + " KB")
    }

    size = getTwoDecimal(size / 1000.0)

    if (size< 1000) {
      return (size + " MB")
    }

    size = getTwoDecimal(size / 1000.0)

    if (size < 1000) {
      return (size + " GB")
    }

    return (size + " B")
  }
  
  async function uploadFile(file) {
    if (!file) {
      return
    }

    const form = new FormData()
    form.append("userUuid", user.uuid)
    form.append("file", file)
    const filesize = fileSize(file.size)
    const sizeMB = getTwoDecimal(file.size / 1000000.0)
    form.append("name", file.name)
    form.append("size", filesize)
    form.append("sizeMb", sizeMB)
    fetch(
        `${API_URL}/upload`,
        {
            method: 'POST',
            body: form,
        }
    )
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
  }

  async function prepareMultipartUpload(file) {
   const form = new FormData()
   form.append("userUuid", user.uuid)
   const filesize = fileSize(file.size)
   const sizeMB = getTwoDecimal(file.size / 1000000.0)
   form.append("name", file.name)
   form.append("size", filesize)
   form.append("sizeMb", sizeMB)
   var response = await fetch(
       `${API_URL}/prepare-multipart-upload`,
       {
           method: 'POST',
           body: form,
       }
   )
         .then((response) => response.json())
         .catch((error) => {
             console.error('Error:', error);
         });
         return response
  }

  async function multipartUpload(file, uploadInfo) {

    let begin = 0
    let end = chunkSize
    let count = 1
    let countTotal = getTotalChunk(file.size)
    console.log("Total")
    console.log(countTotal)
    for (count; count <= countTotal + 1; ) {
      if (count > countTotal) {break}

      console.log(
        "Begin" + begin
      )
      console.log("End" + end)

    const form = new FormData()

    form.append("file", file.slice(begin, end))
    form.append("userUuid", user.uuid)
    const filesize = fileSize(file.size)
    const sizeMB = getTwoDecimal(file.size / 1000000.0)
    form.append("name", uploadInfo.name)
    form.append("size", filesize)
    form.append("sizeMb", sizeMB)
    form.append("current", count)
    form.append("total", countTotal)
    form.append("uploadId", uploadInfo.message)

    try {
      var response = await fetch(
        `${API_URL}/multipart-upload`,
        {
            method: 'POST',
            body: form,
        }
    )


        let progress = (count / countTotal) * (100.0)
        console.log("PROGRESS")
        console.log(progress.toString() + "%")
        setProgress(progress.toString() + "%")
        begin = end
        end = end + chunkSize
        count++
        // console.log("BEGIN")
        // console.log(begin)
        // console.log("END")
        // console.log(end)
        // console.log("COUNT")
        // console.log(count)
        // console.log("TOTAl")
        // console.log(chunkCount)
    } catch {
      count = countTotal + 1
      break
    }
    }
      
  }

  async function submitUpload(form) {
    

}
  const fileInputRef=useRef();

  async function parseUpload() {
    let response = await post(`${API_URL}/parse-and-upload`, {name: "No.txt", content: text, type: ".txt", user: user.uuid})
  }

  // useEffect(() => {
  //   console.log(currentCount)
  //   console.log(chunkCount)
  // }, [uploadId])

  // useEffect(() => {
  //   console.log("USE EFFECT PROGRESS")
  //   console.log(progress)
  // }, [progress])

// {files ? files.map(file => {return <p>{file.name}</p>}) : null}

//modal-background
//<Modal Component={null} className="modal-background"/>
  return (
    <div>
    {parseText && <Modal Component={ParseText} className="modal-background" close={() => setParseText(false)}/> }
    <div className="container-fluid">

        <input id='fileUpload' type='file' multiple
        accept='*' onChange={(e) => handleChange(e)}
        ref={fileInputRef}
        hidden
/>
<Button onClick={()=>fileInputRef.current.click()} className="m-3">
        <img src="https://cdn-icons-png.flaticon.com/512/2716/2716054.png" alt="" width={30} height={30}/>
        Upload
      </Button>
      <Button  className="m-3" onClick={() => setParseText(true)}> {/**onClick={()=> parseUpload()} */}
        <img src="https://cdn-icons-png.flaticon.com/512/3721/3721819.png" alt="" width={30} height={30}/>
        Parse Text
      </Button>

      {/** 
       <Button onClick={()=> null} className="m-3">
        <img src="https://cdn-icons-png.flaticon.com/512/4997/4997543.png" alt="" width={30} height={30}/>
        Parse Code
      </Button>
      */}
     
     
   
{files ? files.map(file => {return <p>{file.name}</p>}) : null}
            {/*<FileUploader handleChange={handleChange} name="file" className="uploader" label="Drop file or Click to Browse" multiple={true}/> */}
            


         
  
    </div>
</div>
  );
}
