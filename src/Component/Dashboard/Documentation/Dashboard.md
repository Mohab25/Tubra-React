# Dashboard Component

## General Overview

Dashboard component illustrates the current progress of different activities of a certain project, it holds textual information and charts to represent progress and uses.

## Component structure

beside the parent \<Dashboard/> component, Dashboard holds three child components \<PieChart/>, \<HorizontalBarChart/>, \<ProjectTable/>.

## Dashboard component Type

Functional component.

## Dashboard component Implementation

~~~jsx
export default function Dashboard() {
    let GunttContainerRef = createRef()
    let [GunttContainerDimension,setGunttContainerDimension] = useState({x:0,y:0})
    
    useLayoutEffect(()=>{
        if(GunttContainerRef.current){
            setGunttContainerDimension({
                width:GunttContainerRef.current.clientWidth,
                height:GunttContainerRef.current.clientHeight
            })
        }
    },[])
    return (
        <div className='Dashboard' style={{width:'100%',height:'100%'}}>
            <div className='Dashboard-container' style={{width:'100%',height:'100%'}}>
                <div className='Dashboard-first-row-contents'>
                    
                    <div className='Dashboard-ganttChart-container' ref={GunttContainerRef}>
                        <HorizontalBarChart width={GunttContainerDimension.width} height={GunttContainerDimension.height}/>
                    </div>
                    <div className='Dashboard-pieCharts-container'>
                        <div className='Dashboard-PieChart-card-container'>
                            <h4>Overall progress</h4>
                            <PieChart id_name='c1' width='180' height='180' MainTextSize='2.2em' subTextSize={'.95em'} innerCircleRadius={80} outerCircleInnerRadius={80} outerCircleOuterRadius={90} mainTextColor='white' subTextColor='steelblue' innerCircleColor='white' outerCircleColor='#204dd4' subTextPositionDelta={{dx:'-2.8em',dy:'2em'}}/>
                            <div className='Dashboard-PieChart-card-content'>
                                <div><i className='fa fa-bell' style={{color:'steelblue'}}></i><p>Completed <b>9</b></p></div>
                                <div><i className='fa fa-pen'  style={{color:'orange'}}></i><p>DoorDash <b>12</b></p></div>
                            </div>
                        </div>
                        <div className='Dashboard-PieChart-card-container'>
                            <h4>Overall Delay</h4>
                            <PieChart id_name='c2' width='180' height='180' MainTextSize='2.2em' subTextSize={'.95em'} innerCircleRadius={80} outerCircleInnerRadius={80} outerCircleOuterRadius={90} mainTextColor='white' subTextColor='red' innerCircleColor='white' outerCircleColor='red' subTextPositionDelta={{dx:'-2.8em',dy:'2em'}}/>
                            <div className='Dashboard-PieChart-card-content'>
                                <div><i className='fa fa-bell' style={{color:'red'}}></i><p>Completed <b>9</b></p></div>
                                <div><i className='fa fa-pen'  style={{color:'orange'}}></i><p>DoorDash <b>12</b></p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='Dashboard-second-row-contents'>
                    <div className='Dashboard-Project-Table'>
                        <ProjectTable/>
                    </div>
                    <div className='Dashboard-current-project-info-holder'>
                        <div className='Dashboard-current-project-info-content'>
                            <div><i className='fa fa-bookmark-o'  style={{color:'orange'}}></i><p>Dave Binga</p></div>
                            <h2>Cupidatat commodo <b>65%</b> laboris Lorem laboris.</h2>
                            <p>Dolor commodo est anim fugiat.Consectetur non sit esse elit.Ullamco fugiat ad dolor elit in veniam deserunt mollit ullamco.</p>
                        </div>
                        <div className='Dashboard-current-progress-holder'>
                            <h4>Current Phase </h4>
                            <PieChart id_name='c3' width='180' height='180' MainTextSize='2.2em' subTextSize={'.95em'} innerCircleRadius={80} outerCircleInnerRadius={80} outerCircleOuterRadius={90} mainTextColor='white' subTextColor='#3fb075' innerCircleColor='white' outerCircleColor='#3fb075' subTextPositionDelta={{dx:'-2.8em',dy:'2em'}}/>
                            <div className='Dashboard-PieChart-card-content'>
                                <div><i className='fa fa-bell' style={{color:'#3fb075'}}></i><p>Completed <b>9</b></p></div>
                                <div><i className='fa fa-pen'  style={{color:'orange'}}></i><p>DoorDash <b>12</b></p></div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    )
}
~~~

## Dashboard component State

GunttContainerDimension (obj): holds the dimensions (width, height) of the \<HorizontalBarChart/> child component.

