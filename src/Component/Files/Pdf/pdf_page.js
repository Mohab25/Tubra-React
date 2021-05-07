import React,{ useState,useEffect } from 'react'
import './styles/style.css'

export default function Word_file_page(props) {

    let [content,setContent]=useState({})

    useEffect(()=>{
      fetch(`http://localhost:8000/Reports/doc_content/${props.pk}/`).then(res=>res.json()).then(data=>{
        setContent(data)})
  
    },[])

    if(Object.keys(content).length!=0){console.log(content); window.location.href=content.path}    
    return (<></>)
}


