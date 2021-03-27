import React from 'react'
import {useState,useEffect,useRef} from 'react'
import './styles/styles.css'
import {Map,TileLayer,GeoJSON,LayersControl,LayerGroup,Polyline,Polygon} from 'react-leaflet'
import './leaflet/leaflet.css'
import MapToolsHolder from './MapToolsHolder/MapToolsHolder'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L, { FeatureGroup } from 'leaflet'
import Modal from './Modal/modal'

// this is for maker to show up:
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const {Overlay} = LayersControl 

export default function MapComponent() {
    const [mapCenter,setMapCenter] = useState([19.43520370922581,37.23775744610511])
    let [zoom,setZoomLevel] = useState(14)
    let [tile,setTile] = useState('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png')
    let [turfJSON,setTurfJSON] = useState()
    let mapRef = useRef();
    let Aerodrome_entities_ref = useRef()
    let overlay_2_Ref = useRef()
    let pavement_construction_ref = useRef()
    const [lineTest,setLineTest] =  useState({})          
    const [pointTest,setPointTest] = useState({})
     // Distance from the database 
    const [Calculated_distance,setCalculatedDistance] = useState(0)

    // geojson of Aerodrome Entities
    const [AerodromeEntities,setAerodromeEntitiesData] = useState([])

    // geojson about pavements constructions
    const [pavementsData, setPavementsData] = useState([])
    const [pavementJSONData,reservePavementData]=useState([])

    // what is shown on the modal 
    const [entityModalData,setEntityModalData] = useState(null)
    const [pavementModalData,setPavementModalData] = useState(null)

    /* Linear Measurements */
    const [linear_measure_is_on,toggle_linear_measure] = useState(false)
    const [linear_coords,setLinearCoords]=useState([])
    
    /* Buffer creation */
    const [isBufferActivated,setBufferActive] = useState(false)


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


    let activateBuffer=()=>{
        isBufferActivated?setBufferActive(false):setBufferActive(true)
    }

    let createBuffer=()=>{
        /* this takes a geometry and pass it to the backend. */
        /*
        1. when the user clicks prevent the modal if the buffer is activated
        2. get the the geom and pass it.  
        */
    }


/**********************************Geometry Creation****************************** */
    // Do the user allowed to make geometries? if so is he/she allowed to persist is to the database even only under his authentication?


    let createPolygon=()=>{
        /* takes a group of coords and pass it to the backend, then receive a geometry 
         and pass it as a geojson object to the map, the problematic part is keep 
         tracking of the geometry being created.
         */
        

    }

    let createLine=()=>{

    }

    let createPoint=()=>{

    }


    useEffect(()=>{
        import_aerodrome_features()
        import_pavement_constructions()
    },[])

    const onEachPavementConstruction=(feature,layer)=>{
        let bufferState = isBufferActivated
        layer.on({
            click:function(e){
                bufferState==false?setPavementModalData(e.target.feature.properties):console.log('') // the usual in such cases is to use null, in react it gives an error and this is not solved see https://github.com/palantir/tslint/issues/3832
            }
        })
        
    }


    
    const import_aerodrome_features=()=>{
        fetch('http://localhost:8000/AerodromeFeatures/features/').then(res=>res.json()).then((data)=>{setAerodromeEntitiesData(<GeoJSON data={data.features} key={3} style={{color:'orange'}} onEachFeature={onEachEntity}/>)})
    }
    
    const import_pavement_constructions=()=>{
    fetch('http://localhost:8000/AerodromeFeatures/pavement_constructions/').then(res=>res.json()).then((data)=>{reservePavementData(data);setPavementsData(<GeoJSON data={data.features} key={2} style={{color:'orange'}} onEachFeature={onEachPavementConstruction}/>)})
    }

    useEffect(()=>{setPavementsData(<GeoJSON key={Math.random()} data={pavementJSONData} style={{color:'orange'}} onEachFeature={onEachPavementConstruction}/>)},[isBufferActivated])

    const onEachEntity=(feature,layer)=>{
        //console.log('entity:',layer)
        layer.on({
            click: EntityModalSetter
        })
    }

    const EntityModalSetter=(e)=>{
        setEntityModalData(e.target.feature.properties)
    }

    return (
        <div className='Map-outer-container'>
            <div className='Map-container'>
                <Map className='Map' center={mapCenter} zoom={zoom} ref={mapRef} onclick={makeLinearMeasurement}>
                    <LayersControl position='topleft' className='layers-control'>
                    <TileLayer url={tile}/>
                    <Overlay name='Aerodrome Entities'>
                        <LayerGroup ref={Aerodrome_entities_ref}>
                            {AerodromeEntities}
                        </LayerGroup>
                    </Overlay>

                    <Overlay name='pavement construction'>
                        <LayerGroup ref={pavement_construction_ref}>
                            {pavementsData}
                        </LayerGroup>
                    </Overlay>
                    
                    
                </LayersControl>
                    {entityModalData!=null && <Modal data={entityModalData} modalCloser={setEntityModalData}/>}
                    {pavementModalData!=null && <Modal data={pavementModalData} modalCloser={setPavementModalData}/>}
                </Map>
                <MapToolsHolder toggleLinearMeasurement={toggleLinearMeasurement} distance={Calculated_distance} activateBuffer={activateBuffer}/>
            </div>
        </div>
    )
}


//ref={e => { this.mapInstance = e }}