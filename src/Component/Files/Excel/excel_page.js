import React from 'react'
import {DataSheetGrid,textColumn} from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/index.css'
import './styles/style.css'


export default function Excel_page(props) {
  let {content} = props
  let content_ob = JSON.parse(content)
  let data=[]
 
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
