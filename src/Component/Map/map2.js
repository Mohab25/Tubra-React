import React from 'react'
import {useState,useEffect,useRef} from 'react'
import './styles/styles.css'
import {Map,TileLayer,GeoJSON,LayersControl,LayerGroup} from 'react-leaflet'
import './leaflet/leaflet.css'
import MapToolsPane from './MapsToolsPane/MapToolsPane'
import city from '../../Data/Obied_city.json'
import streets from '../../Data/Obied_city_streets.json'
import aerodrome from '../../Data/Obeid_Airport.json'

 

export default function MapComponent() {
    const [mapCenter,setMapCenter] = useState([13.1538432,30.2154278])
    let [zoom,setZoomLevel] = useState(15)
    let [tile,setTile] = useState('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png')
    
    let mapRef = useRef();

    const fly=()=>{
        mapRef.current.leafletElement.flyTo([14,30],15)
    }

    return (
    <>
        <button onClick={fly}>Click</button>
        <Map center={mapCenter} zoom={zoom} ref={mapRef} style={{width:'100%',height:'100%'}}>
            <TileLayer url={tile}/>
        </Map>
    </>  
    )
}
