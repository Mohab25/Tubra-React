import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {GeoJSON} from 'react-leaflet'
import L from 'leaflet'
import createBufferAction from '../../../Actions/bufferActions/createBuffer'
import Modal from '../Modal/modal'
import changeFileType from '../../../Actions/FilesActions/changeFileType'

export default function PavementConstructionGeojson(props) {

    // geojson about pavements constructions
    const [pavementsData, setPavementsData] = useState([])
    const [pavementJSONData,reservePavementData]=useState([]) // raw data without GeoJSON object
    // Buffer
    const dispatchedBufferDistance  = useSelector(state=>state.BufferAddRemoveReducer.distance)
    const isBufferActivated = useSelector(state=>state.bufferReducer.isBufferToolActivated)
    const createBufferDispatch = useDispatch()

    // identify tool activation status 
    let isIdentifyToolActive = useSelector(state=>state.identifyToolActivationReducer.isIdentifyToolActive)

    // what is shown on the modal 
    const [pavementModalData,setPavementModalData] = useState(null)

    let modalDispatch = useDispatch()

    useEffect(()=>{ //http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com
    fetch('http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/AerodromeFeatures/obeid_aerodrome_parts/').then(res=>res.json()).then((data)=>{reservePavementData(data);setPavementsData(<GeoJSON data={data.features} key={2} style={{color:'red'}} onEachFeature={onEachPavementConstruction}/>)})
    },[])
    
    useEffect(()=>{
        setPavementsData(<GeoJSON key={Math.random()} data={pavementJSONData.features} style={{color:'orange'}} onEachFeature={onEachPavementConstruction}/>)
            },[isBufferActivated,isIdentifyToolActive,dispatchedBufferDistance]) // not using dispatchedBufferDistance here caused me a lot of trouble.
    
    const onEachPavementConstruction=(feature,layer)=>{
        layer.on({
            click:function(e){
                L.DomEvent.stopPropagation(e); // this to prevent the click on the map below the layer
                if(isBufferActivated==false){
                    if(isIdentifyToolActive==true){
                        setPavementModalData(e.target.feature.properties)
                        // this will dispatch certain part that will affect the modal files
                        modalDispatch(changeFileType({aerodrome_part:e.target.feature.properties.name,fileType:'all files'}))
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
            {pavementsData}
            {pavementModalData!=null && <Modal map={props.map} data={pavementModalData} modalCloser={setPavementModalData}/>}
        </>
    )
}
