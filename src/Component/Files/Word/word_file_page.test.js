import React from 'react'
import '@testing-library/jest-dom'
import {render,screen,getByTestId} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import WordComponent from "./word_file_page";

beforeAll(() => {
    global.MutationObserver = class {
        constructor(callback) {}
        disconnect() {}
        observe(element, initObject) {}
        takeRecords() {return []}
      };
      global.document.getSelection = function() {}
  })

// server setup 
const server = setupServer(
    rest.get('http://localhost:8000/Reports/doc_content/1/',(req,res,ctx)=>{
        return res(ctx.json({content:'incoming stream'}))
    })
)

// listen before all tests
beforeAll(()=>server.listen())
// rest handler after each test
afterEach(()=>server.resetHandlers())
// clean after all tests are done
afterAll(()=>server.close())

// testing
describe('testing word document viewer component',()=>{
    it('renders correctly,__snapshot_test__',()=>{
        const {asFragment} = render(<WordComponent/>)
        expect(asFragment()).toMatchSnapshot()
    })
    // it('change the viewer content according to api response',()=>{
    //     //quill paragraph cannot be sensed from here
    //     const {getByTestId} =  render(<WordComponent/>)
    //     expect(getByTestId('content')).toHaveTextContent('incoming stream')
    // })
})