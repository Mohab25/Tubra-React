import React,{useCallback} from 'react'
import './styles/style.css'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default function Doc_v() {

    const quillRef = useCallback((quillWrapper)=>{
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
        new Quill(quillWrapper,{theme:'snow',modules:{toolbar:toolbarOptions}})
    })

    return (
        <div className='wordDocViewer'>
            <div className='wordDocViewerQuillContainer' ref={quillRef}>
                <div className=''></div>
            </div>
        </div>
    )
}
