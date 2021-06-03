import React,{useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import {GeoJSON} from 'react-leaflet'
import L from "leaflet";

import createBufferAction from '../../../Actions/bufferActions/createBuffer'
import CustomPointFeatures from './CustomPointsGeoJSON'

import Modal from '../Modal/modal'

export default function GeojsonComponent() {

    const [AerodromeEntities,setAerodromeEntitiesData] = useState([])
    const [AerodromeJSONData,reserveAerodromeData] = useState([])

    /* filtered points for custom markers */ 
    const [PointsMarkers,setPointsMarkers] = useState([])
    

    const dispatchedBufferDistance  = useSelector(state=>state.BufferAddRemoveReducer.distance)
    const isBufferActivated = useSelector(state=>state.bufferReducer.isBufferToolActivated)
    const createBufferDispatch = useDispatch()

    // identify tool activation status 
    let isIdentifyToolActive = useSelector(state=>state.identifyToolActivationReducer.isIdentifyToolActive)

    // what is shown on the modal 
    const [entityModalData,setEntityModalData] = useState(null)


    useEffect(()=>{
        fetch('http://localhost:8000/AerodromeFeatures/features/').then(res=>res.json()).then((data)=>{
            let points_only=[]
            let filtered_data_without_points = data.features.filter(item=>{   // this is happening because i want data without points as i have custom markers for points 
                if(item.geometry.type!='Point'){return item}
                else {points_only.push(item)}
            })
            setAerodromeEntitiesData(<GeoJSON data={filtered_data_without_points} key={3} style={{color:'green'}} onEachFeature={onEachEntity}/>)
            reserveAerodromeData(filtered_data_without_points); // raw data without GeoJSON object
            setPointsMarkers(points_only)
        })
    },[])
    
    useEffect(()=>{
        setAerodromeEntitiesData(<GeoJSON data={AerodromeJSONData} key={Math.random()} style={{color:'green'}} onEachFeature={onEachEntity}/>)
    },[isBufferActivated,isIdentifyToolActive,dispatchedBufferDistance])


    const onEachEntity=(feature,layer)=>{
        layer.on({
            click:function(e){ 
            L.DomEvent.stopPropagation(e); // this to prevent the click on the map below the layer
            if(isBufferActivated==false){
                if(isIdentifyToolActive==true){
                    setEntityModalData(e.target.feature.properties)
                }
            }
            else{
                createBufferDispatch(createBufferAction({'geom':e.target.feature.geometry,'radius':dispatchedBufferDistance/100000}))// the usual in such cases is to use null, in react it gives an error and this is not solved see https://github.com/palantir/tslint/issues/3832
            }
        }
        })
    }
    
    return (
    <>
        {AerodromeEntities}
        <CustomPointFeatures PointsMarkers={PointsMarkers} />
        {entityModalData!=null && <Modal data={entityModalData} modalCloser={setEntityModalData}/>}
    </>
    )
}
