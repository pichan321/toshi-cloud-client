import React, { useEffect, useState} from "react";
import { useParams } from "react-router";
import { get, API_URL } from "../../utils/API";

export default function Content() {
    const [content, setContent] = useState(null)
    const [type, setType] = useState("")
    const { fileUuid } = useParams();

    useEffect(() => {
        const getContent = async () => {
            try {
                let response = await fetch(`${API_URL}/content/${fileUuid}`).then(response => response.blob()).then(async (blob) =>
                {

                    var contentType = blob.type

                    if (contentType === "text/plain") {
                        var text = await blob.text()
                        setContent(text)
                        setType(contentType)
                    }
                    if (contentType === "image/jpg") {
                        var objectURL = URL.createObjectURL(blob);
                        setContent(objectURL)
                        setType(contentType)
                    }
                })
            } catch {return}
        }
        getContent()
    }, [])

    return (
        <div style={{background: "white", fontWeight: "bold"}}>
        {type === "text/plain" && <pre>{content}</pre>}
        {type.includes("image") && <img src={content}/>}


        </div>
    )
}