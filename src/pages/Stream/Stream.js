import "./Stream.css"
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { get, API_URL } from "../../utils/API";
import axios from "axios";

export default function Stream() {
    const { fileUuid } = useParams();
    const [link, setLink] = useState('')

    useEffect(() => {
    
    const getVideo = async () => {
        try {
            var token = localStorage.getItem("@toshi-cloud")
            var response = await axios.get(`${API_URL}/file/stream/${fileUuid}`, {headers: {"authorization": "Bearer " + token}})
            console.log(response)
            if (response?.status !== 200) {
                return
            }
            setLink(response.data.message)
        } catch {
            return
        }
    }
    
    getVideo()
    }, [])

    useEffect(() => {
        console.log(link)
    })

    //https://link.storjshare.io/jwke25jqfibbgsuaum3clfypslea/vattana/d1e8ca6f-b05b-40d1-8f4b-49fcfba6c3a8___genichiro.mp4?wrap=0
    return (
        <div className="stream-container">
            {link != "" && 
            <video controls width="100%" height="100%">
                {/**  <source src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" type="video/mp4" /> */}
                <source src={link && link} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
            </video>}
        </div>
                )
}