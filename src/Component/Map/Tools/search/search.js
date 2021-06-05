import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import './styles/styles.css'
import Tooltip from '../../../Tooltips/Tooltips'
import toggleSearchComponentVisibility from '../../../../Actions/searchActions/toggleSearchVisibilityAction'

export default function Search() {
    
    const [SearchBarDisplay,toggleSearchBar] = useState('none')
    const [SearchBoxColor,toggleSearchBoxColor] = useState('orange')

    // handle toolTips here
    const [toolTipDisplay,toggleTooltipDisplay] = useState('none')

    // toggle the search component visibility
    let dispatch = useDispatch()

    const handleClick=(e)=>{
        if(SearchBoxColor =='orange'){
            toggleSearchBoxColor('orangered')
            dispatch(toggleSearchComponentVisibility('flex'))
        }
        else{
            toggleSearchBoxColor('orange')
            dispatch(toggleSearchComponentVisibility('none'))
        }
        
        //SearchBarDisplay=='none'?toggleSearchBar('block'):toggleSearchBar('none')
    }
    
    return (
        <div className='search' style={{backgroundColor:SearchBoxColor}} onMouseEnter={()=>toggleTooltipDisplay('flex')} onMouseLeave={()=>{toggleTooltipDisplay('none')}}>
            <div className='search-container'>
                <div className='search-box' onClick={handleClick}>
                    <div>
                        <i className='fa fa-search'>
                        </i>
                    </div>
                </div>
            </div>
            <Tooltip display={toolTipDisplay} name='search'/>

        </div>
    )
}
