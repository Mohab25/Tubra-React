// read Dashboard.md 
import React from 'react'
import './styles/styles.css'
import PieChart from '../D3Circle/D3Circle'


export default function Dashboard() {
    
    return (
        <div className='Dashboard' style={{width:'100%',height:'100%'}}>
            <div className='Dashboard-container' style={{width:'100%',height:'100%'}}>
                <div className='ganttChart-container'></div>
                <div className='Dashboard-pieCharts-container'>
                    <PieChart id_name='c1' width='300' height='300'/>
                    <PieChart id_name='c2' width='300' height='300'/>
                </div>
            </div>
        </div>
    )
}

