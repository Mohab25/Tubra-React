import React,{useState,useEffect,useCallback} from 'react'
import './styles/styles.css'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'


export default function WordFilePage(props) {
    
    let [content,setContent]=useState('')

    // config quill lib
    let quillRef = useCallback((quillWrapper)=>{
        // this useCallback is used to clean up of the component did unmount
        if(quillWrapper==null) return  // gard clause 
        
        quillWrapper.innerHTML=''  // if there anything from previous remove it.

        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
                    ];


        const quillEditor = document.createElement('div')
        quillWrapper.append(quillEditor)
        let quill = new Quill(quillWrapper,{theme:'snow',modules:{toolbar:toolbarOptions}})
        if(content.content!=undefined) quill.insertText(0,content.content)
    })

    useEffect(()=>{
        if(props.pk!=undefined){
            fetch(`http://localhost:8000/Reports/doc_content/${props.pk}/`).then(res=>res.json()).then(data=>{
            console.log(data);setContent(data)})
        }
    },[])

    useEffect(()=>{
        // quill breaks the natural flow of react, it renders outside react virtual dom, so when the content come from the backend, the toolbar will be duplicated, here is a fix
        let lister = document.querySelectorAll('.ql-toolbar')
        for(let i=0;i<lister.length-1;i++){
            lister[i].style.display = "none";
        }
    },[content])

    useEffect(()=>{
        // as the component is used in the map modal and as quill breaks the natural flow of react, it renders outside react virtual dom, so when changing the view in the map modal, the component does not re-render, there will be multiple duplications of quill toolbar, here is a fix 

        if(props.currentTab!='files'){
            let lister = document.querySelectorAll('.ql-toolbar')
            for(let i=0;i<lister.length;i++){
                lister[i].style.display = "none";
            }
        }
    
        },[props.currentTab])

    // constructing the actual file.
    let doc = 
        <div ref={quillRef} id='quiller'>
            {//h2 className='document-section-headers'>{title.replace('(This is Heading #H2)','')}</h2>
            }
            <p className='document-content' data-testid='content'>{content.content}</p>
        </div>
        
    // constructing the page body.
        return (
        <div className='files-viewer'>
            <div className='files-viewer-container' >
                <div className='files-viewer-side'></div>
                <div className='files-viewer-main-area'>
                    {doc}
                </div>
            </div>
        </div>
                
            
            )
}


