import React, { useEffect, useState} from 'react';
import Background from '../../images/background.jpg';
import './Login.css';
import { userActions } from '../../utils/Slices/userSlice';
import { useSelector, useDispatch } from 'react-redux'
import { API_URL, get, post } from '../../utils/API';
import {Form} from 'react-bootstrap';
import Button from 'rsuite/Button';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function Login({getFiles}) {
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [register, setRegister] = useState(false)
    const [registerInfo, setRegisterInfo] = useState(
        {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
         }
    )
    const dispatch = useDispatch()

    async function registerAccount() {
        if (registerInfo.password != registerInfo.confirmPassword) {
            toast.error("Both should have the same password")
            return
        }

        try {
            let response = await post(`${API_URL}/register-account`, registerInfo)
        } catch {
            return
        }
        
    }

    async function tokenLogin() {
        const token = localStorage.getItem("@toshi-cloud-token")
        if (token === null) {return}
        try {
            var response = await post(API_URL + "/login?token=" + token , {}) 
            dispatch(userActions.updateUuid(response.uuid))
            dispatch(userActions.updateEmail(response.email))
            dispatch(userActions.updateUsername(response.username))
            dispatch(userActions.updateIsLoggedIn(true))
       } catch {
            return
        }
    }

    useEffect(() => {
        tokenLogin()
    }, [])

    async function login() {
        setLoading(true)
        console.log(user)
        try {
            let response = await post(`${API_URL}/login`, user)
            if (response.code === 404 || response.code === 500) {
                setLoading(false)
                toast.error("Wrong credentials!")
                return
            } 
            toast.success("Loggin in")
            setTimeout(() => {
                dispatch(userActions.updateIsLoggedIn(true))
                dispatch(userActions.updateUuid(response.uuid))
                localStorage.setItem("@toshi-cloud-token", response.token)
                dispatch(userActions.updateToken(response.token))
            }, 2000)
        } catch {
            setLoading(false)
            return
        }
        setLoading(false)
    }

    return (
        <div className="login-page">
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
            <div className="login-page-background">
                <img src={Background} alt="" width={"100%"} height={"100%"}/>
            </div>
            <div className='container-fluid login-page-container'>
                <div className='row'>
                    <div className='col-1 col-md-4'></div>
                    <div className='col-10 col-md-4'>
                    {!register ? 
                    <div className='login-page-content-container'> {/**login-page-content-container */}
                        <div className='login-page-content'>
                        
                        <div className='pb-5' style={{width: "100%", height: "auto", display: "flex", justifyContent: "center"}}>
                            <div className='application-logo-container'>
                                    <img src="https://64.media.tumblr.com/5dcead822904f1f1b944e55186c59e58/e28578459c164433-cd/s1280x1920/8a2fa6268ed34ad5ad2cf9589a04cd8221737128.jpg" alt=""  className='application-logo'/>
                            </div>
                        </div>
                        <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>Username</Form.Label>
                              <Form.Control type="email" placeholder="Enter username" onChange={(e) => dispatch(userActions.updateUsername(e.target.value))} value={user.username}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Password</Form.Label>
                              <Form.Control type="password" placeholder="Password" onChange={(e) => dispatch(userActions.updatePassword(e.target.value))} value={user.password}/>
                            </Form.Group>
                            
                            <div className='text-center'>
                                <Button appearance="primary" className='mb-3' onClick={() => login()} loading={loading}>Login</Button>
                                <br></br>
                            <div>
                                <p>No account?</p>
                                <div className='signup' onClick={() => setRegister(true)}>Sign Up</div>
                            </div>
                                
                                
                            </div>
                           
                        </Form>

                    </div>
                    </div>
                :
                <div className='login-page-content-container'> {/**login-page-content-container */}
                        <div className='login-page-content'>
                        <img src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png" width={40} height={40} className="back-button" onClick={() => setRegister(false)}/>
                        <div className='pb-5' style={{width: "100%", height: "auto", display: "flex", justifyContent: "center"}}>
                            <div className='application-logo-container'>
                                    <img src="https://64.media.tumblr.com/5dcead822904f1f1b944e55186c59e58/e28578459c164433-cd/s1280x1920/8a2fa6268ed34ad5ad2cf9589a04cd8221737128.jpg" alt=""  className='application-logo'/>
                            </div>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Email Address</Form.Label>
                              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setRegisterInfo({...registerInfo, email : e.target.value})} value={registerInfo.email}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Username</Form.Label>
                              <Form.Control type="email" placeholder="Enter username" onChange={(e) => setRegisterInfo({...registerInfo, username : e.target.value})} value={registerInfo.username}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Password</Form.Label>
                              <Form.Control type="password" placeholder="Password" onChange={(e) => setRegisterInfo({...registerInfo, password : e.target.value})} value={registerInfo.password}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control type="password" placeholder="Password" onChange={(e) => setRegisterInfo({...registerInfo, confirmPassword : e.target.value})} value={registerInfo.confirmPassword}/>
                            </Form.Group>
                            
                            <div className='text-center'>
                                
                                <br></br>
                                <Button onClick={() => registerAccount()} color="green" appearance="primary" className='mb-3'>Register</Button>
                                <br></br>
                            </div>
                           
                        </Form>
        
                    </div>
                    </div>
                }
                    <div className='col-1 col-md-4'></div>
                </div>
                </div>
        </div>
       
            
        </div>

    )
}