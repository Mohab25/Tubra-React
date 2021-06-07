import React from 'react'
import {useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './styles/styles.css'
import {Map,TileLayer,LayersControl,LayerGroup} from 'react-leaflet'
import './leaflet/leaflet.css'
import MapToolsHolder from './MapToolsHolder/MapToolsHolder'
import PavementConstructionGeojson from './GeojsonComponents/PavementConstructionGeojson'
import AerodromeEntityGeoJSON from './GeojsonComponents/AerodromeGeojsonComponent'
import PolygonGeom from './GeometryCreationComponents/PolygonGeom'
import './MakerIcon/styles/styles.css'
import GeometryCreationModal from './Tools/Vector Geometry/GeometryCreationModal/GeometryCreationModal'
import BufferComponent from './BufferComponent/BufferComponent'
import searchBufferAction from "../../Actions/bufferActions/searchBuffer";
import SearchingComponent from "./SearchingComponent/SearchingComponent";


const {Overlay} = LayersControl 

export default function MapComponent() {

/****************************State Variables  *************************************/
    const [mapCenter,setMapCenter] = useState([19.43520370922581,37.23775744610511])
    let [zoom,setZoomLevel] = useState(14)
    let [tile,setTile] = useState('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png')
    let mapRef = useRef();
    let Aerodrome_entities_ref = useRef()
    let pavement_construction_ref = useRef()
     // Distance from the database 
    const [Calculated_distance,setCalculatedDistance] = useState(0)
    /* Linear Measurements */
    const [linear_measure_is_on,toggle_linear_measure] = useState(false)
    const [linear_coords,setLinearCoords]=useState([])
    
    /* Buffer creation */
    const [isBufferActivated,setBufferActive]= useState(false)
    const bufferActivation = useSelector(state=>state.bufferReducer.isBufferToolActivated)
    const searchBufferDispatch = useDispatch()
    const dispatchedBufferDistance  = useSelector(state=>state.BufferAddRemoveReducer.distance)

    /* Geometry Creation */
    const [isVectorActivated,setVectorActive] = useState(false)
    const [mapReference,setMapReference] = useState()

/***************************Linear Measurements and buffer ****************************** */
    const toggleLinearMeasurement=()=>{
        linear_measure_is_on==false?toggle_linear_measure(true):toggle_linear_measure(false)
    }

    const makeLinearMeasurement=(e)=>{
        if(linear_measure_is_on){
            if(linear_coords.length==0){
                // the decimal degrees from leaflet comes with 14 decimal places, limit it to 6
                let first_pair = [parseFloat(e.latlng.lat.toFixed(6)),parseFloat(e.latlng.lng.toFixed(6))]
                setLinearCoords(first_pair)
            }
            else{
                let first_pairs = linear_coords
                let second_pairs = [parseFloat(e.latlng.lat.toFixed(6)),parseFloat(e.latlng.lng.toFixed(6))]
                fetch('http://localhost:8000/spatial_analysis/linear_measure/',{
                    method:'POST',
                    mode:'cors',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({coord1:first_pairs,coord2:second_pairs})
            }).then(res=>res.json()).then(data=>setCalculatedDistance(data*111.32*1000))
            setLinearCoords([])
    }
    }}

/**************************Buffer**************************************************/

    useEffect(()=>{setBufferActive(bufferActivation)},[bufferActivation])

    let createBuffer=(e)=>{
        let geo_g = {"type": "Point","coordinates": [e.latlng.lng, e.latlng.lat]}
        // you have to create the buffer first and search it's radius
        //createDispatch(createAction({'geom':geo_g,'radius':dispatchedBufferDistance/100000}))
        fetch('http://localhost:8000/spatial_analysis/buffer_search/',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(geo_g)
           }).then(res=>res.json()).then(data=>searchBufferDispatch(searchBufferAction(data)))
    }

/**********************************Geometry Creation****************************** */
    // Do the user allowed to make geometries? if so is he/she allowed to persist is to the database even only under his authentication?

    useEffect(()=>{
        if(mapRef){   
            setMapReference(mapRef.current.leafletElement)   
        }
    },[mapRef])

    let activateVector=()=>{
        // simple action vector creation activation. 
        isVectorActivated?setVectorActive(false):setVectorActive(true)
    }

/****************************** Rendering  *********************************/


    return (
        <div className='Map-outer-container'>
            <div className='Map-container'>
                <Map className='Map' center={mapCenter} zoom={zoom} ref={mapRef} onclick={isBufferActivated?createBuffer:makeLinearMeasurement}>
                    <LayersControl position='topleft' className='layers-control'>
                        <TileLayer url={tile}/>
                            <Overlay name='pavement construction'>
                            <LayerGroup ref={pavement_construction_ref}>
                                <PavementConstructionGeojson  map={mapReference}/>                    
                            </LayerGroup>
                            </Overlay>
                            <Overlay name='Aerodrome Entities'>
                                <LayerGroup ref={Aerodrome_entities_ref}>
                                    <AerodromeEntityGeoJSON/>
                                </LayerGroup>
                            </Overlay>
                        <BufferComponent/>  
                    </LayersControl>
                </Map>
                <MapToolsHolder toggleLinearMeasurement={toggleLinearMeasurement} distance={Calculated_distance} activateVector={activateVector} />
                
                <SearchingComponent/>
                <GeometryCreationModal/>
                <PolygonGeom map={mapReference}/>

            </div>
        </div>
    )
}


//ref={e => { this.mapInstance = e }}