import React from 'react'
import './styles.css'
export default function modal({data,modalCloser}) {
    console.log('modal', data)
    
    const closeModal=(e)=>{
        if(e.target.classList.contains('backdrop')){modalCloser(null)}
    }

    return (
        <div className='backdrop' onClick={closeModal}>
            <div className='modal-inner-holer'>
                <h3 className='modal-entity-title'>{data.Category}{data.Feature_Name}</h3>
            </div>
        </div>
    )
}
