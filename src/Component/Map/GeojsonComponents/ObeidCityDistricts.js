import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {GeoJSON} from 'react-leaflet'
import L from 'leaflet'
import createBufferAction from '../../../Actions/bufferActions/createBuffer'
import Modal from '../Modal/modal'

export default function ObeidDistrictsGeojson(props) {

    const [ObeidDistrictssData, setObeidDistrictssData] = useState([])
    const [ObeidDistrictsJSONData,reserveObeidDistrictsData]=useState([]) // raw data without GeoJSON object
    // Buffer
    //const dispatchedBufferDistance  = useSelector(state=>state.BufferAddRemoveReducer.distance)
    //const isBufferActivated = useSelector(state=>state.bufferReducer.isBufferToolActivated)
    //const createBufferDispatch = useDispatch()

    // identify tool activation status 
    //let isIdentifyToolActive = useSelector(state=>state.identifyToolActivationReducer.isIdentifyToolActive)

    // what is shown on the modal 
    const [ObeidDistrictsModalData,setObeidDistrictsModalData] = useState(null)

    useEffect(()=>{ //http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com
    fetch('http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/City_Features/obeid_districts/').then(res=>res.json()).then((data)=>{reserveObeidDistrictsData(data);setObeidDistrictssData(<GeoJSON data={data.features} key={Math.random()} style={{color:'white'}} /*onEachFeature={onEachObeidDistricts}*//>)})
    },[])
    
    // useEffect(()=>{setObeidDistrictssData(<GeoJSON key={Math.random()} data={ObeidDistrictsJSONData} style={{color:'orange'}} onEachFeature={onEachObeidDistricts}/>)
    //         },[isBufferActivated,isIdentifyToolActive,dispatchedBufferDistance]) // not using dispatchedBufferDistance here caused me a lot of trouble.
    
    // const onEachObeidDistricts=(feature,layer)=>{
    //     layer.on({
    //         click:function(e){
    //             L.DomEvent.stopPropagation(e); // this to prevent the click on the map below the layer
    //             if(isBufferActivated==false){
    //                 if(isIdentifyToolActive==true){
    //                     setObeidDistrictsModalData(e.target.feature.properties)
    //                 }
    //             }
    //             else{
    //                 createBufferDispatch(createBufferAction({'geom':e.target.feature.geometry,'radius':dispatchedBufferDistance/100000}))// the usual in such cases is to use null, in react it gives an error and this is not solved see https://github.com/palantir/tslint/issues/3832
    //             }
                
    //         }
    //     })
        
    // }

    return (
        <div>
            {ObeidDistrictssData}
            {/*ObeidDistrictsModalData!=null && <Modal map={props.map} data={ObeidDistrictsModalData} modalCloser={setObeidDistrictsModalData}/>*/}
        </div>
    )
}
