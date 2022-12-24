import React from "react";
import './Modal.css'

export default function Modal({Component, close}) {


    return (
        <div className="modal-background">
            <Component className="modal-component" close={close}/>
        </div>
    )
}