import React,{useEffect,useState} from 'react'
import './styles/styles.css'
export default function D3Circle({id_name,width,height,x,y,mainText,subText,mainTextColor,subTextColor,innerCircleColor,outerCircleDisplay,outerCircleColor}) {

let [w,setW] = useState(width==undefined?'500':width); let [h,setH] = useState(height==undefined?'500':height); 


useEffect(()=>{
    let svg = window.d3.select(`#${id_name}`).append('svg').attr('width',w).attr('height',h)
    let circleGroup= svg.append('g').attr('transform',`translate(${x==undefined?w/2:x} ${y==undefined?h/2:y})`)
    let textGroup= svg.append('g').attr('transform',`translate(${x==undefined?w/2:x} ${y==undefined?h/2:y})`)
    let circle = circleGroup.append('circle').attr('r',100).attr('fill','none').attr('stroke',innerCircleColor).attr('stroke-width','3.5')
    let text = textGroup.append('text').text(mainText).attr('fill',mainTextColor).attr('dx','-1.2em').attr('dy','0').attr('class','circle-text') 
    let text2 = textGroup.append('text').text(subText).attr('fill',subTextColor).attr('dx','-1.7em').attr('dy','30').attr('class','circle-text-2') 
    
    
    let arcGroup = svg.append('g').attr('transform',`translate(${x==undefined?w/2:x} ${y==undefined?h/2:y})`)
    arcGroup.append('path').attr('d',window.d3.arc().innerRadius( 100 )
    .outerRadius( 120 )
    .startAngle(0)     // It's in radian, so Pi = 3.14 = bottom.
    .endAngle(0.78*Math.PI )       // if you begin with 0, end with Math.PI will give half a circle
    ).attr('fill',outerCircleColor).attr('display',outerCircleDisplay)
    
},[])

    return (
        <div id={id_name} style={{width:w,height:height}}>
            
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
    outerCircleColor:'red'
}