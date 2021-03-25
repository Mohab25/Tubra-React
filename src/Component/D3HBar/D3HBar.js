import React,{useEffect,createRef} from 'react'
import './styles/styles.css'

export default function D3HBar(props) {
    useEffect(()=>{
    /* this is because the width and height from parent changes, the previous svg has to be deleted first otherwise there will be two */
    if(window.d3.select('.D3HBar').select('svg')){
        window.d3.select('.D3HBar').select('svg').remove()
    }

        let data =[{label:'Cat1',value:10},{label:'Cat2',value:20},{label:'Cat3',value:30},{label:'Cat4',value:40},{label:'Cat5',value:50}] 
        // setting up the scale
        let max=window.d3.max(data,function(d){return d.value});let scale = window.d3.scaleLinear().domain([0,max]).range([0,props.width-props.marginHorizontal*2])        
        // setting up the bar vertical margin
        let barVerticalMargin = (props.height-props.axisVerticalMargin-props.marginVertical*2)*0.6/data.length
        // setting the bar height from the data 
        let barHeight = (props.height-props.axisVerticalMargin*2-props.marginVertical*2)*0.4/data.length

        let svg = window.d3.select('.D3HBar').append('svg').attr('width',props.width).attr('height',(barHeight*data.length+props.marginVertical))
        let g = svg.selectAll('g').data(data).enter().append('g').attr('width',props.width).attr('height',barHeight).attr('transform',function(d,index){return `translate(${props.marginHorizontal+props.axisHorizontalMargin},${index*barHeight+barVerticalMargin*2})`})
        g.append('rect').attr('height',barHeight).attr('width',function(d){return scale(d.value)}).attr('fill','steelblue')
    
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
    barVerticalMargin:25
}