import React from 'react'
import {useState,useEffect} from 'react'
import {DataSheetGrid,checkboxColumn,textColumn} from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/index.css'
import './styles/styles2.css'


export default function Excel_page(props) {
  let {content} = props
  let content_ob = JSON.parse(content)
  let data=[]
  // for(let i of Object.keys(content_ob)){
  //   for(let j of Object.keys(content_ob[i])){
  //     let ob={}
  //     ob[i] = content_ob[i][j]
  //     // get to the second key, grab the first value and add them to the object.
  //     // continue doing this until you reached the end of keys, then go to the next 
  //     // value... 
  //     data.push(ob)
  //   }
    
  // }

  for(let m of Object.keys(content_ob[Object.keys(content_ob)[0]])){
    let ob = {}
    for(let i=0;i<Object.keys(content_ob).length;i++){
      for(let j=0;j< Object.keys(content_ob[Object.keys(content_ob)[0]]).length;j++){
        ob[Object.keys(content_ob)[i]] = content_ob[Object.keys(content_ob)[i]][m]
        break
        // here the benefit of j that it ensures only one value will be return and then break.
      }
      
    }
    data.push(ob)
  }
  let columns = []
  for(let i of Object.keys(content_ob)){
    let ob = {title:i,key:i}
    columns.push(textColumn(ob))
  }

    return (
        <div className='Excel-sheet'>
          <div className='Excel-sheet-container'>
              <DataSheetGrid data={data} columns={columns} lockRows={true}/>
            </div>
        </div>
    )
}
