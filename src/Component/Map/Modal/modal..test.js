import React,{useEffect, useState, useRef} from 'react'
import Modal from './modal'
import {render, screen, fireEvent, getByText, waitFor} from '@testing-library/react'

describe('testing functionalities',()=>{
    let data={Category:"Pavement", Pavement_Name:'Apron'}, modalCloser = jest.fn(), disable_func = jest.fn(), map={dragging:{disable:()=>disable_func()}, scrollWheelZoom:{disable:()=>disable_func()}} 
    render(<Modal data={data} modalCloser={modalCloser} map={map}/>)

    it('display the modal when rendered', async () => {
        await waitFor(()=> expect(screen.getByTestId('backdrop')).toBeInTheDocument())
    })

    it('changes tabs upon click events',()=>{
        render(<Modal data={data} modalCloser={modalCloser}/>)
        // component tab
        fireEvent.click(screen.getByText('Component'))
        expect(screen.getByTestId('component-tab').style.display).toBe('flex')
        expect(screen.getByTestId('files-tab').style.display).toBe('none')
        // files tab
        fireEvent.click(screen.getByText('Files'))
        expect(screen.getByTestId('files-tab').style.display).toBe('flex')
        expect(screen.getByTestId('component-tab').style.display).toBe('none')
    })

    it('disables map events when the modal is displayed',()=>{
        render(<Modal data={data} modalCloser={modalCloser} map={map}/>)
        fireEvent.mouseEnter(screen.getByTestId('backdrop'))
        expect(disable_func).toHaveBeenCalledTimes(2)
    })

})