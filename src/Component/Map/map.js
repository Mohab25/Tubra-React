import React from 'react'
import {useState,useEffect,useRef} from 'react'
import './styles/styles.css'
import {Map,TileLayer,GeoJSON,LayersControl,LayerGroup} from 'react-leaflet'
import './leaflet/leaflet.css'
import MapToolsHolder from './MapToolsHolder/MapToolsHolder'
import city from '../../Data/Obied_city.json'
import streets from '../../Data/Obied_city_streets.json'
import aerodrome from '../../Data/Obeid_Airport.json'


const {Overlay} = LayersControl 

export default function MapComponent() {
    const [mapCenter,setMapCenter] = useState([13.1538432,30.2154278])
    let [zoom,setZoomLevel] = useState(15)
    let [tile,setTile] = useState('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png')
    let [turfJSON,setTurfJSON] = useState()
    let mapRef = useRef();
    let overlay_1_Ref = useRef()
    let overlay_2_Ref = useRef()

    const addLayers=()=>{
        if(mapRef.current && overlay_1_Ref.current){
            const map = mapRef.current.leafletElement
            let overlay_layer1 = overlay_1_Ref.current.leafletElement
            let overlay_layer2 = overlay_2_Ref.current.leafletElement
            console.log('layer2',overlay_layer2);
            [overlay_layer1, overlay_layer2].forEach(layer => map.addLayer(layer));
        }
    }

    const removeLayers=()=>{
        if(mapRef.current && overlay_1_Ref.current){
            const map = mapRef.current.leafletElement
            let overlay_layer1 = overlay_1_Ref.current.leafletElement
            let overlay_layer2 = overlay_2_Ref.current.leafletElement
            console.log('layer2',overlay_layer2);
            [overlay_layer1, overlay_layer2].forEach(layer => map.removeLayer(layer));
                      
        }
    }

    const handleClick=(e)=>{
        console.log(e.latlng);
        //$my_geoJSON = '{ "type": "Point", "coordinates": ['.$longitude.' ,'.$latitude.'] }';

    }

    const make_turf=()=>{
        console.log('Clicked')
        const turf_buffer = window.turf.buffer(aerodrome,0.3,{units:'kilometers'})
        console.log('Turf:',turf_buffer)
        const leafBuffer = <GeoJSON data={turf_buffer} key={2} style={{color:'orange'}}/>
        setTurfJSON(leafBuffer)
    }

    return (
        <div className='Map-outer-container'>
            <div className='Map-container'>
                <Map className='Map' center={mapCenter} zoom={zoom} ref={mapRef} onclick={handleClick}>
                    <LayersControl position='topleft' className='layers-control'>
                    <TileLayer url={tile}/>
                    <Overlay name='Obeid Blocks'>
                        <LayerGroup ref={overlay_1_Ref}>
                        <GeoJSON data={city} key={1} style={{fillColor:'white',color:'none'}}/>
                        </LayerGroup>
                    </Overlay>
                    <Overlay name='Aerodrome'>
                        <LayerGroup ref={overlay_2_Ref}> 
                            <GeoJSON data={aerodrome} key={3} style={{fillColor:'red',color:'none',display:'none'}}/>
                        </LayerGroup> 
                    </Overlay>
                    {/*<GeoJSON data={streets} key={2} style={{color:'orange'}}/>*/}
                </LayersControl>
                    {turfJSON}
                </Map>
                <MapToolsHolder/>
            </div>
            <button onClick={make_turf}>make buffer </button>

        </div>
    )
}


//ref={e => { this.mapInstance = e }}