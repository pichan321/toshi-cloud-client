import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function Content() {
  const [content, setContent] = useState(null);
  const [type, setType] = useState("");
  const { fileUuid } = useParams();

  useEffect(() => {
    console.log(fileUuid);
    const getContent = async () => {
      try {
        var token = localStorage.getItem("@toshi-cloud");
        var response = await axios.get(`/file/content/${fileUuid && fileUuid}`, {
          baseURL: process.env.REACT_APP_API_URL, // Set the base URL
          headers: {
            Authorization: "Bearer " + token,
          },
          responseType: "blob", // Set the response type to "blob"
        });

        var blob = new Blob([response.data]);
        var contentType = response.headers["content-type"];

        if (contentType.includes("text")) {
          var text = await blob.text();
          console.log("Text");
          console.log(text);
          setContent(text);
          setType(contentType);
        }
        if (contentType.includes("image")) {
          var objectURL = URL.createObjectURL(blob);
          setContent(objectURL);
          setType(contentType);
        }
      } catch (error) {
        console.error(error);
      }
      console.log("Response");
      console.log(response);
    };
    getContent();
  }, [fileUuid]); // Add fileUuid as a dependency

  useEffect(() => {
    console.log(content);
  });

  return (
    <div style={{ background: "white", fontWeight: "bold" }}>
      {type.includes("text") && <pre>{content && content}</pre>}
      {type.includes("image") && <img src={content} alt=""/>}
    </div>
  );
}
