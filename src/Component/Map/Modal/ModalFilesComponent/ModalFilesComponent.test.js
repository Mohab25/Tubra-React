import React from 'react'
import DocsModal from './ModalFilesComponent'
import Files from '../../../Files/FilesHolder/Files'
import CAD from '../../../CAD/cads'
import {screen, render, getByText} from '@testing-library/react'

describe('renders correctly',()=>{
    it('renders with the Files and CAD Files',()=>{
        render(<DocsModal tabDisplay='files' Category='pavement' Pavement_Name='apron'/>)
        expect(screen.getByTestId('docsModal-container').style.display).toBe('flex')
        expect(document.querySelector('.modal-entity-title')).toHaveTextContent('pavement')
        expect(document.querySelector('.modal-entity-title')).toHaveTextContent('apron')
    })
})

// for changing the view functionality you need to work with child components. 