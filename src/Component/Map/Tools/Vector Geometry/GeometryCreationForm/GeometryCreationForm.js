import React,{useState,useEffect} from 'react'
import './styles/styles.css'

export default function GeometryCreationForm(props) {
    const [titles,setTitles] = useState({form_titles:[]})
    let url = 'http://localhost:8000/AerodromeFeatures/fields_for_vector_creation/Aerodrome_Entity/'
    useEffect(()=>{
        fetch(url).then(res=>res.json()).then(data=>setTitles(data))
    },[])

    return (
        <div>
            <form className='creation-form'>
                {titles.form_titles.length==0?<></>:
                titles.form_titles.map((item,index)=>{
                    return(
                        <div key={index}>
                            <h3>{item}</h3>
                            <input />
                        </div>
                    )
                })
                }
            </form>        
        </div>
    )
}
