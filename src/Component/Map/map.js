import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './styles/styles.css'
import {Map,TileLayer,GeoJSON,LayersControl,LayerGroup,Polyline,Polygon,Marker} from 'react-leaflet'
import './leaflet/leaflet.css'
import L from "leaflet";
import MapToolsHolder from './MapToolsHolder/MapToolsHolder'
import {divIcon } from 'leaflet'
import PavementConstructionGeojson from './GeojsonComponents/PavementConstructionGeojson'
import AerodromeEntityGeoJSON from './GeojsonComponents/AerodromeGeojsonComponent'
import Modal from './Modal/modal'
import './MakerIcon/styles/styles.css'
import Legend from './Legend/Legend'
import toggleGeometryCreationFormVisibility from '../../Actions/GeometryCreation/ShowHideCreationForm'
import prePopulateGeometry from '../../Actions/GeometryCreation/GeometryCreation'
import GeometryCreationModal from './Tools/Vector Geometry/GeometryCreationModal/GeometryCreationModal'

// testing the buffer Component 
import BufferComponent from './BufferComponent/BufferComponent'

const {Overlay} = LayersControl 

export default function MapComponent() {

/****************************State Variables  *************************************/
    const [mapCenter,setMapCenter] = useState([19.43520370922581,37.23775744610511])
    let [zoom,setZoomLevel] = useState(14)
    let [tile,setTile] = useState('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png')
    let mapRef = useRef();
    let Aerodrome_entities_ref = useRef()
    let pavement_construction_ref = useRef()
    const [lineTest,setLineTest] =  useState({})          
    const [pointTest,setPointTest] = useState({})
     // Distance from the database 
    const [Calculated_distance,setCalculatedDistance] = useState(0)

    // what is shown on the modal 
    const [entityModalData,setEntityModalData] = useState(null)
    const [pavementModalData,setPavementModalData] = useState(null)

    /* Linear Measurements */
    const [linear_measure_is_on,toggle_linear_measure] = useState(false)
    const [linear_coords,setLinearCoords]=useState([])
    
    /* Buffer creation */
    const [isBufferActivated,setBufferActive]= useState(false)
    const bufferActivation = useSelector(state=>state.bufferReducer.isBufferToolActivated)
    const dispatchedBufferDistance  = useSelector(state=>state.BufferAddRemoveReducer.distance)
    const createBufferDispatch = useDispatch()
    /* filtered points for custom markers */ 
    const [PointsMarkers,setPointsMarkers] = useState([])
    const [Markers,setMarkers] = useState([])

    /*Legend */
    const [legend,setLegendNames]=useState([])

    /* Geometry Creation */
    const GeometryActionDispatch = useDispatch()
    const GeometryDispatch = useDispatch()
    const [isVectorActivated,setVectorActive] = useState(false)

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

/**********************************Geometry Creation****************************** */
    // Do the user allowed to make geometries? if so is he/she allowed to persist is to the database even only under his authentication?

    let activateVector=()=>{
        // simple action of buffer activation (toggling the state). 
        isVectorActivated?setVectorActive(false):setVectorActive(true)
    }


    let createPolygon=(e)=>{
        /* takes a group of coords and pass it to the backend, then receive a geometry 
         and pass it as a geojson object to the map, the problematic part is keep 
         tracking of the geometry being created.
         */ 
         // create a Geojson from the data json 
         // add it to the points 

    }

    let createLine=()=>{

    }

    let createPoint=(e)=>{
        /* what is need to create a point geometry is to get the coords, and send them
            to the backend, where the geometry will be created.  
        */
        
        /*
            who to redraw GeoJSON:

        */
            // calling redux to open the Modal. 
            GeometryActionDispatch(toggleGeometryCreationFormVisibility())
            // you need to get the data from creation form... it goes as useSelector and sense the change on redux store, update the state and use the updated state to complete the geometry creation.  
            let json_point=''
            if(PointsMarkers.length!==0){
            //spread the PointsMarkers array and add a jon point to it.  
            let points = [...PointsMarkers]
            json_point = { "type": "Feature", "properties": {'Feature_Name':'Random Point'}, "geometry": { "type": "Point", "coordinates":[e.latlng.lng,e.latlng.lat]}}           
            points.push(json_point)
            setPointsMarkers(points)
            }
    
            // also because the geometry is not defined in the form, it needs to be dispatched from here
            GeometryDispatch(prePopulateGeometry(json_point))

        }

/***********************Custom Marker Filtering *******************************/

useEffect(()=>{
    if(PointsMarkers.length==0){return}
    let points_icons = PointsMarkers.map((item,index)=>{
        return(
            renderToStaticMarkup(        
                <div className='Maker-icon'>
                <div className='Marker-icon-container'>
                    <p>{item.properties.Feature_Name.slice(0,1)}</p>
                </div>
                </div>)
        )
    })
    let icons = points_icons.map((item,index)=>{
        return divIcon({
                html: item,
          });
    })
    
    let markers = icons.map((item,index)=>{
            let pos = PointsMarkers[index].geometry.coordinates
            return <Marker icon={item} position={[pos[1],pos[0]]} key={Math.random()}/>
    })
    setMarkers(markers)

    //also you can account for the legend names here, as the legend names should be unique
    let legend_names = PointsMarkers.map(item=>item.properties.Feature_Name)
    let unique_names = legend_names.filter((value,index,self)=>{
        return self.indexOf(value) === index;
    })
    let Legend_names_object = {}
    unique_names.map(item=>{
        Legend_names_object[item.slice(0,1)]=item
    })
    setLegendNames(Legend_names_object)


},[PointsMarkers])


/****************************** Rendering  *********************************/
    return (
        <div className='Map-outer-container'>
            <div className='Map-container'>
                <Map className='Map' center={mapCenter} zoom={zoom} ref={mapRef} onclick={isBufferActivated?createPoint:makeLinearMeasurement}>
                    <LayersControl position='topleft' className='layers-control'>
                        <TileLayer url={tile}/>
                            <Overlay name='pavement construction'>
                            <LayerGroup ref={pavement_construction_ref}>
                                <PavementConstructionGeojson/>                    
                            </LayerGroup>
                            </Overlay>
                            <Overlay name='Aerodrome Entities'>
                                <LayerGroup ref={Aerodrome_entities_ref}>
                                    <AerodromeEntityGeoJSON/>
                                </LayerGroup>
                            </Overlay>
                        <BufferComponent/>  
                    </LayersControl>
                    {entityModalData!=null && <Modal data={entityModalData} modalCloser={setEntityModalData}/>}
                    {pavementModalData!=null && <Modal data={pavementModalData} modalCloser={setPavementModalData}/>}
                </Map>
                <MapToolsHolder toggleLinearMeasurement={toggleLinearMeasurement} distance={Calculated_distance} activateVector={activateVector}  createPoint={createPoint}/>
                <Legend legendItems={Object.keys(legend).length==0?"":legend}/>
                <GeometryCreationModal/>
            </div>
        </div>
    )
}


//ref={e => { this.mapInstance = e }}