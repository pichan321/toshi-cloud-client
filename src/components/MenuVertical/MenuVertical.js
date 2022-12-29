import React, { useEffect, useState } from "react";
import MenuVerticalIcon from "../../images/menu-vertical.png";
import MenuVerticalHoverIcon from "../../images/menu-vertical-hover.png";
import MenuVerticalOptions from "./MenuVerticalOptions";

export default function MenuVertical({file, getFiles}) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    if (showOptions) {
        setClicked(true)
    } else {
        setClicked(false)
    }
  })

  return (
    <div className="menu-vertical-container justify-content-center">
        <div className="menu-vertical-options">
            {showOptions && <MenuVerticalOptions file={file} getFiles={getFiles} setShowOptions={setShowOptions} showOptions={showOptions}/>}
        </div>
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setShowOptions(!showOptions)}>
            {(hovered || clicked) ? (
                <img src={MenuVerticalIcon} alt="" className="menu-vertical" />
            ) : (
                <img src={MenuVerticalHoverIcon} alt="" className="menu-vertical" />
            )}
        </div>
     
    
  

    </div>
  );
}
