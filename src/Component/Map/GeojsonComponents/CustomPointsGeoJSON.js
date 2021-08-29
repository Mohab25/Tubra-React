import React,{useState,useEffect} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {divIcon } from 'leaflet'
import {Marker} from 'react-leaflet'
import Legend from '../Legend/Legend'
import Modal from '../Modal/modal'


export default function CustomPointsGeoJSON({PointsMarkers}) {

    const [Markers,setMarkers] = useState([])
    /*Legend */
    const [legend,setLegendNames]=useState([])
    const [pois,setPois] = useState([])

    useEffect(()=>{
        fetch('http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/AerodromeFeatures/pois/').then(res=>res.json()).then(data=>setPois(data))
    },[])

    useEffect(()=>{
        if(pois.features.length==0){return}
        let points_icons = pois.features.map((item,index)=>{

            return(
                renderToStaticMarkup(        
                    <div className='Maker-icon'>
                    <div className='Marker-icon-container'>
                        <p>{item.properties.point.slice(0,1)}</p>
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
                let pos = pois.features[index].geometry.coordinates
                return <Marker icon={item} position={[pos[0],pos[1]]} key={Math.random()}/>
        })

        setMarkers(markers)
    
        //also you can account for the legend names here, as the legend names should be unique
        let legend_names = pois.features.map(item=>item.properties.point)
        let unique_names = legend_names.filter((value,index,self)=>{
            return self.indexOf(value) === index;
        })
        let Legend_names_object = {}
        unique_names.map(item=>{
            Legend_names_object[item.slice(0,1)]=item
        })
        setLegendNames(Legend_names_object)
    
    
    },[pois])


    return (
        <>
        {Markers}
        <Legend legendItems={Object.keys(legend).length==0?"":legend}/>
        {/*Markers!=null && <Modal data={Markers} modalCloser={setMarkers}/>*/}
        </>
    )
}
