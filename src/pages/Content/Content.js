import React, { useEffect, useState} from "react";
import { useParams } from "react-router";
import { get, API_URL } from "../../utils/API";

export default function Content() {
    const [content, setContent] = useState(null)
    const { fileUuid } = useParams();

    useEffect(() => {
        const getContent = async () => {
            try {
                let response = await get(`${API_URL}/content/${fileUuid}`);
                setContent(response.content)
            } catch {return}
        }
        getContent()
    }, [])

    return (
        <div style={{background: "white", fontWeight: "bold"}}>
            <p>{content}</p>
        </div>
    )
}