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


    // what is shown on the modal 
    const [entityModalData,setEntityModalData] = useState(null)
    const [pavementModalData,setPavementModalData] = useState(null)

    /* Linear Measurements */
    const [linear_measure_is_on,toggle_linear_measure] = useState(false)
    const [linear_coords,setLinearCoords]=useState([])
    const [turf_distance,getTurfDistance] = useState(0)

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
                console.log(first_pairs,second_pairs)
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

    useEffect(()=>{
        import_aerodrome_features()
        import_pavement_constructions()
    },[])
    
    
    const import_aerodrome_features=()=>{
        fetch('http://localhost:8000/AerodromeFeatures/features/').then(res=>res.json()).then((data)=>{setAerodromeEntitiesData(<GeoJSON data={data.features} key={3} style={{color:'orange'}} onEachFeature={onEachEntity}/>)})
    }
    
    const import_pavement_constructions=()=>{
    fetch('http://localhost:8000/AerodromeFeatures/pavement_constructions/').then(res=>res.json()).then((data)=>{setPavementsData(<GeoJSON data={data.features} key={2} style={{color:'orange'}} onEachFeature={onEachPavementConstruction}/>)})
    }

    const onEachEntity=(feature,layer)=>{
        //console.log('entity:',layer)
        layer.on({
            click: EntityModalSetter
        })
    }

    const onEachPavementConstruction=(feature,layer)=>{
        layer.on({
            click:PavementModalSetter
        })
        
    }

    const EntityModalSetter=(e)=>{
        setEntityModalData(e.target.feature.properties)
    }

    const PavementModalSetter=(e)=>{
        setPavementModalData(e.target.feature.properties)
    }
    console.log('is linear measurement is on?',linear_measure_is_on)
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
                <MapToolsHolder toggleLinearMeasurement={toggleLinearMeasurement} distance={Calculated_distance}/>
            </div>
        </div>
    )
}


//ref={e => { this.mapInstance = e }}