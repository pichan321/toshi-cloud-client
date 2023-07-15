import { useSelector } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_URL } from "../utils/API"
import { useDispatch } from "react-redux";
import { userActions } from "../utils/Slices/userSlice";
import { Button } from "rsuite";
export default function Startup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const { user: USER, isAuthenticated, isLoading, loginWithRedirect, getIdTokenClaims } = useAuth0();

    useEffect(() => {
        const getUserMetadata = async () => {
            var response = await getIdTokenClaims()
            console.log("TOKEN")
            console.log(response)
            if (!response) {

            }
        }
        getUserMetadata()
       
    }, [isAuthenticated])

    useEffect(() => {
        const getUserMetadata = async () => {
            var response = await getIdTokenClaims()
            console.log("TOKEN")
            console.log(response)
            if (response === null || response === undefined) {
              return
            }
            var token = response.__raw
            var response = await axios.get(`${API_URL}/profile`, {headers: {"authorization": "Bearer " + response.__raw}})
        
            console.log(response)
            if (response.status !== 200) {
              return
            }
            console.log("Dispatching")
            localStorage.setItem("@toshi-cloud", token)
            dispatch(userActions.updateMetadata(response.data))
            dispatch(userActions.updateIsLoggedIn(true))
        }
        getUserMetadata()
       
    }, [isAuthenticated, USER?.sub])

    useEffect(() => {
      const autoLogin = async () => {
        var token = localStorage.getItem("@toshi-cloud")
        var response = await axios.get(`${API_URL}/profile`, {headers: {"authorization": "Bearer " + token}})
        if (response.status !== 200) {
          return
        }
        dispatch(userActions.updateMetadata(response.data))
        dispatch(userActions.updateIsLoggedIn(true))
      }
      autoLogin()
    }, [])

    useEffect(() => {
        console.log(user?.isLoggedIn)
        if (user?.isLoggedIn) {
            navigate("/home")
        }
    })

    return (
        <div className="background">
          <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center">
              <Button onClick={() => loginWithRedirect()}>Login</Button>
            </div>
          </div>
        </div>
      )
}