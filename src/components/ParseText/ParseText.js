import React, {useState} from "react";
import { Input, Button } from 'rsuite';
import './ParseText.css'
import { API_URL, post } from "../../utils/API";
import { useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
export default function ParseText({close}) {
    const [name, setName] = useState("")
    const [text, setText]= useState("")
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user)

    async function parseUpload() {
        setLoading(true)
        var token = localStorage.getItem("@toshi-cloud")
        var response
        try {
            response = await axios.post(`${API_URL}/parse-and-upload`, {name: name, content: text, user: user.uuid}, {headers: {"authorization": "Bearer " + token}})
        } catch {
            setLoading(false)
            toast.error("Unable to parse and upload your text. Sorry!")
            return
        }
        if (response.code != 200) {
            setLoading(false)
            toast.error("Unable to parse and upload your text. Sorry!")
            return
        }
        setLoading(false)
        toast.success("Your file is being processed. Check your library.")
        setTimeout(() => {
            close(false)
        }, 3000)
      }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
             />
        <div className="container-fluid">
            <div className="row d-flex justify-content-end" >
                <div className="d-flex justify-content-end modal-close-button-container">
                    <img src="https://img.icons8.com/windows/32/FFFFFF/cancel.png" className="modal-close-button" onClick={() => close(false)}/>
                </div>
            </div>
            <div className="row">
            <div className="col-0"></div>
            <div className="col-12" style={{backgroundColor:"white", width: "100%", borderRadius: 15}}>
         
            <Form className="p-5" style={{width: "100%"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <h5>Filename</h5>
                    <Form.Control  placeholder="Just the name. Type is auto." style={{borderColor: "black", width: "100%"}} className="m-1" value={name} onChange={(e) => setName(e.target.value)} spellCheck={false}/>
                </div>
              
                <Form.Control 
                    spellCheck={false}
                    as="textarea"  
                    placeholder="" 
                    style={{borderColor: "black", width: "100%", height: "50vh"}} 
                    className="m-1"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
               <div className="text-center mt-3">
                    <Button appearance="primary" onClick={() => parseUpload()} className="text-center" loading={loading}>Parse Text</Button>
               </div>
            </Form>
            </div>

            <div className="col-0"></div>
       
            </div>
        </div>
       
       
       
        </div>
    )
}