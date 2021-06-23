# Files Component

## General Overview

Files component handles searching and viewing of project files (including reports, calculations, engineering docs, references, ...etc.)  in three formats (textual ms word-like format, sheets format and pdf).

## component structure

beside the parent \<Files/> component, it holds five child components, \<File/>, \<WordDoc/>, \<ExcelDoc/>, \<PdfDoc/>, \<SearchBar/>, \<FileCard/>.

## \<Files/> component Implementation

~~~jsx

export default function Files() {
    let [view,setView] = useState('Main')
    let [files,setFiles] = useState([])
    let [initialFiles,setInitialFiles] = useState([]) 
    let [filtered,filter] = useState([])
    const changeToDetailedView=async (filetype,pk)=>{
        switch(filetype){
            case 'word':{setView({file_view:'word',pk:pk})};break;  
            case 'excel':{setView({file_view:'excel',pk:pk})};break;  
            case 'pdf':{setView({file_view:'pdf',pk:pk})};break;   
        }
    
    }

    useEffect(async ()=>{
        let returned_files
        let func = ()=>{
            return Promise.all(
                ['word','excel','pdf'].map((item,index)=>{
                return(
                <File key={index} fileType={item} changeToDetailedView={changeToDetailedView}/>
                )
            })).then(vals=>returned_files=vals) 
        }

        await func()

        setFiles(returned_files)
        setInitialFiles(returned_files)
    },[])


    useEffect(()=>{
        
        if(initialFiles.length!=0)
        {
            if(filtered.length!=0){
            let word_files = [], excel_files = [], pdf_files = [];
            filtered.map((item,index)=>{
                if(item.Document_type.Doc_type=='Word'){word_files.push(item)}
            })
            filtered.map((item,index)=>{
                if(item.Document_type.Doc_type=='Excel'){excel_files.push(item)}
            })
            filtered.map((item,index)=>{
                if(item.Document_type.Doc_type=='PDF'){pdf_files.push(item)}
            })
            
            let returned_word_files = <File preloaded={true} preloadedData={word_files} changeToDetailedView={changeToDetailedView} fileType='word'/> 
            let returned_excel_files = <File preloaded={true} preloadedData={excel_files} changeToDetailedView={changeToDetailedView} fileType='excel'/> 
            let returned_pdf_files = <File preloaded={true} preloadedData={pdf_files} changeToDetailedView={changeToDetailedView} fileType='pdf'/> 
            let returned_files_all = [returned_word_files, returned_excel_files, returned_pdf_files]
        
            setFiles(returned_files_all)

            }
                
        
        else{
            setFiles(initialFiles)
        }
    }

    },[filtered])

    switch(view.file_view){
        case 'word':{return(<WordDoc pk={view.pk} changeView={setView}/>)}
        case 'excel':{return(<ExcelDoc pk={view.pk} changeView={setView}/>)}
        case 'pdf':{return(<PdfDoc pk={view.pk}/>)}; 
        default:{

            return (
                <>
                <div className='files'>
                    <SearchBar filter={filter}/>
                    <div className='files-container'>
                        <div className='files-side'></div>
                        <div className='files-main-area'>
                            {files.map((item,index)=>{return item})}
                        </div>
                    </div>
                </div>
                </>
                    )
    }
        
    }
    }

~~~

## \<Files/> component Type

Functional component.

## \<Files/> component State

view (str): define the current rendered view (either the main view which holds a list of files or a detailed view), possible values are 'Main','word','excel','pdf'.
files (arr): a list holds a group of files with specific type.
initialFiles (arr): a list holds a group of files with specific type (used in the first render before any filter).
filtered (arr): a list holds a group of files with specific type (used as a filter is applied).

## \<Files/> component Properties

None.

## component Functions

changeToDetailedView(filetype,pk) : switches the main view to one of the three detailed views that render the file by updating view state.
params:
    filetype (str): define the type of the detailed view file.
    pk (num): used to co construct a url to fetch data from database.

## component Lifecycle

As the component mounts, default values of states are set and functions get created, files are loaded from \<File/> child component and state gets updated, a switch statement checks the current view and according to it's value either the main view or a detailed view is rendered. once a user clicks upon a certain file, the view changes and a detailed view is rendered.

## component Actions Implementation

None.

## component Reducers Implementation

None.

## \<File/> component

### \<File/> component Usage and Functionalities

\<File/> component is responsible of fetching data from database according to data type and rendering different sections of \<Files/> component. if this component is been called before from \<Files/> component (i.e when filter is applied), it prevents re-fetching data.

### \<File/> component Implementation