## Dashboard component Properties

None.

## Dashboard component Refs

GunttContainerRef: it refers to \<HorizontalBarChart/> component and used to set the initial values of it's dimensions (width, height).

## Dashboard component Lifecycle

As the component mounts, initial values \<HorizontalBarChart/> width and height are set based on the component styling, then Dashboard renders on screen holding three child components.

## Dashboard component Functions

None.

## Dashboard component Actions Implementation

None.

## Dashboard component Reducers Implementation

None.

## \<PieChart/> Component

### \<PieChart/> component Usage and Functionalities

\<PieChart/> provides visual representation of a current progress of a certain project activity in the form of a pie chart.

### \<PieChart/> component Implementation

~~~jsx
export default function D3Circle(props) {

let [w,setW] = useState(props.width==undefined?'500':props.width); let [h,setH] = useState(props.height==undefined?'500':props.height); 


useEffect(()=>{
    let svg = window.d3.select(`#${props.id_name}`).append('svg').attr('width',w).attr('height',h)
    let circleGroup= svg.append('g').attr('transform',`translate(${props.circle_x==undefined?w/2:props.circle_xx} ${props.circle_y==undefined?h/2:props.circle_y})`)
    let textGroup= svg.append('g').attr('transform',`translate(${props.text_x==undefined?w/2:props.text_x} ${props.text_y==undefined?h/2:props.text_y})`)
    let circle = circleGroup.append('circle').attr('r',props.innerCircleRadius).attr('fill','none').attr('stroke',props.innerCircleColor).attr('stroke-width','3.5')
    let text = textGroup.append('text').text(props.mainText).attr('fill',props.mainTextColor).attr('dx',props.MainTextPositionDelta.dx).attr('dy',props.MainTextPositionDelta.dy).attr('font-size',props.MainTextSize).attr('class','circle-text') 
    let text2 = textGroup.append('text').text(props.subText).attr('fill',props.subTextColor).attr('dx',props.subTextPositionDelta.dx).attr('dy',props.subTextPositionDelta.dy).attr('font-size',props.subTextSize).attr('class','circle-text-2') 
    
    
    let arcGroup = svg.append('g').attr('transform',`translate(${props.circle_x==undefined?w/2:props.circle_x} ${props.circle_y==undefined?h/2:props.props.circle_y})`)
    arcGroup.append('path').attr('d',window.d3.arc().innerRadius( props.outerCircleInnerRadius)
    .outerRadius( props.outerCircleOuterRadius )
    .startAngle(0)
    .endAngle(0.78*Math.PI )
    ).attr('fill',props.outerCircleColor).attr('display',props.outerCircleDisplay)
    
},[])

    return (
        <div id={props.id_name} style={{width:props.w,height:props.height}}>
            
        </div>
    )
}


D3Circle.defaultProps={
    mainText:"1,800",
    subText:'Sesame Exports',
    mainTextColor:'red',
    subTextColor:'red',
    innerCircleColor:'gainsboro',
    outerCircleDisplay:'',
    outerCircleColor:'red',
    innerCircleRadius:100,
    outerCircleInnerRadius:100,
    outerCircleOuterRadius:120,
    MainTextPositionDelta:{dx:'-1.2em',dy:"0"},
    subTextPositionDelta:{dx:'-1.7em',dy:"1.5em"},
    MainTextSize:'3em',
    subTextSize:''
}
~~~

### \<PieChart/> component Type

Functional component.

### \<PieChart/> component State

w (num): sets the width of the svg element that holds the pie chart, it conditionally check component properties for setting the initial value.

h (num): sets the height of the svg element that holds the pie chart, it conditionally check component properties for setting the initial value.

### \<PieChart/> component Properties

mainText (str): holds a numerical value illustrates the current progress of an activity.
subText (str): holds a textual description about the current progress of an activity.
mainTextColor (str): sets the text color of mainText.
subTextColor (str): sets the text color of subText.
innerCircleColor (str): sets color of the inner circle of the pie chart.
outerCircleDisplay (str): define wether the outer circle of the pie chart is displayed.
outerCircleColor (str): sets color of the outer circle of the pie chart.
innerCircleRadius (num): sets the radius of the inner circle.
outerCircleInnerRadius (num): sets the inner radius of the outer circle.
outerCircleOuterRadius (num): sets the outer radius of the outer circle.
MainTextPositionDelta (obj): sets the position of the main text inside the inner circle.
subTextPositionDelta (obj): sets the position of the sub text inside the inner circle.
MainTextSize (str): sets the size of the main text.
subTextSize (str): sets the size of the sub text.

