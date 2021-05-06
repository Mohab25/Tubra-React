import React,{useCallback} from 'react'
import './styles/styles2.css'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'


export default function Word_file_page(props) {
    let {title,content} = props

    // config quill lib
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
        let quill = new Quill(quillWrapper,{theme:'snow',modules:{toolbar:toolbarOptions}})
        quill.insertText(0,content)
    })



    // constructing the actual file.
    let doc = 
        <div ref={quillRef}>
            {//h2 className='document-section-headers'>{title.replace('(This is Heading #H2)','')}</h2>
            }
            <p className='document-content'>{content}</p>
        </div>
        
    // constructing the page body.
        return (
        <div className='files-viewer'>
            <div className='files-viewer-container'>
                <div className='files-viewer-side'></div>
                <div className='files-viewer-main-area'>
                    <form>
                    <input name='search' placeholder='search doc..'/>
                    </form>
                    {doc}
                </div>
            </div>
        </div>
                
            
            )
}


