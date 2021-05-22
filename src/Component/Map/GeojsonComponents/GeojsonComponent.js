import React,{useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {renderToStaticMarkup} from 'react-dom/server'
import {GeoJSON,LayerGroup,Marker,LayersControl} from 'react-leaflet'
import L from "leaflet";
import {divIcon } from 'leaflet'
import createBufferAction from '../../../Actions/bufferActions/createBuffer'
import Legend from '../Legend/Legend'

const {Overlay} = LayersControl 

export default function GeojsonComponent() {

    let Aerodrome_entities_ref = useRef()
    let pavement_construction_ref = useRef()
    
    const [AerodromeEntities,setAerodromeEntitiesData] = useState([])
    const [AerodromeJSONData,reserveAerodromeData] = useState([])

    /* filtered points for custom markers */ 
    const [PointsMarkers,setPointsMarkers] = useState([])
    const [Markers,setMarkers] = useState([])

    const dispatchedBufferDistance  = useSelector(state=>state.BufferAddRemoveReducer.distance)
    const isBufferActivated = useSelector(state=>state.bufferReducer.isBufferToolActivated)
    const createBufferDispatch = useDispatch()

    // what is shown on the modal 
    const [entityModalData,setEntityModalData] = useState(null)
    const [pavementModalData,setPavementModalData] = useState(null)

    /*Legend */
    const [legend,setLegendNames]=useState([])


    useEffect(()=>{
        import_aerodrome_features()
    },[])
    
    const import_aerodrome_features=()=>{
        fetch('http://localhost:8000/AerodromeFeatures/features/').then(res=>res.json()).then((data)=>{
        let points_only=[]
        let filtered_data_without_points = data.features.filter(item=>{   // this is happening because i want data without points as i have custom markers for points 
            if(item.geometry.type!='Point'){return item}
            else {points_only.push(item)}
        })
        setAerodromeEntitiesData(<GeoJSON data={filtered_data_without_points} key={3} style={{color:'green'}} onEachFeature={onEachEntity}/>)
        reserveAerodromeData(filtered_data_without_points);
        setPointsMarkers(points_only)
    })
        
    }

    const onEachEntity=(feature,layer)=>{
        layer.on({
            click:function(e){ 
            L.DomEvent.stopPropagation(e); // this to prevent the click on the map below the layer
            isBufferActivated==false?setEntityModalData(e.target.feature.properties):createBufferDispatch(createBufferAction({'geom':e.target.feature.geometry,'radius':dispatchedBufferDistance/100000}))
        }
        })
    }


/***********************Custom Marker Filtering *******************************/

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
        <Overlay name='Aerodrome Entities'>
            <LayerGroup ref={Aerodrome_entities_ref}>
                {Markers}
                {AerodromeEntities}
            </LayerGroup>
        </Overlay>

        <Overlay name='pavement construction'>
            <LayerGroup ref={pavement_construction_ref}>
                
            </LayerGroup>
        </Overlay>
        <Legend legendItems={Object.keys(legend).length==0?"":legend}/>
    </>
    )
}
