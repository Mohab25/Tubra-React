import React from 'react'
import './styles.css'

export default function AddFilesButton({display}) {
    
    let handleClick=()=>{
        console.log("Add Files");
    }

    return (
        <div style={{display:display}} className='add-files-btn-holder'>
            <div>
                <button className="btn btn-primary add-files-btn" onClick={handleClick}>+</button>
            </div>
        </div>
    )
}
