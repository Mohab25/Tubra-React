// read Dashboard.md 
import React,{createRef,useState,useLayoutEffect} from 'react'
import './styles/styles.css'
import PieChart from '../D3Circle/D3Circle'
import HorizontalBarChart from '../D3HBar/D3HBar'
import ProjectTable from '../StripeTable/StripeTable'


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

