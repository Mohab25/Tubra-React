import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {GeoJSON} from 'react-leaflet'
import L from "leaflet";

export default function BufferComponent(props) {
     /* Buffer creation */
     const bufferGeomAndRadiusOb = useSelector(state=>state.bufferReducer.bufferGeomAndRadiusOb)
     const [buffer_data,setBufferData] = useState()
     const [buffer_ob,setBufferOb] = useState()
     const bufferRemoveState = useSelector(state=>state.BufferAddRemoveReducer.bufferRemoveState)


    let createBuffer=(json_geom)=>{
        /* this takes a geometry and pass it to the backend (calling the ST_MakeBuffer). */
        /*
        1. when the user clicks, prevent the modal if the buffer is activated
        2. get the the geom and pass it.  
        
        params: 
            json_geom (Obj): an object holding both the geojson geom, and the distance of the buffer(coming from dispatchedBufferDistance)
             sent to the back to create a buffer around the geometry.
        */
       fetch('http://localhost:8000/spatial_analysis/make_buffer/',{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(json_geom)
       }).then(res=>res.json()).then(data=>load_buffer(data))
    }

    const load_buffer=(buffer_geojson)=>{
        setBufferData(buffer_geojson)        
    }

    useEffect(()=>{
        console.log(buffer_ob)
        let geojson_ob = <GeoJSON key={Math.random()} data={buffer_data} style={{color:'green'}} onEachFeature={removeBuffer}/>
        setBufferOb(geojson_ob) 
    },[buffer_data])


    useEffect(()=>{
        /*
            this is called when redux state changes, it calls createBuffer
            bufferGeomAndRadiusOb(obj): object holding both the geojson geom and the distance of the buffer   
        */
        createBuffer(bufferGeomAndRadiusOb)
    },[bufferGeomAndRadiusOb])

    const binga=()=>{
        setBufferOb(null)
    }

    let removeBuffer=(feature,layer)=>{
        layer.on({
            click:function(e){
                L.DomEvent.stopPropagation(e); // this to prevent the click on the map below the layer
                if(bufferRemoveState=='active'){binga()}
            }
        })
    }

     return (
        <div>
            {buffer_ob}
        </div>
    )
}