### \<PieChart/> component Lifecycle

As the component mounts, the default values of the D3.js svg, group and circle objects and others necessary to form the pie chart are set, the pie chart then rendered.

### \<PieChart/> component Functions

None

### \<PieChart/> component Actions Implementation

None

### \<PieChart/> component Reducers Implementation

None

## \<HorizontalBarChart/> component

### \<HorizontalBarChart/> component Usage and Functionalities

\<HorizontalBarChart/> provides visual representation of a current progress of multiple project activities in the form of a horizontal bar chart (Guntt chart).

### \<HorizontalBarChart/> component Implementation

~~~jsx
export default function D3HBar(props) {
    useEffect(()=>{
    if(window.d3.select('.D3HBar').select('svg')){
        window.d3.select('.D3HBar').select('svg').remove()
    }

        let data =[{label:'Cat1',value:19},{label:'Cat2',value:13},{label:'Cat3',value:25},{label:'Cat4',value:19},{label:'Cat5',value:30}] 
        let max=window.d3.max(data,function(d){return d.value});let scale = window.d3.scaleLinear().domain([0,max]).range([0,props.width-props.marginHorizontal*2-props.axisHorizontalMargin])        
        let barHeight = (props.height-props.axisVerticalMargin-props.marginVertical*2)*0.4/data.length
        let barPadding = (props.height-props.axisVerticalMargin-props.marginVertical*2)*0.6/data.length 
        let svg = window.d3.select('.D3HBar').append('svg').attr('width',props.width).attr('height',props.height)
        let g = svg.selectAll('g').data(data).enter().append('g').attr('width',props.width).attr('height',barHeight).attr('transform',function(d,index){return `translate(${props.marginHorizontal+props.axisHorizontalMargin},${index*(barHeight+barPadding)+barPadding})`})
        let labelWidth=0
        g.append('text').attr('x',0).attr('y',barHeight/2).attr('dy','0.35em').attr('fill','white').text(function(d){return d.label}).each(function(){labelWidth=this.getBBox().width})
        g.append('rect').attr('height',barHeight).attr('width',function(d){return scale(d.value)}).attr('transform',`translate(${labelWidth},0)`).attr('fill','steelblue')
        let x_axis_scale = window.d3.scaleLinear().domain([0,max]).range([0,props.width-props.marginHorizontal*2-labelWidth])
        let x_axis = window.d3.axisBottom().scale(x_axis_scale).tickSize(-props.height+props.marginVertical)
        svg.insert('g',':first-child').attr('class','x_axis').attr('transform',`translate(${props.marginHorizontal+labelWidth+props.axisHorizontalMargin},${props.height-props.marginVertical})`).call(x_axis)
    },[props])

    return (
        <div className='D3HBar' style={{width:props.width,height:props.height}}>
            
        </div>
    )
}


D3HBar.defaultProps= {
    width:300, 
    height:300,
    marginVertical:30,
    marginHorizontal:25, 
    axisVerticalMargin:7,
    axisHorizontalMargin:7,
    barHeight:25,
    barVerticalMargin:25,
}
~~~

### \<HorizontalBarChart/> component Type

Functional component.

### \<HorizontalBarChart/> component State

None.

### \<HorizontalBarChart/> component Properties

width (num): sets the width of the svg element holds the bar chart.
height (num): sets the height of the svg element holds the bar chart.
marginVertical (num): sets the vertical margins from the svg bounds.
marginHorizontal (num): sets the horizontal margins from the svg bounds.
axisVerticalMargin (num): sets the margin from the x-axis.
axisHorizontalMargin (num): sets the margin from the x-axis.
barHeight (num): sets the bar height.
barVerticalMargin (num): sets the vertical distance between bars.

### \<HorizontalBarChart/> component Lifecycle

As the component mounts, the default values of the D3.js svg, group, rect and axis objects and others necessary to form the pie chart are set, the pie chart then rendered.

### \<HorizontalBarChart/> component Functions

None.

### \<HorizontalBarChart/> component Actions Implementation

None.

### \<HorizontalBarChart/> component Reducers Implementation

None.

## \<ProjectTable/> component

### \<ProjectTable/> component Usage and Functionalities

\<ProjectTable/> provides visual representation of multiple project activities in the form of a table.

### \<ProjectTable/> component Implementation

~~~jsx

~~~

### \<ProjectTable/> component Type

### \<ProjectTable/> component State

### \<ProjectTable/> component Properties

### \<ProjectTable/> component Lifecycle

### \<ProjectTable/> component Functions

### \<ProjectTable/> component Actions Implementation

### \<ProjectTable/> component Reducers Implementation