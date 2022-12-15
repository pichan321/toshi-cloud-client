import './ProgressBar.css'
import React from 'react'

export default function ProgressBar({width}) {

    return (
        <div className="progress-bar-container">
            <div className="progress" style={{width: width}}></div>
        </div>
    )
}