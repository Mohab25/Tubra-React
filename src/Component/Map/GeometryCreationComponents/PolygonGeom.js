import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
//testing geoman
import '@geoman-io/leaflet-geoman-free';  
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  

export default function PolygonGeom({map}) {

    let isGeometryEnabled= useSelector(state=>state.EnableGeometryCreationReducer.GeometryCreation)
    let geomType= useSelector(state=>state.EnableGeometryCreationReducer.geomType)

    useEffect(()=>
    {   
        if(isGeometryEnabled=='enabled'){   
        if(geomType=='polygon'){    
            map.pm.enableDraw('Polygon', {
            snappable: true,
            snapDistance: 20,
            }); 
            }

            
        else if(geomType=='line'){
            map.pm.enableDraw('Line', {
            snappable: true,
            snapDistance: 20,
            });     
        }
        }
        else{
            if(map!=undefined){map.pm.disableDraw()}
        }    
    }
    ,[isGeometryEnabled])
    
    return (
        <div>
            
        </div>
    )
}
