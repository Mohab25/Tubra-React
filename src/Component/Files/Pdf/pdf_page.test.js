import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import PDFPage from './pdf_page'

// setting up server i8
const server = setupServer(
  rest.get('http://localhost:8000/Reports/doc_content/1/', (req, res, ctx) => {
    return res(ctx.status(200),ctx.json({ path: 'https://localhost:8000/path/to/pdf_file.pdf' }))
  })
)

beforeAll(() => {
  server.listen()
  // jest cannot access the actual DOM, so we need to mock the window object. 
  window.open = jest.fn()
})
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)

beforeEach(() => {  
})

afterEach(() => {
  server.resetHandlers()
})
// clean up once the tests are done
afterAll(() => {
  server.close()
  window.open = global.window.open;
})
	

//initial rendering test.
describe('testing pdf_page component, it renders individual pdf files', () => {
  it('renders correctly,__snapshot_test__',()=>{
    const {asFragment} = render(<PDFPage/>)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('handle url switch to pdf file',()=>{
  it('fetch the pdf resource',async ()=>{
    render(<PDFPage pk={1}/>)
    await waitFor(() => {expect(window.open).toHaveBeenCalledWith('https://tubra.com/path/to/pdf_file.pdf','_blank')})
    
    // this will only work if _self is the default target not _blank.
    //await waitFor(()=>expect(window.location.href).toBe('https://tubra.com/path/to/pdf_file.pdf')) 

  })

})