~~~jsx

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

~~~

### \<File/> component Type

Functional component.

### \<File/> component State

files (arr): a list holding data fetched from database.

### \<File/> component Properties

preloaded (bool): define if the component had been loaded before (thus fetching data from database or not).
preloadedData (arr): data used to set files state instead of re-fetching.

### \<File/> component Functions

BBorder() : sets the color for each section of the files (word,excel,pdf).

### \<File/> component Lifecycle

As the component mounts, it checks if the data if being fetched before, if not it fetches the database for files, and renders them using \<FileCard/> child component, if the is being fetched previously it renders it using preloadedData property.

### \<File/> component Actions Implementation

None.

### \<File/> component Reducers Implementation

None.

## \<WordDoc/> component

### \<WordDoc/> component Usage and Functionalities

\<WordDoc/> component present the textual data about a file in an ms word-like fashion.

### \<WordDoc/> component Implementation

~~~jsx

export default function WordFilePage(props) {
    
    let [content,setContent]=useState('')
    let FileViewDispatch = useDispatch()
    let viewSwitcher = useSelector(state=>state.AdjustNavReducer.switchToFilesView)

    let quillRef = useCallback((quillWrapper)=>{
        if(quillWrapper==null) return
        
        quillWrapper.innerHTML=''

        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],         
            [{ 'direction': 'rtl' }],                         
          
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],
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
            setContent(data)})
        }
        FileViewDispatch(adjustNavLink())
    },[])

    useEffect(()=>{
        let lister = document.querySelectorAll('.ql-toolbar')
        for(let i=0;i<lister.length-1;i++){
            lister[i].style.display = "none";
        }
    },[content])

    useEffect(()=>{
        if(props.currentTab!='files'){
            let lister = document.querySelectorAll('.ql-toolbar')
            for(let i=0;i<lister.length;i++){
                lister[i].style.display = "none";
            }
        }
    
        },[props.currentTab])

        useEffect(()=>{
            if(viewSwitcher==true) {
                FileViewDispatch(switchToFilesView())
                props.changeView('Main')
            }
        },[viewSwitcher])

    let doc = 
        <div ref={quillRef} id='quiller'>
            <p className='document-content' data-testid='content'>{content.content}</p>
        </div>
        
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
~~~

### \<WordDoc/> component Type

Functional component.

### \<WordDoc/> component State

content (str): file text to be presented (fetched from database).

### \<WordDoc/> component Properties

pk (num): used to construct a url fot a file to be fetched.
changeView (func): change \<Files/> component state to 'Main' and switch rendering to  \<Files/> component.
currentTab (str): used to adjust quill display as the component is displayed in map modal.

### \<WordDoc/> component Refs

quillRef: used to reference the quill lib object (part of how quill is implemented in react).

### \<WordDoc/> component Functions

None.

### \<WordDoc/> component Lifecycle

As the component mounts, default values of state and dispatchers are set, quillWrapper (part of quill lib that holds the both text and toolbar) is set to an empty string to clean up previous calls to the library, quill toolbar options obj is created (regarding quill toolbar which is used by the user to interact with the text), quillEditor (holds the text) then created, a Quill object that all above elements is created and content (fetched from the database) is attached to quillEditor, as the data loads an action 'adjustNavLink' is dispatched to alter the default behavior of the navbar when \<WordDoc/> is rendered inside a map modal.

### \<WordDoc/> component Actions Implementation

adjustNavLink(): alters the behavior of \</Nav> component backClick method by avoiding react router history objet, and set the view of \</Files> to 'Main'.

~~~jsx
import { FILEVIEWACTIVATE } from "./types";

export default function adjustNavLink(){
    return {
        type:FILEVIEWACTIVATE,
    }
}
~~~

### \<WordDoc/> component Reducers Implementation

~~~jsx
import{FILEVIEWACTIVATE} from '../../Actions/FilesActions/types'
import {SWITCHTOFILESVIEW} from '../../Actions/FilesActions/types'

const initialState={
    isViewPageActive:false,
    switchToFilesView:false
}

export default function AdjustNavReducer(state=initialState,action){
    switch(action.type){
        case FILEVIEWACTIVATE:{
            let alterActivation = state.isViewPageActive==false?true:false
            return{...state,isViewPageActive:alterActivation}
        }
        case SWITCHTOFILESVIEW:{
            // the value of the state here is not important rather the change of the state itself is sensed via useEffect 
            let switcher = state.switchToFilesView==false?true:false
            return{
                ...state,switchToFilesView:switcher
            }
        }
        default:{return state}
    }
}
~~~

// this not completed yet
