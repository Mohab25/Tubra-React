import React from 'react'
import {render,cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import PDFPage from './pdf_page'

// cleaning up after each test (unmounting components,..etc.)
afterEach(cleanup);

// initial rendering test.
it('component render correctly',()=>{
  const {PDFPageComponent} = render(<PDFPage/>)
  expect(PDFPageComponent).toMatchSnapshot()
})

