import React,{useState,useEffect} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {divIcon } from 'leaflet'
import {Marker} from 'react-leaflet'
import Legend from '../Legend/Legend'

export default function CustomPointsGeoJSON({PointsMarkers}) {

    const [Markers,setMarkers] = useState([])
    /*Legend */
    const [legend,setLegendNames]=useState([])

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


    return (
        <>
        {Markers}
        <Legend legendItems={Object.keys(legend).length==0?"":legend}/>
        </>
    )
}
