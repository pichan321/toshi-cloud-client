import React, {useState} from "react";
import { Input, Button } from 'rsuite';
import './ParseText.css'
import { API_URL, post } from "../../utils/API";
import { useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';

export default function ParseText({close}) {
    const [name, setName] = useState("")
    const [text, setText]= useState("")
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user)

    async function parseUpload() {
        setLoading(true)
        try {
            let response = await post(`${API_URL}/parse-and-upload`, {name: name, content: text, user: user.uuid})
        } catch {
            setLoading(false)
        }
        setLoading(false)
        close(false)
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