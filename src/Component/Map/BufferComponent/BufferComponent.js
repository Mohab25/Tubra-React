import React from 'react'

export default function BufferComponent(props) {
     /* Buffer creation */
     const isBufferToolActivated = useSelector(state=>state.bufferToolActivationReducer.isBufferToolActivated)
     const [buffer_data,setBufferData] = useState()
     const [buffer_ob,setBufferOb] = useState()
     const dispatchedBufferDistance  = useSelector(state=>state.BufferAddRemoveReducer.distance)
     const bufferRemoveState = useSelector(state=>state.BufferAddRemoveReducer.bufferRemoveState)
    
     let activateBuffer=()=>{
        // simple action of buffer activation (toggling the state). 
        isBufferActivated?setBufferActive(false):setBufferActive(true)
    }

    let createBuffer=(json_geom)=>{
        /* this takes a geometry and pass it to the backend (calling the ST_MakeBuffer). */
        /*
        1. when the user clicks, prevent the modal if the buffer is activated
        2. get the the geom and pass it.  
        
        params: 
            json_geom (Obj): an object holding both the geojson geom, and the distance of the buffer(coming from dispatchedBufferDistance)
             sent to the back to create a buffer around the geometry.
        */
       fetch('http://localhost:8000/spatial_analysis/make_buffer/',{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(json_geom)
       }).then(res=>res.json()).then(data=>load_buffer(data))
    }

    const load_buffer=(buffer_geojson)=>{
        setBufferData(buffer_geojson)        
    }

    useEffect(()=>{
        let geojson_ob = <GeoJSON key={Math.random()} data={buffer_data} style={{color:'green'}} onEachFeature={removeBuffer}/>
        setBufferOb(geojson_ob) 
    },[buffer_data,bufferRemoveState])


    useEffect(()=>{
        /*
            this is called when the props changes, it calls createBuffer, with props.buffer_creation_data
                props.buffer_creation_data(obj): object holding both the geojson geom and the distance of the buffer   
        */
            createBuffer(props.buffer_creation_data)
    },[props])


    let removeBuffer=(feature,layer)=>{
        layer.on({
            click:function(e){
                L.DomEvent.stopPropagation(e); // this to prevent the click on the map below the layer
                if(bufferRemoveState=='active') layer.options.removeLayer(layer)
            }
        })
    }

    useEffect(()=>{
        console.log('is buffer tool activated?:',isBufferActivated)
    },[isBufferActivated])

     return (
        <div>
            {/*buffer_ob*/}
        </div>
    )
}
