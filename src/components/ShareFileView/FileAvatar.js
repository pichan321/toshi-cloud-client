import React from "react";

export default function FileAvatar({type}) {
    const image = ["png", "jpg", "gif", "jpeg"]
    const video = ["mp4"]
    const csv = ["csv"]
    const text = ["txt", "json"]
    const excel = ["xlsx", "xls"]

    return (
        <div>
            {image.includes(type) && <img src="https://img.icons8.com/dusk/512/image-file.png" alt="" width={40} height={40}/>}
            {video.includes(type) && <img src="https://img.icons8.com/fluency/512/video.png" alt="" width={40} height={40}/>}
            {csv.includes(type) && <img src="https://img.icons8.com/external-bearicons-flat-bearicons/512/external-CSV-file-extension-bearicons-flat-bearicons.png" alt="" width={40} height={40}/>}
            {excel.includes(type) && <img src="https://img.icons8.com/dusk/512/ms-excel.png" alt="" width={40} height={40}/>}
            {text.includes(type) && <img src="https://img.icons8.com/dusk/512/txt.png" alt="" width={40} height={40}/>}
        </div>
    )
}