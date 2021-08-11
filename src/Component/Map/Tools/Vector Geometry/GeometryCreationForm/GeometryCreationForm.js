import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import './styles/styles.css'

export default function GeometryCreationForm(props) {
    const [titles,setTitles] = useState()
    const [inputs,setInputs] = useState([])
    const [inputValues,setInputValues] = useState([])

    //getting the pre populated geometry 
    const geom = useSelector(state=>state.CreationFormReducer.geom)
    let url = 'http://localhost:8000/AerodromeFeatures/fields_for_vector_creation/Aerodrome_Entity/'

    useEffect(()=>{
        fetch(url).then(res=>res.json()).then(data=>{setTitles(data)})
    },[])

    useEffect(()=>{if(titles!=undefined){setInputValues(new Array(titles.form_titles.length).fill(''))}},[titles])

    useEffect(()=>{
        creatingInputs(titles)
    },[inputValues,geom])

    useEffect(()=>{
    },[inputs])

    const creatingInputs=(data)=>{
        let inputsElements=[] 
        if(titles!=undefined){ 
        titles.form_titles.map((item,index)=>{
            // check if the title is geom, populate the input with a predefined geometry
            if(item=='geom'){
                inputsElements.push(<div key={index}><input id={index} value={geom} readOnly={true}/></div>)
            } 
            else{
            inputsElements.push(<div key={index}><input id={index} value={inputValues[index]} onChange={handleInputChange}/></div>)
            setInputs(inputsElements)
            }
        })}
    }

    const handleInputChange=(e)=>{
        if(inputValues.length!=0){
        let id = e.target.id
        let vals = [...inputValues]
        vals[id] = e.target.value
        setInputValues(vals)
        }
    }

    const handleFormData=(e)=>{
        // here i need to get the names and values of the form and put them in an object
        // first the names:
        e.preventDefault()
        let form_data = [] 
        if(titles.form_titles.length!=0 && inputs.length!=0){
            titles.form_titles.map((item,index)=>{
                let data_object={item:inputs[index]}
                form_data.push(data_object)
            })
        }
        // so the title corresponds to the form inputs on indexes.
        // get the inputs and their values:
        let form_values = []
        for (let item of form_data){
        form_values.push(item.item.props.children.props.value)
        }
        console.log('form values',form_values)
        let jsonatk = {}
        form_values.map((item,index)=>{
           jsonatk[`${titles.form_titles[index]}`]=item
        })
        console.log('jsonatk:',jsonatk)
        fetch('http://localhost:8000/AerodromeFeatures/vector_creation/create/',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(jsonatk)
        }).then(res=>res.json()).then(data=>{console.log('coming response:',data)}).catch(err=>console.log(err))
    }
    return (
        <div>
            <form className='creation-form'>
                {titles==undefined?<></>:
                
                titles.form_titles.map((item,index)=>{
                    return(
                        <div key={index} className='creation-form-fields-holder'>
                            <h5>{item}</h5>
                            {inputs[index]}
                        </div>
                    )
                })
                }
                <div className='creation-form-button-holder'><button className='creation-form-button' onClick={handleFormData}>Submit</button></div>
            </form>        
        </div>
    )
}
