import React from 'react'
import './styles/styles.css'
import SearchingComponent from './SearchingComponent/SearchingComponent'

export default function Search() {
    return (
        <div className='search'>
            <div className='search-container'>
                <div className='search-box'>
                    <div>
                        <i className='fa fa-search'>
                        </i>
                    </div>
                </div>
                <SearchingComponent/>
            </div>
        </div>
    )
}
