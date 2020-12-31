import React from 'react'
import {useState,useEffect,useRef} from 'react'
import './styles/styles.css'
import {Map,TileLayer,GeoJSON,LayersControl,LayerGroup} from 'react-leaflet'
import './leaflet/leaflet.css'
import MapToolsPane from './MapToolsPane/MapToolsPane'
import city from '../../Data/Obied_city.json'
import streets from '../../Data/Obied_city_streets.json'
import aerodrome from '../../Data/Obeid_Airport.json'


const {Overlay} = LayersControl 

export default function MapComponent() {
    const [mapCenter,setMapCenter] = useState([13.1538432,30.2154278])
    let [zoom,setZoomLevel] = useState(15)
    let [tile,setTile] = useState('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png')
    
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
    return (
        <div className='Map-outer-container'>
            <div className='Map-container'>
                <Map className='Map' center={mapCenter} zoom={zoom} ref={mapRef}>
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
                </Map>
                <MapToolsPane/>
            </div>
        </div>
    )
}


//ref={e => { this.mapInstance = e }}