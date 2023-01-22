import React, {useState} from "react";
import { Input, Button } from 'rsuite';
import './ChangePassword.css'
import { API_URL, post } from "../../utils/API";
import { useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { FormGroup, TextField } from "@mui/material";

export default function ChangePassword({close}) {
    const [name, setName] = useState("")
    const [text, setText]= useState("")
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user)
    const [password, setPassword] = useState(
        {
            old_password: "",
            new_password: ""
        }
    )

    async function changePassword() {
        setLoading(true)
        console.log(password)
        try {
            let response = await post(`${API_URL}/change-password`, {...password, token: user.token})
            console.log(response)
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
                <div style={{}}>
                    <FormGroup>
                        <TextField id="standard-basic" label="Old Password" variant="standard" type="password" onChange={(e) => setPassword({...password, old_password: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <TextField id="standard-basic" label="New Password" variant="standard" type="password" onChange={(e) => setPassword({...password, new_password: e.target.value})}/>
                    </FormGroup>
                   
                </div>
               <div className="text-center mt-3">
                    <Button appearance="primary" onClick={() => changePassword()} className="text-center" loading={loading}>Change Password</Button>
               </div>
            </Form>
            </div>

            <div className="col-0"></div>
       
            </div>
        </div>
       
       
       
        </div>
    )
}