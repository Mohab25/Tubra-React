import React from 'react'
import {useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Map } from "react-leaflet";
import { CRS } from "leaflet";
import L from 'leaflet'
import './styles/styles.css'
import adjustCADNavLink from "../../Actions/CADActions/adjustNavLinks";
import switchToCADSView from "../../Actions/CADActions/switchToCADView";



export default function CadViewer(props) {
let _url = props.url
const mapRef = useRef(null);
const CADViewDispatch = useDispatch()
let viewSwitcher = useSelector(state=>state.AdjustCADNavReducer.switchToCADsView)


    useEffect(() => {
      const map = mapRef.current.leafletElement;
      const bounds = [[0,500], [500,0]];
      const boundary = L.latLngBounds(bounds) 
      const image = L.imageOverlay(
       _url,
        boundary
      ).addTo(map);
  
      map.fitBounds(image.getBounds());

      CADViewDispatch(adjustCADNavLink())

    }, []);
  
    useEffect(()=>{
      if(viewSwitcher==true) {
        CADViewDispatch(switchToCADSView())
          props.changeView('CADS')
      }
  },[viewSwitcher])


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
