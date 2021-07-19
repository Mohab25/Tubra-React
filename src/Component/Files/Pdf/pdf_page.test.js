import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import PDFPage from './pdf_page'


// // what you need to do is to mock the fetch request so when the component mounts check that the fetch is called. 
// // more complicated things is to handle the errors that arises, that's why things like msw is used.
// // last thing is to perform end-to-end test using cypress. the window mock can be avoided this way. 

// setting up server i8
const server = setupServer(
  rest.get('http://localhost:8000/Reports/doc_content/1/', (req, res, ctx) => {
    return res(ctx.status(200),ctx.json({ path: 'https://localhost:8000/path/to/pdf_file.pdf' }))
  })
)


// establish API mocking before all tests
beforeAll(() => {
  server.listen()
  window.location.assign = jest.fn();
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
})
	

// initial rendering test.
describe('testing pdf_page component, it renders individual pdf files', () => {
  it('renders correctly,__snapshot_test__',()=>{
    const {asFragment} = render(<PDFPage/>)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('handle url switch to pdf file',()=>{
  it('fetch the pdf resource',async ()=>{
    render(<PDFPage pk={1}/>)
    await waitFor(()=>expect(window.location.href).toBe('https://localhost:8000/path/to/pdf_file.pdf')) 
    // couldn't find it yet, but the effect of rendering should be tested here.
  })

})


// test('pdf read',()=>{
    // you can use a library like pdfjs to read the pdf file, currently mozilla pdf library api documentation is not completed.
    // also there is a paid pdf library that can be used.
    // })