import React from 'react'
import {useState,useEffect} from 'react'
import {DataSheetGrid,checkboxColumn,textColumn} from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/index.css'

export default function Excel_page() {
    
  const [ data, setData ] = useState([
    { active: true, firstName: 'Elon', lastName: 'Musk' },
    { active: false, firstName: 'Jeff', lastName: 'Bezos' },
  ])

  const columns = [
    checkboxColumn({ title: 'Active', key: 'active' }),
    textColumn({ title: 'First name', key: 'firstName' }),
    textColumn({ title: 'Last name', key: 'lastName' }),
  ]

    
    return (
        <div>
            <DataSheetGrid data={data} columns={columns} lockRows={true}/>
        </div>
    )
}
