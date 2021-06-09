import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import adjustNavLink from "../../../Actions/FilesActions/adjustNavLinks";
import switchToFilesView from "../../../Actions/FilesActions/switchToFileView";
import {DataSheetGrid,textColumn} from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/index.css'
import './styles/style.css'


export default function Excel_page(props) {
  let [content_ob,setContent]=useState({})
  let FileViewDispatch = useDispatch()
  // the back button clicked on one of the filesView 
  let viewSwitcher = useSelector(state=>state.AdjustNavReducer.switchToFilesView)

  useEffect(()=>{
    fetch(`http://localhost:8000/Reports/doc_content/${props.pk}/`).then(res=>res.json()).then(data=>{
      setContent(JSON.parse(data.content))})
      FileViewDispatch(adjustNavLink())
  },[])
  
  useEffect(()=>{
    if(viewSwitcher==true) {
        FileViewDispatch(switchToFilesView())
        props.changeView('Main')
    }
},[viewSwitcher])


  let data=[]
  let columns = []

  if(Object.keys(content_ob).length!=0){
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
    
    for(let i of Object.keys(content_ob)){
      let ob = {title:i,key:i}
      columns.push(textColumn(ob))
    }
  }
    return (
        <div className='Excel-sheet'>
          <div className='Excel-sheet-container'>
              <DataSheetGrid data={data} columns={columns} lockRows={true}/>
            </div>
        </div>
    )
}
