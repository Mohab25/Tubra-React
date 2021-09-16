import React,{useEffect, useState,Fragment} from 'react'
import { useSelector } from "react-redux";
import './styles/styles.css'
import LinearMeasurePane from './LinearMeasurePane'
import Tooltip from '../../../Tooltips/Tooltips'
import L from "leaflet";
//geoman
import '@geoman-io/leaflet-geoman-free';  
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  

export default function Measure(props) {
    
    const [MeasureToolColor,setMeasureToolColor] = useState('orange')
    const [LinearMeasurePaneDisplay,setLinearMeasurePaneDisplay] = useState('none')

    // handle toolTips here
    const [toolTipDisplay,toggleTooltipDisplay] = useState('none')
    
    // getting the map 
    let map = useSelector(state=>state.gettingMapRefReducer.MapRef)

    // measure pair
    const [first_latlng,set_first_latlng] = useState([])
    const [sec_latlng,set_sec_latlng] = useState([])

    const [distance,set_distance] = useState(0)
    const [prevPoly,setPrevPoly] = useState() 
    const [polylines,add_polylines] = useState([])

    const toggleMeasureToolColor=()=>{
        MeasureToolColor=='orange'?setMeasureToolColor('orangered'):setMeasureToolColor('orange')
    }

    const toggleLinearMeasurePaneDisplay=()=>{
        LinearMeasurePaneDisplay=='none'?setLinearMeasurePaneDisplay('block'):setLinearMeasurePaneDisplay('none')
    }

    if(LinearMeasurePaneDisplay!='none'){
        map.on('click',(e)=>{
            if(first_latlng.length==0&&sec_latlng.length==0){
                set_first_latlng(e.latlng)
            }
            else if(first_latlng.length!=0&&sec_latlng.length==0){
                set_sec_latlng(e.latlng)
                measure(1,e.latlng)
            }
            else if(first_latlng.length==0&&sec_latlng.length!=0){
                set_first_latlng(e.latlng)
                measure(2,e.latlng)
            }
    })
    }
    const measure =(i,m)=>{
        let l1={},l2={}
        if(i==1){
            l1 = L.latLng(first_latlng.lat,first_latlng.lng)
            l2 = L.latLng(m.lat,m.lng)
            draw(l1,l2)
            set_first_latlng([])
        }
        else{
            l1 = L.latLng(m.lat,m.lng)
            l2 = L.latLng(sec_latlng.lat,sec_latlng.lng)
            draw(l1,l2)
            //set_sec_latlng([])
        }
        
    }

    let draw=(l1,l2)=>{
        let d = l1.distanceTo(l2)
        // let poly = [l1,l2]
        // let polyline = new L.Polyline(poly)
        // polyline.addTo(map)
        // let poly_set=polylines
        // poly_set.push(polyline)
        // add_polylines(poly_set)
        set_distance(d)
    }

    let remove_polylines=()=>{
        for(let p of polylines){
            map.removeLayer(p)
            set_first_latlng([])
            set_sec_latlng([])
            set_distance(0)
        }
    }

    useEffect(()=>{
        if(LinearMeasurePaneDisplay=='none'&& map!=undefined){
            //map.off()
            remove_polylines()
            
        }
    },[LinearMeasurePaneDisplay])

    return (
        <Fragment>
        <div data-testid='measure' className='measure' onClick={()=>{toggleMeasureToolColor();toggleLinearMeasurePaneDisplay();props.toggleLinearMeasurement()}} style={{backgroundColor:MeasureToolColor}} onMouseEnter={()=>toggleTooltipDisplay('flex')} onMouseLeave={()=>{toggleTooltipDisplay('none')}}>
            <div className='measure-container'>
                <div className='measure-box'>
                    <div>
                        <i className='fas fa-ruler'></i>
                    </div>
                </div>
            </div>
        </div>
        <LinearMeasurePane data-testid='linearMeasurePane' display={LinearMeasurePaneDisplay} distance={distance}/>
        <Tooltip display={toolTipDisplay} name='measure' toolIndex={3}/>
        </Fragment>
    )
}
