import React from 'react'
import {render, screen} from '@testing-library/react'
import SearchCard from './SearchResultsHolderCard'

describe('render tests',()=>{
    let matches = [{music_title:'test title', Feature_Name:'test feature'}]

    it('renders with BufferSearchDisplay off',()=>{
        render(<SearchCard BufferSearchDisplay='none' matches={matches}/>)
        expect(screen.getByTestId('card-paragraph-off')).toHaveTextContent('test title')
    })

    it('renders with BufferSearchDisplay on',()=>{
        render(<SearchCard BufferSearchDisplay='flex' matches={matches}/>)
        expect(screen.getByTestId('card-paragraph-on')).toHaveTextContent('test feature')
    })
})