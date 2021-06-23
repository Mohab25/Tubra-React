import React,{useState,useEffect} from 'react'
import './styles/style.css'
import FileCard from "../FileCard/fileCard.js";

export default function File(props) {

    let [files,setFiles] = useState([])
    
    let titles={
        'word':'Documented Report',
        'excel':'Documented Calcs',
        'pdf':'Documented PDF Report'
    }

    useEffect(()=>{
        if(props.preloaded!=true){
        switch(props.fileType){
            case "word":{fetch('http://localhost:8000/Reports/word_docs/').then(res=>res.json()).then(data=>setFiles(data));break};
            case "excel":{fetch('http://localhost:8000/Reports/excel_docs/').then(res=>res.json()).then(data=>setFiles(data));break};
            case "pdf":{fetch('http://localhost:8000/Reports/pdf_docs/').then(res=>res.json()).then(data=>setFiles(data));break};
        }
    }
    else{
        if(props.preloadedData.length==0){setFiles([])}
        
        else{
            setFiles(props.preloadedData)
        }
    }

    },[props.preloadedData])

    const BBorder=()=>{
        switch(props.fileType){
            case 'word':return '6px solid #007bff';
            case 'excel':return '6px solid #3cff00';
            case 'pdf':return '6px solid red';
        } 
    }

    return (
        <>
        <div className='Files'>
            <div>
                <h5 style={{borderBottom:BBorder()}}>{titles[`${props.fileType}`]}</h5>
                <div className='files-row'>{files.map((item,index)=>{
                    let file_name = item.Name.substring(0,16)
                    let pk = item.pk
                    return <FileCard key={index} changeToDetailedView={props.changeToDetailedView} title={file_name} pk={pk} fileType={props.fileType}/>
                })}
            </div>
        </div>
        </div>
    </>
    )
}
