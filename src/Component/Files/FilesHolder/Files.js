import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import './styles/style.css'
import FileCard from "../FileCard/fileCard.js";

export default function File(props) {

    let [files,setFiles] = useState([])
    let aerodrome_part = useSelector(state => state.FileTypeChangeReducer.aerodrome_part)    
    let file_type = useSelector(state => state.FileTypeChangeReducer.fileType)    

    let titles={
        'word':'Documented Report',
        'excel':'Documented Calcs',
        'pdf':'Documented PDF Report'
    }

    useEffect(()=>{
        let url;
        switch(aerodrome_part){ //http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com
            case 'Runway':{ 
             switch(file_type.toLowerCase()){   
                case 'word': url= 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_runway_word/'; break; 
                case 'excel': url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_runway_excel/'; break; 
                case 'pdf':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_runway_pdf/';break; 
                case 'all files':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_runway_all_files/';break; 
             }
                break;
            }

            case 'Taxiway':{ 
                switch(file_type.toLowerCase()){   
                   case 'word': url= 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_taxiway_word/'; break; 
                   case 'excel': url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_taxiway_excel/'; break; 
                   case 'pdf':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_taxiway_pdf/';break; 
                   case 'all files':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_taxiway_all_files/';break; 
                }
                   break;
               }

            case 'Apron':{ 
            switch(file_type.toLowerCase()){   
                case 'word': url= 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_apron_word/'; break; 
                case 'excel': url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_apron_excel/'; break; 
                case 'pdf':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_apron_pdf/';break; 
                case 'all files':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_apron_all_files/';break; 
            }
                break;
            }

            case 'General':{ 
                switch(file_type.toLowerCase()){   
                    case 'word': url= 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_general_word/'; break; 
                    case 'excel': url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_general_excel/'; break; 
                    case 'pdf':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_general_pdf/';break; 
                    case 'all files':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_general_all_files/';break; 
                }
                    break;
                }

            case 'Reports':{ 
                switch(file_type.toLowerCase()){   
                    case 'word': url= 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_reports_word/'; break; 
                    case 'excel': url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_reports_excel/'; break; 
                    case 'pdf':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_reports_pdf/';break; 
                    case 'all files':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports/obeid_reports_all_files/';break; 
                }
                    break;
                }


        }

        fetch(url).then(res=>res.json()).then(data=>setFiles(data))
    },[aerodrome_part,file_type])

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
                <h5 style={{borderBottom:BBorder()}}>{titles[`${file_type.toLowerCase()}`]}</h5>
                <div className='files-row'>{
                    files.map((item,index)=>{
                    let file_name = item.Name.substring(0,16)
                    let pk = item.pk
                        return <FileCard key={index} changeToDetailedView={props.changeToDetailedView} title={file_name} pk={pk} fileType={item.Document_type.Doc_type.toLowerCase()}/>
                    })}
            </div>
        </div>
        </div>
    </>
    )
}
