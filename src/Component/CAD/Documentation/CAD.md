# CAD Component

## General Overview

CAD component is responsible for displaying CAD Drawings -Stored in jpg/png formats in the underlying file system, it provides the user with limited capabilities of zooming/panning/printing.

## Component structure

CAD component is composed of three components, \<CADS/>, \<CadViewer/>, \<CadCard/>.

## \<CADS/>

### \<CADS/> Usage and Functionalities

CADS component holds cad files as an interactive list of cards (in it's main view) where user can choose from files fetched from the database as the component mounts, or it holds \<CadViewer/> component for individual file view as the user clicks on an individual file, it also holds a search input to filter the cards list.

### \<CADS/> Implementation

~~~jsx
export default function CADS(props) {
    let [view,setView] = useState('CADS')
    let [cad_content,setCADContent] = useState({})
    let [CADDocs,SetCADDocs] = useState([])
    useEffect(()=>{
        fetch('http://localhost:8000/CAD/drawings/').then(res=>res.json()).then(
            data=>{
                SetCADDocs(data)
            }
            )  
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    const handleClick=async (pk)=>{
            await fetch(`http://localhost:8000/CAD/cad/${pk}/`).then(res=>res.json()).then(data=>{
            setCADContent(data)
            })
        switch(view){
            case 'CADS':{setView('CADView')};break;  
        }
    
    }
    switch(view){
        case 'CADView':{return(<CAD title={cad_content.Title} url={cad_content.url}/>)};
        
        default:{
          let cads = CADDocs.map((item,index)=>{
            return(
              <Fragment key={index}>
              <Cad_card handleClick={handleClick} title={item.Title} url={item.url} pk={item.id}/>
              </Fragment>
            )
          })
            return (
                <>
                    <div className='CAD'>
                        <div className='CAD-container' style={{display:props.CADContainerDisplay}}>
                            <div className='CAD-side' style={{display:props.sidebarDisplay}}></div>
                            <div className='CAD-main-area'>
                                <form onSubmit={handleSubmit} style={{display:props.formDisplay}}>
                                <input name='search' placeholder='search..'/>
                                </form>
                                <div className='CAD-Cards-Holder'>
                                {cads}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        
        }
}
    }
    CADS.defaultProps={
        CADContainerDisplay:'grid',
        sidebarDisplay:'',
        formDisplay:''

    }
~~~

### \<CADS/> Component Type

Functional component

### \<CADS/> State

view (str): controls the current view rendered on the screen, it holds one of a two values; 'CADS' which hints the screen to render an interactive list of cards, each card is a cad file with a preview and a title, the other value is 'CADView' which hints the screen to render \<CadViewer/> component.

CADDocs (array): holds different cad files that are rendered in the CAD component main view, files are fetched as the component mounts and the default empty value of CADDocs is changed.  

cad_content (obj): holds information fetched as the user clicks on a card regarding a specific cad file , as the view changes to individual cad view, this object is sent as a prop to \<CadViewer/> component.

### \<CADS/> Properties

CADContainerDisplay (str): define if the component is displayed inside Map modal or not, possible values are 'grid' or 'none'.

sidebarDisplay (str): define if the bar is displayed with the component, possible values are '' or 'none'.

formDisplay (str): define if the form containing search input is displayed, possible values are '' or 'none'.

### \<CADS/> Lifecycle

As the component mounts several states are created with default values, files are fetched from the database and default value of CADDocs state changes according to the incoming data, two functions (handleSubmit, handleClick) are created and hooked to html elements when the component displayed, the value of the view state is evaluated and accordingly either a list of cards or a detailed view is rendered.

### \<CADS/> Functions

handleClick(pk->int): fetch for specific file according to pk param value, and changes  cad_content state to the value coming, it then switches the view state to detailed view.

handleSubmit(e->obj): defines what happens when a search term input, currently it prevents the default behavior of submit.

### \<CADS/> Actions Implementation

None.

### \<CADS/> Reducers Implementation

None.

## \<CadViewer/> Component

### \<CadViewer/> Usage and Functionalities

CadViewer renders individual CAD files, it uses leaflet map component to perform simple operations on the CAD file (pan, zoom).

### \<CadViewer/> Implementation

~~~jsx
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
~~~

### \<CadViewer/> Component Type

Functional component

### \<CadViewer/> State

None

### \<CadViewer/> Properties

_url (str): define the CAD file url.

### \<CadViewer/> Lifecycle

As the component mount several properties attached to the leaflet map component (as bounds, and CAD file used as image overly), the map then renders on the screen holding the file.

### \<CadViewer/> Functions

None

### \<CadViewer/> Actions Implementation

None

### \<CadViewer/> Reducers Implementation

None

## \<CadCard/> Component

### \<CadCard/> Usage and Functionalities

CadCard component holds brief information about each file (name, preview, description), it's used by \<CADS/> component to give the user the ability to choose which file to preview in detail.

### \<CadCard/> Implementation

~~~jsx
export default function CadCard({pk, title,handleClick}) {
    return (
        <div className='cad-card'>
            <div className='cad-card-container'>
                <div className='cad-card-img' data-testid="cad-img" onClick={()=>handleClick(pk)} style={{backgroundImage:`url(${CAD_bg})`}}></div>
                <div className='cad-card-body'>
                    <h6><b>{title}</b></h6>
                    <p>Ipsum ullamco do commodo culpa tempor id qui culpa.</p>
                </div>
            </div>
        </div>
    )
}
~~~

### \<CadCard/> Component Type

Functional component

### \<CadCard/> State

None

### \<CadCard/> Properties

pk (num): used to construct the url which will be used with \<CadViewer/> component.
title (str): used in the preview of the cad file in \<CADS/> component list.
handleClick (func): passed from \<CADS/> component, as the user clicks it renders \<CadViewer/> component with specific properties.  

### \<CadCard/> Lifecycle

As the component mounts, it construct the body of the card with a title, preview image and description.  

### \<CadCard/> Functions

None

### \<CadCard/> Actions Implementation

None

### \<CadCard/> Reducers Implementation

None
