import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
//testing geoman
import '@geoman-io/leaflet-geoman-free';  
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  

export default function PolygonGeom({map}) {

    let isPolygonEnabled= useSelector(state=>state.EnableGeometryCreationReducer.polygonCreation)
    let geomType= useSelector(state=>state.EnableGeometryCreationReducer.geomType)
    
    if(isPolygonEnabled=='enabled'){   
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

    return (
        <div>
            
        </div>
    )
}
