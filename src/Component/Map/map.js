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
    

    // geojson of Aerodrome Entities
    const [AerodromeEntities,setAerodromeEntitiesData] = useState([])

    // geojson about pavements constructions
    const [pavementsData, setPavementsData] = useState([])


    // what is shown on the modal 
    const [entityModalData,setEntityModalData] = useState(null)
    const [pavementModalData,setPavementModalData] = useState(null)

    /* Linear Measurements */

    const [linear_coords,setLinearCoords]=useState([])
    const [turf_distance,getTurfDistance] = useState(0)

    useEffect(()=>{
        //   let binga = {
        //     "type": "Feature",
        //     "properties":{
        //     "geometry": {
        //       "type": "LineString",
        //       "coordinates": [[13.161856219525403,30.209183692932],[13.148943390922067,30.212831497192]]
        //     }
        // },
        //     "properties": {
        //       "name": "click point"
        //     }
        //   }
          
        // const polyline = [[13.161856219525403,30.209183692932],[13.148943390922067,30.212831497192]]
        // const polygon = [[13.161856219525403,30.209183692932],[13.148943390922067,30.212831497192],[13.161899997566064, 30.219791957933],[13.161856219525403,30.209183692932]]
        // const liner ={ "type": "Feature", "properties": { "OBJECTID": 2, "Id": 0, "Name": "City Road", "Type": "Paved", "Material": "", "Quality": "", "Shape_Length": 0.0058365614402832505 }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ 30.221905609000089, 13.18348770700004 ], [ 30.22189370500007, 13.183488509000085 ], [ 30.221881778000068, 13.183488858000089 ], [ 30.22186984700005, 13.183488751000084 ], [ 30.221857929000066, 13.183488190000048 ], [ 30.221846042000038, 13.183487175000039 ], [ 30.22183420500005, 13.183485708000092 ], [ 30.221822435000036, 13.183483791000072 ], [ 30.221810750000088, 13.183481427000061 ], [ 30.221799167000086, 13.183478619000084 ], [ 30.221787704000064, 13.183475372000089 ], [ 30.221776380000051, 13.183471691000079 ], [ 30.221765209000068, 13.183467581000059 ], [ 30.221754211000075, 13.183463049000068 ], [ 30.221743400000037, 13.183458101000042 ], [ 30.221732794000047, 13.183452744000078 ], [ 30.221722409000051, 13.183446988000071 ], [ 30.221712260000061, 13.18344084000006 ], [ 30.221702363000077, 13.183434310000052 ], [ 30.221692732000065, 13.183427408000057 ], [ 30.221686918000046, 13.183422891000077 ], [ 30.221683383000084, 13.183420144000081 ], [ 30.221674329000052, 13.183412529000066 ], [ 30.22166558400005, 13.183404575000054 ], [ 30.221657162000042, 13.18339629400009 ] ], [ [ 30.221964128000081, 13.183473719000062 ], [ 30.221956183000088, 13.183465474000059 ], [ 30.221947907000072, 13.183457548000092 ], [ 30.221939313000064, 13.183449954000082 ], [ 30.221930415000088, 13.183442705000061 ], [ 30.221921227000053, 13.183435811000038 ], [ 30.221911764000083, 13.183429284000056 ], [ 30.221902041000078, 13.183423135000055 ], [ 30.221892074000039, 13.183417373000054 ], [ 30.22188187900008, 13.183412008000062 ], [ 30.221871473000078, 13.183407048000049 ], [ 30.221860872000036, 13.183402502000092 ], [ 30.221850093000057, 13.183398376000071 ], [ 30.221839153000076, 13.183394677000081 ], [ 30.221828071000061, 13.183391412000049 ], [ 30.221816864000061, 13.183388586000092 ], [ 30.221805551000045, 13.183386202000065 ], [ 30.221794149000061, 13.183384265000086 ], [ 30.221782676000089, 13.183382779000056 ], [ 30.221771152000088, 13.183381745000077 ], [ 30.221759595000037, 13.183381165000071 ], [ 30.221748024000078, 13.183381040000086 ], [ 30.221736457000077, 13.183381370000063 ], [ 30.22172491200007, 13.183382155000061 ], [ 30.221713409000074, 13.183383394000089 ], [ 30.221701966000069, 13.183385084000065 ], [ 30.221690602000081, 13.183387223000068 ], [ 30.221679334000044, 13.183389807000083 ], [ 30.221668181000041, 13.183392832000038 ], [ 30.221657162000042, 13.18339629400009 ] ], [ [ 30.216790778000075, 13.181688104000045 ], [ 30.217495665000058, 13.181768110000064 ], [ 30.218609466000089, 13.181894527000054 ], [ 30.21883319300008, 13.181988043000047 ], [ 30.219499909000035, 13.182321053000067 ], [ 30.219769014000065, 13.182455465000089 ], [ 30.219926571000087, 13.182534161000092 ], [ 30.220058934000065, 13.182601076000083 ], [ 30.220872849000045, 13.183012547000089 ], [ 30.221657162000042, 13.18339629400009 ] ] ] } }
        // const binag = <Polygon pathOptions={{color:'orange'}} positions={polygon} />
        // //<GeoJSON data={binga} key={10} style={{color:'orange'}}/>
        // setLineTest(binag)
        import_aerodrome_features()
        import_pavement_constructions()
    },[])
          
    // putting data to the modal 
    // useEffect(()=>{
    //     /* this will sense any change on the values provided in the list, 
    //         if the change happened the data from the values will be sent to the modal
    //     */
    //    pavementsData.features.map(item=>{
    //     setModalEntity(item.id)
    //    })
    // },[AerodromeEntities,pavementsData])



    // const addLayers=()=>{
    //     /*
    //     this about adding layers using leaflet overlays, layers will appear as 
    //     a drop down to choose from. 
    //     */
    //     if(mapRef.current && overlay_1_Ref.current){
    //         const map = mapRef.current.leafletElement
    //         let overlay_layer1 = overlay_1_Ref.current.leafletElement
    //         let overlay_layer2 = overlay_2_Ref.current.leafletElement
    //         console.log('layer2',overlay_layer2);
    //         [overlay_layer1, overlay_layer2].forEach(layer => map.addLayer(layer));
    //     }
    // }

    // const removeLayers=()=>{
    //     if(mapRef.current && overlay_1_Ref.current){
    //         const map = mapRef.current.leafletElement
    //         let overlay_layer1 = overlay_1_Ref.current.leafletElement
    //         let overlay_layer2 = overlay_2_Ref.current.leafletElement
    //         console.log('layer2',overlay_layer2);
    //         [overlay_layer1, overlay_layer2].forEach(layer => map.removeLayer(layer));
                      
    //     }
    // }

    
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

    // const handleClick=(e)=>{
    //     const {lat,lng} = e.latlng;
    //     const JSON_point = {
    //         "type": "Feature",
    //         "geometry": {
    //           "type": "Point",
    //           "coordinates": [lng, lat]
    //         },
    //         "properties": {
    //           "name": "click point"
    //         }
    //       }
        
    //     linear_measure(e.latlng)
    //     make_turf(JSON_point)
    // }

    // const linear_measure=(coords)=>{
    //     console.log('linear coords:',linear_coords)
    //     console.log('linear coords length:',linear_coords.length)
    //     const {lat,lng} = coords
    //     let coords_arr=[lat,lng]
    //     let coords_arr_of_arr = [coords_arr]
    //     if(linear_coords.length==0){
    //         console.log('first condition')
    //         setLinearCoords(coords_arr_of_arr)
    //     }
    //     if(linear_coords.length==1){
    //         console.log('condition')
    //         console.log('is it array ?',linear_coords[0])
    //         let from = window.turf.point(linear_coords[0])
    //         let to = window.turf.point(coords_arr_of_arr[0])
    //         let options = {units: 'kilometers'};
    //         let distance = window.turf.distance(from, to, options);
    //         console.log('distance:',distance)
    //         const distance_meters = distance*1000
    //         getTurfDistance(distance_meters)
    //     }

    // }


    // const make_turf=(Point_JSON)=>{
    //     const turf_buffer = window.turf.buffer(Point_JSON,0.3,{units:'kilometers'})
    //     console.log('Turf:',turf_buffer)
    //     const leafBuffer = <GeoJSON data={turf_buffer} key={Math.random()} style={{color:'orange'}}/>
    //     setTurfJSON(leafBuffer)
    // }

    return (
        <div className='Map-outer-container'>
            <div className='Map-container'>
                <Map className='Map' center={mapCenter} zoom={zoom} ref={mapRef}>
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
                <MapToolsHolder turf_distance={turf_distance}/>
            </div>
        </div>
    )
}


//ref={e => { this.mapInstance = e }}