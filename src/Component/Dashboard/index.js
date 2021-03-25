// read Dashboard.md 
import React,{createRef,useState,useLayoutEffect} from 'react'
import './styles/styles.css'
import PieChart from '../D3Circle/D3Circle'
import HorizontalBarChart from '../D3HBar/D3HBar'

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
                <div className='Dashboard-ganttChart-container' ref={GunttContainerRef}>
                    <HorizontalBarChart width={GunttContainerDimension.width} height={GunttContainerDimension.height}/>
                </div>
                <div className='Dashboard-pieCharts-container'>
                    <div className='Dashboard-PieChart-card-container'>
                        <h4>Overall progress</h4>
                        <PieChart id_name='c1' width='180' height='180' MainTextSize='1.5em' subTextSize={'.5em'} innerCircleRadius={80} outerCircleInnerRadius={80} outerCircleOuterRadius={90} mainTextColor='steelblue' subTextColor='steelblue' outerCircleColor='steelblue'/>
                        <div className='Dashboard-PieChart-card-content'>
                            <div><i className='fa fa-bell' style={{color:'steelblue'}}></i><p>Completed <b>9</b></p></div>
                            <div><i className='fa fa-pen'  style={{color:'orange'}}></i><p>DoorDash <b>12</b></p></div>
                        </div>
                    </div>
                    <div className='Dashboard-PieChart-card-container'>
                        <h4>Overall Delay</h4>
                        <PieChart id_name='c2' width='180' height='180' MainTextSize='1.5em' subTextSize={'.5em'} innerCircleRadius={80} outerCircleInnerRadius={80} outerCircleOuterRadius={90} mainTextColor='red' subTextColor='red' outerCircleColor='red'/>
                        <div className='Dashboard-PieChart-card-content'>
                            <div><i className='fa fa-bell' style={{color:'green'}}></i><p>Completed <b>9</b></p></div>
                            <div><i className='fa fa-pen'  style={{color:'orange'}}></i><p>DoorDash <b>12</b></p></div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    )
}

