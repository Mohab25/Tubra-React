import React,{useEffect,useState} from 'react'
import './styles/styles.css'
export default function D3Circle(props) {
console.log(props)
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
    .startAngle(0)     // It's in radian, so Pi = 3.14 = bottom.
    .endAngle(0.78*Math.PI )       // if you begin with 0, end with Math.PI will give half a circle
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
    outerCircleDisplay:'', // this wll display the outer circle
    outerCircleColor:'red',
    innerCircleRadius:100,
    outerCircleInnerRadius:100,
    outerCircleOuterRadius:120,
    MainTextPositionDelta:{dx:'-1.2em',dy:"0"},
    subTextPositionDelta:{dx:'-1.7em',dy:"1.5em"},
    MainTextSize:'3em',
    subTextSize:''
}