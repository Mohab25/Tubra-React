import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {GeoJSON} from 'react-leaflet'
import L from 'leaflet'
import createBufferAction from '../../../Actions/bufferActions/createBuffer'

export default function PavementConstructionGeojson() {

    // geojson about pavements constructions
    const [pavementsData, setPavementsData] = useState([])
    const [pavementJSONData,reservePavementData]=useState([]) // raw data without GeoJSON object
    // Buffer
    const dispatchedBufferDistance  = useSelector(state=>state.BufferAddRemoveReducer.distance)
    const isBufferActivated = useSelector(state=>state.bufferReducer.isBufferToolActivated)
    const createBufferDispatch = useDispatch()

    // what is shown on the modal 
    const [pavementModalData,setPavementModalData] = useState(null)

    useEffect(()=>{
    fetch('http://localhost:8000/AerodromeFeatures/pavement_constructions/').then(res=>res.json()).then((data)=>{reservePavementData(data);setPavementsData(<GeoJSON data={data.features} key={2} style={{color:'orange'}} onEachFeature={onEachPavementConstruction}/>)})
    },[])
    
    useEffect(()=>{setPavementsData(<GeoJSON key={Math.random()} data={pavementJSONData} style={{color:'orange'}} onEachFeature={onEachPavementConstruction}/>)
            },[isBufferActivated,dispatchedBufferDistance]) // not using dispatchedBufferDistance here caused me a lot of trouble.
    
    const onEachPavementConstruction=(feature,layer)=>{
        layer.on({
            click:function(e){
                L.DomEvent.stopPropagation(e); // this to prevent the click on the map below the layer
                isBufferActivated==false?setPavementModalData(e.target.feature.properties):createBufferDispatch(createBufferAction({'geom':e.target.feature.geometry,'radius':dispatchedBufferDistance/100000}))// the usual in such cases is to use null, in react it gives an error and this is not solved see https://github.com/palantir/tslint/issues/3832
            }
        })
        
    }

    return (
        <div>
            {pavementsData}
        </div>
    )
}
