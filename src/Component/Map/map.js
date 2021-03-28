import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {useState,useEffect,useRef} from 'react'
import './styles/styles.css'
import {Map,TileLayer,GeoJSON,LayersControl,LayerGroup,Polyline,Polygon,Marker} from 'react-leaflet'
import './leaflet/leaflet.css'
import MapToolsHolder from './MapToolsHolder/MapToolsHolder'
import {divIcon } from 'leaflet'
import Modal from './Modal/modal'
import './MakerIcon/styles/styles.css'
import Legend from './Legend/Legend'


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

    // geojson of Aerodrome Entities
    const [AerodromeEntities,setAerodromeEntitiesData] = useState([])
    const [AerodromeJSONData,reserveAerodromeData] = useState([])

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
    const [buffer_ob,setBufferOb] = useState()

    /* filtered points for custom markers */ 
    const [PointsMarkers,setPointsMarkers] = useState([])
    const [Markers,setMarkers] = useState([])

    /*Legend */
    const [legend,setLegendNames]=useState([])

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

    let createBuffer=(json_geom)=>{
        /* this takes a geometry and pass it to the backend. */
        /*
        1. when the user clicks prevent the modal if the buffer is activated
        2. get the the geom and pass it.  
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
        let geojson_ob = <GeoJSON key={Math.random()} data={buffer_geojson} style={{color:'green'}}/>
        setBufferOb(geojson_ob) 
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





/*****************************Getting the data from Backend *****************8*/
    useEffect(()=>{
        import_aerodrome_features()
        import_pavement_constructions()
    },[])
    
    const import_aerodrome_features=()=>{
        fetch('http://localhost:8000/AerodromeFeatures/features/').then(res=>res.json()).then((data)=>{
        let points_only=[]
        let filtered_data_without_points = data.features.filter(item=>{   // this is happening because i want data without points as i have custom markers for points 
            if(item.geometry.type!='Point'){return item}
            else {points_only.push(item)}
        })
        setAerodromeEntitiesData(<GeoJSON data={filtered_data_without_points} key={3} style={{color:'green'}} onEachFeature={onEachEntity}/>)
        reserveAerodromeData(filtered_data_without_points);
        setPointsMarkers(points_only)
    })
        
    }
    
    const import_pavement_constructions=()=>{
    fetch('http://localhost:8000/AerodromeFeatures/pavement_constructions/').then(res=>res.json()).then((data)=>{reservePavementData(data);setPavementsData(<GeoJSON data={data.features} key={2} style={{color:'orange'}} onEachFeature={onEachPavementConstruction}/>)})
    }

    useEffect(()=>{setPavementsData(<GeoJSON key={Math.random()} data={pavementJSONData} style={{color:'orange'}} onEachFeature={onEachPavementConstruction}/>)
                   setAerodromeEntitiesData(<GeoJSON key={Math.random()} data={AerodromeJSONData} style={{color:'green'}} onEachFeature={onEachEntity}/>)
            },[isBufferActivated])
    const onEachPavementConstruction=(feature,layer)=>{
        layer.on({
            click:function(e){
                isBufferActivated==false?setPavementModalData(e.target.feature.properties):console.log('') // the usual in such cases is to use null, in react it gives an error and this is not solved see https://github.com/palantir/tslint/issues/3832
            }
        })
        
    }

    const onEachEntity=(feature,layer)=>{
        layer.on({
            click:function(e){ 
            isBufferActivated==false?setEntityModalData(e.target.feature.properties):createBuffer({'geom':e.target.feature.geometry,'radius':0.05})
        }
        })
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
                <Map className='Map' center={mapCenter} zoom={zoom} ref={mapRef} onclick={makeLinearMeasurement}>
                    <LayersControl position='topleft' className='layers-control'>
                    <TileLayer url={tile}/>
                    <Overlay name='Aerodrome Entities'>
                        <LayerGroup ref={Aerodrome_entities_ref}>
                            {Markers}
                            {AerodromeEntities}
                        </LayerGroup>
                    </Overlay>

                    <Overlay name='pavement construction'>
                        <LayerGroup ref={pavement_construction_ref}>
                            {pavementsData}
                        </LayerGroup>
                    </Overlay>
                    {buffer_ob}
                    
                </LayersControl>
                    {entityModalData!=null && <Modal data={entityModalData} modalCloser={setEntityModalData}/>}
                    {pavementModalData!=null && <Modal data={pavementModalData} modalCloser={setPavementModalData}/>}
                </Map>
                <MapToolsHolder toggleLinearMeasurement={toggleLinearMeasurement} distance={Calculated_distance} activateBuffer={activateBuffer}/>
                <Legend legendItems={Object.keys(legend).length==0?"":legend}/>
            </div>
        </div>
    )
}


//ref={e => { this.mapInstance = e }}