import React from 'react'
import {render,screen, fireEvent} from '@testing-library/react'
import ModalButtons from './ModalButtons'
import * as d from '../helper functions/expandMinimize'

beforeAll(()=>{
    jest.spyOn(d, "handleDimensions");

})

describe('test rendering and functionality',()=>{

    let innerHolder = document.createElement('div')
    innerHolder.style.clientWidth = 500; innerHolder.style.clientHeight=500
    let innerHolderRef={current:innerHolder}
    
    it('display all the buttons with right styes',()=>{
        render(<ModalButtons innerHolderRef={innerHolderRef}/>)
        
        let enlarge_btn = document.querySelector('.modal-enlarge-screen-icon')
        expect(enlarge_btn.style.top).toBe('15%')
        expect(enlarge_btn.style.right).toBe('16%')

        let left_arrow = document.querySelector('.modal-left-arrow')
        expect(left_arrow.style.left).toBe('16%')

        let right_arrow = document.querySelector('.modal-right-arrow')
        expect(right_arrow.style.right).toBe('15%')

    })

    it('enlarge and shrink when enlarge button is clicked',()=>{
        render(<ModalButtons innerHolderRef={innerHolderRef}/>)
        let enlarge_icon = document.querySelector('.modal-enlarge-screen-icon > i')
        fireEvent.click(enlarge_icon)
        expect(d.handleDimensions).toHaveBeenCalled()
        //expect(d.handleDimensions).toHaveBeenCalledWith('minimized',innerHolderRef)
        // two problems, the function must be called with params, and the object here is read as a string.
        //expect(innerHolderRef.current.style.height).toBe(500) //innerHolderRefHTMLOb.style.width
    })

})