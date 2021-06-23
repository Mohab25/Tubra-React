import React from 'react'
import {useEffect,useRef} from 'react'
import { Map } from "react-leaflet";
import { CRS } from "leaflet";
import L from 'leaflet'
import './styles/styles.css'

export default function CadViewer(props) {
let _url = props.url
const mapRef = useRef(null);

    useEffect(() => {
      const map = mapRef.current.leafletElement;
      const bounds = [[0,800], [1000,0]];
      const boundary = L.latLngBounds(bounds) 
      const image = L.imageOverlay(
       _url,
        boundary
      ).addTo(map);
  
      map.fitBounds(image.getBounds());

    }, []);
  
    return (
      <div className='Single-CAD-Drawing-Holder'>
        <Map
          ref={mapRef}
          minZoom={0}
          crs={CRS.Simple}
          maxBoundsViscosity={1.0}
          boundsOptions={{ padding: [50, 50] }}
          style={{ height: "100%" }}
        />
      </div>
    );
}
