import React from 'react'
import {useState,useEffect} from 'react'
import {DataSheetGrid,checkboxColumn,textColumn} from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/index.css'
import './styles/styles2.css'


export default function Excel_page(props) {
  let {content} = props
  let content_ob = JSON.parse(content)
  let data=[]
  //console.log(content_ob['chainage'])
  for(let i of Object.keys(content_ob['chainage'])){
    data.push({'chainage':content_ob['chainage'][i]})
  }

  let columns = []
  for(let i of Object.keys(content_ob)){
    let ob = {title:i,key:i}
    columns.push(textColumn(ob))
    break 
  }

  console.log(data)    
  console.log(columns)    
    return (
        <div className='Excel-sheet'>
          <div className='Excel-sheet-container'>
              <DataSheetGrid data={data} columns={columns} lockRows={true}/>
            </div>
        </div>
    )
}
