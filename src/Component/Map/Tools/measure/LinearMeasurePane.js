import React from 'react'
import './styles/styles2.css'
export default function LinearMeasurePane(props) {
    return (
        <div className='LinearMeasurePane' style={{display:props.display}}>
            <div className='LinearMeasurePaneContainer'>
                    <div className='linear-distance-input'>
                        <p>Distance:</p>
                        <input value={props.distance.toFixed(3)} readOnly={true}/>
                    </div>
                    <div className='linear-units-input'>
                        <p>Units:</p>
                        <input value='Meters' readOnly={true}/>
                    </div>
            </div>
        </div>
    )
}
