import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
// actions
import toggleGeometryCreationFormVisibility from '../../../Actions/GeometryCreation/ShowHideCreationForm'
//geoman
import '@geoman-io/leaflet-geoman-free';  
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  


export default function PolygonGeom({map}) {

    // sense the geometry creation action
    let isGeometryEnabled= useSelector(state=>state.EnableGeometryCreationReducer.GeometryCreation)
    let geomType= useSelector(state=>state.EnableGeometryCreationReducer.geomType)

    // geometry creation modal dispatch
    let geometryCreationModalDispatch = useDispatch()

    useEffect(()=>
    {   // the actual drawing happens here
        /*
            this useEffect sense if their any change in the reducer's GeometryCreation state
            if so check is this state change evaluates to "enabled", if so check the geometry type
            and enable the draw mode.
            if the state is evaluated to "disabled" end the draw mode. 
        */
        console.log('geoman ',isGeometryEnabled)
        if(isGeometryEnabled=='enabled'){

        if(geomType=='polygon'){
            // disable whatever been set previously 
            map.pm.disableDraw()
            // open draw mode     
            map.pm.enableDraw('Polygon', {
            snappable: true,
            snapDistance: 20,
            continueDrawing:true,
            finishOn:'snap'
            }); 
        }

            
        else if(geomType=='line'){
            // disable whatever been set previously 
            map.pm.disableDraw()
            // open draw mode     
            map.pm.enableDraw('Line', {
            snappable: true,
            snapDistance: 20,
            continueDrawing:true,
            finishOn:'dblclick',
            });     
        }
        
        else if(geomType=='point'){
            // disable whatever been set previously 
            map.pm.disableDraw()
            // open draw mode     
            map.pm.enableDraw('CircleMarker', {
            snappable: true,
            snapDistance: 206
            
            });     
        }
    }
        else{
            if(map!=undefined){
                map.pm.disableDraw()
                
            }
        }    
    }
    ,[isGeometryEnabled,geomType])

    // firing the modal after the shape drawing is completed
    if(map!=undefined){map.on('pm:create',(shape,layer)=>{
        /*
            this where the modal fired after the creation of the shape is completed,
            the map prop (map instance) listen to pm:create event, it get fired when 
            the shape complete drawing and dispatch a modal creation action.
        */
       // the creation form should be fired after the user dblclick on the item
        geometryCreationModalDispatch(toggleGeometryCreationFormVisibility())
    })

}


    return (
        <div>
            
        </div>
    )
}
