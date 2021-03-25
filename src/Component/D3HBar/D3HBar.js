import React,{useEffect,createRef} from 'react'
import './styles/styles.css'

export default function D3HBar(props) {
    useEffect(()=>{
    /* this is because the width and height from parent changes, the previous svg has to be deleted first otherwise there will be two */
    if(window.d3.select('.D3HBar').select('svg')){
        window.d3.select('.D3HBar').select('svg').remove()
    }

        let data =[{label:'Cat1',value:19},{label:'Cat2',value:13},{label:'Cat3',value:25},{label:'Cat4',value:19},{label:'Cat5',value:30}] 
        // setting up the scale
        let max=window.d3.max(data,function(d){return d.value});let scale = window.d3.scaleLinear().domain([0,max]).range([0,props.width-props.marginHorizontal*2-props.axisHorizontalMargin])        
        // setting the bar height from the data, 40% of the total height without margin and axis, divided by the number of bars
        let barHeight = (props.height-props.axisVerticalMargin-props.marginVertical*2)*0.4/data.length
        // setting up the bar paddings 
        let barPadding = (props.height-props.axisVerticalMargin-props.marginVertical*2)*0.6/data.length 
        let svg = window.d3.select('.D3HBar').append('svg').attr('width',props.width).attr('height',props.height)
        let g = svg.selectAll('g').data(data).enter().append('g').attr('width',props.width).attr('height',barHeight).attr('transform',function(d,index){return `translate(${props.marginHorizontal+props.axisHorizontalMargin},${index*(barHeight+barPadding)+barPadding})`})
        // get the label width so the bars are horizontally push by the value of the labels 
        let labelWidth=0
        g.append('text').attr('x',0).attr('y',barHeight/2).attr('dy','0.35em').attr('fill','white').text(function(d){return d.label}).each(function(){labelWidth=this.getBBox().width})
        g.append('rect').attr('height',barHeight).attr('width',function(d){return scale(d.value)}).attr('transform',`translate(${labelWidth},0)`).attr('fill','steelblue')
        // create the Axis 
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
    barVerticalMargin:25
}