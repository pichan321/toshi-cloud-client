import "./Stream.css"
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { get, API_URL } from "../../utils/API";

export default function Stream() {
    const { fileUuid } = useParams();
    const [link, setLink] = useState('')

    useEffect(() => {
    
    const getVideo = async () => {
        try {
            let response = await get(`${API_URL}/stream/${fileUuid}`)
            setLink(response.message)
        } catch {
            return
        }
    }
    
    getVideo()
    }, [])


    return (
        <div className="stream-container">
            {link != "" && 
            <video controls width="100%" height="100%">
                {/**  <source src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" type="video/mp4" /> */}
                <source src={link} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
            </video>}
        </div>
                )
}