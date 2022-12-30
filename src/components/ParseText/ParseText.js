import React, {useState} from "react";
import { Input, Button } from 'rsuite';
import './ParseText.css'
import { API_URL, post } from "../../utils/API";
import { useSelector } from "react-redux";

export default function ParseText({close}) {
    const [name, setName] = useState("")
    const [text, setText]= useState("")
    const user = useSelector(state => state.user)

    async function parseUpload() {
        let response = await post(`${API_URL}/parse-and-upload`, {name: name, content: text, user: user.uuid})
      }

    return (
        <div>
        <div className="container-fluid">
            <div className="row d-flex justify-content-end" >
                <div className="d-flex justify-content-end modal-close-button-container">
                    <img src="https://img.icons8.com/windows/32/FFFFFF/cancel.png" className="modal-close-button" onClick={() => close(false)}/>
                </div>
            </div>
            <div className="row">
            <div className="col-3"></div>
            <div className="col-6 m-5 p-5" style={{backgroundColor:"white", width: "100%", borderRadius: 15}}>
         

                <div style={{display: "flex", alignItems: "center"}}>
                    <h5>Filename</h5>
                    <Input  placeholder="Just the name. Type is auto-processed." style={{borderColor: "black", width: "100%"}} className="m-1" value={name} onChange={(e) => setName(e)}/>
                </div>
              
                <Input 
                    spellcheck={false}
                    as="textarea"  
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                    style={{borderColor: "black", width: "100%", height: "50vh"}} 
                    className="m-1"
                    value={text}
                    onChange={(e) => setText(e)}
                />
               <div className="text-center">
                    <Button appearance="primary" onClick={() => parseUpload()} className="text-center">Parse Text</Button>
               </div>
             
            </div>

            <div className="col-3"></div>
       
            </div>
        </div>
       
       
       
        </div>
    )
}