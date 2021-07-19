import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './styles/style.css'

//setting up mapbox 
mapboxgl.accessToken =
  'pk.eyJ1IjoibW9oYWIiLCJhIjoiY2o2MjIwdWI5MHUwdDMybzA5eGVrY3BzMSJ9._VPMnd9c8s4n4whH95h5Ew';

  export default function Mapbox3D() {
    const mapContainerRef = useRef(null);
    const [center,setCenter] = useState([30.20696,13.1722])
    const [zoom, setZoom] = useState(12);

    useEffect(()=>{
    const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mohab/ckr5i7f7m0wt517n8yuulnzj1',
        center: center,
        zoom: zoom
    })
    // clean
    return () => map.remove();
    },[])

    return (
        <div className='Mapbox3D'>
            <div className='Mapbox3D-container'>
                <div id="mapbox" ref={mapContainerRef}>
                </div>
            </div>   
        </div>
    )
}
