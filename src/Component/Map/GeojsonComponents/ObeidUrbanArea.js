import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {GeoJSON} from 'react-leaflet'
import L from 'leaflet'
import createBufferAction from '../../../Actions/bufferActions/createBuffer'
import Modal from '../Modal/modal'

export default function ObeidUrbanAreaGeojson(props) {

    const [ObeidUrbanAreasData, setObeidUrbanAreasData] = useState([])
    const [ObeidUrbanAreaJSONData,reserveObeidUrbanAreaData]=useState([]) // raw data without GeoJSON object
    // Buffer
    //const dispatchedBufferDistance  = useSelector(state=>state.BufferAddRemoveReducer.distance)
    //const isBufferActivated = useSelector(state=>state.bufferReducer.isBufferToolActivated)
    //const createBufferDispatch = useDispatch()

    // identify tool activation status 
    //let isIdentifyToolActive = useSelector(state=>state.identifyToolActivationReducer.isIdentifyToolActive)

    // what is shown on the modal 
    const [ObeidUrbanAreaModalData,setObeidUrbanAreaModalData] = useState(null)
    const [offset,setOffset] = useState(0)

    useEffect(()=>{
        fetch(`http://tubra.com/City_Features/obeid_urban_area/?limit=1000&offset=${0}&/`).then(res=>res.json()).then(data=>{reserveObeidUrbanAreaData(data.features);setOffset(1000)})
    },[])

    useEffect(()=>{ //http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com
        let len = ObeidUrbanAreaJSONData.length
        if(ObeidUrbanAreaJSONData.length>=11000){
            let geojson_ob = {type: "FeatureCollection", features:ObeidUrbanAreaJSONData}
            
            setObeidUrbanAreasData(<GeoJSON key={Math.random()} data={geojson_ob} style={{color:'white',border:'none'}}/>) // #FF1493, #00FFFF
        }
    },[ObeidUrbanAreaJSONData])

    useEffect(()=>{
        if(offset<11000 && offset!=0){
            fetch(`http://tubra.com/City_Features/obeid_urban_area/?limit=1000&offset=${offset}&/`).then(res=>res.json()).then(data=>{let new_builds= ObeidUrbanAreaJSONData.concat(data.features);reserveObeidUrbanAreaData(new_builds);setOffset(offset+1000);})
        }
        
    },[offset])
    
    // useEffect(()=>{setObeidUrbanAreasData(<GeoJSON key={Math.random()} data={ObeidUrbanAreaJSONData} style={{color:'orange'}} onEachFeature={onEachObeidUrbanArea}/>)
    //         },[isBufferActivated,isIdentifyToolActive,dispatchedBufferDistance]) // not using dispatchedBufferDistance here caused me a lot of trouble.
    
    // const onEachObeidUrbanArea=(feature,layer)=>{
    //     layer.on({
    //         click:function(e){
    //             L.DomEvent.stopPropagation(e); // this to prevent the click on the map below the layer
    //             if(isBufferActivated==false){
    //                 if(isIdentifyToolActive==true){
    //                     setObeidUrbanAreaModalData(e.target.feature.properties)
    //                 }
    //             }
    //             else{
    //                 createBufferDispatch(createBufferAction({'geom':e.target.feature.geometry,'radius':dispatchedBufferDistance/100000}))// the usual in such cases is to use null, in react it gives an error and this is not solved see https://github.com/palantir/tslint/issues/3832
    //             }
                
    //         }
    //     })
        
    // }
// unless the data is full return an empty div
if(ObeidUrbanAreasData.length>=11000){
    return(
        <></>
    )
}
else{
    return (
        <div>
            {ObeidUrbanAreasData}
            {/*ObeidUrbanAreaModalData!=null && <Modal map={props.map} data={ObeidUrbanAreaModalData} modalCloser={setObeidUrbanAreaModalData}/>*/}
        </div>
    )
}

}
