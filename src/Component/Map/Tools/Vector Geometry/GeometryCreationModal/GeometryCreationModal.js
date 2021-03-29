import React,{useEffect} from 'react'
import CreationForm from '../GeometryCreationForm/GeometryCreationForm'
import {useSelector,useDispatch} from 'react-redux'
import toggleGeometryCreationFormVisibility from '../../../../../Actions/GeometryCreation/ShowHideCreationForm'

export default function GeometryCreationModal() {
    /* Geometry Creation */
    const GeometryCreationFormDisplay = useSelector(state=>state.CreationFormReducer.display)
    const GeometryActionDispatch = useDispatch()
    const closeModal=(e)=>{
        if(e.target.classList.contains('backdrop')){GeometryActionDispatch(toggleGeometryCreationFormVisibility())}
    }
    
    return (
        <div>
            <div className='Vector-point-creation-modal' style={{display:GeometryCreationFormDisplay}}>
                <div className='backdrop' onClick={closeModal}>
                    <div className='modal-inner-holer'>
                        <h2 className='modal-entity-title'>
                            Geometry Creation
                        </h2>
                        <CreationForm/>
                        </div>
                </div>
            </div>
        </div>
    )
}
