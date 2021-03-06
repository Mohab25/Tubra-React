import React,{ useState,useEffect } from 'react'
import './styles/style.css'

export default function PDFFilePage(props) {

    let [content,setContent]=useState({})

    useEffect(()=>{
      if(props.pk!=undefined){
      fetch(`http://localhost:8000/Reports/doc_content/${props.pk}/`).then(res=>res.json()).then(data=>{
        setContent(data)})
      }
    },[])

    if(Object.keys(content).length!=0){window.open(content.path.replace('localhost:8000','tubra.com'),'_blank')}    
    return (<div></div>)
}


