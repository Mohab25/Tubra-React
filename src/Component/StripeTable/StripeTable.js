import React,{useState,useEffect} from 'react'

export default function StripeTable() {

    const randomDate=(start, end)=>{
        let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    }
    
    let dates=[[new Date(), new Date()],[new Date(), new Date()],[new Date(), new Date()],[new Date(), new Date()],[new Date(), new Date()]]

    let [tabular,setTabular] = useState([]) 

    useEffect(()=>{
        
        setTabular(<table style={{width:'100%',position:'relative',top:'38px'}}className='table table-striped table-dark'>    
        <thead className='thead-dark'>
            <tr>
                <th>Phase Name</th>
                <th>Starting Date</th>
                <th>End Date</th>
                <th>Project Supervisor</th>
                <th>Comments and Remarks</th>
            </tr>
        </thead>
        <tbody>
            {dates.map((date,index)=>{
            let d1 = randomDate(new Date(), new Date());
            let d2 = randomDate(new Date(), new Date());
            return(   
            <tr key={index}>
                <td style={{fontFamily:'Open Sans',fontSize:'15px'}}>Phase{index}</td>
                <td style={{fontFamily:'Open Sans',fontSize:'15px'}}>{d1}</td>
                <td style={{fontFamily:'Open Sans',fontSize:'15px'}}>{d2}</td>
                <td style={{fontFamily:'Open Sans',fontSize:'15px'}}>M.Mohsin Shagar</td>
                <td style={{fontFamily:'Open Sans',fontSize:'15px'}}></td>
            </tr>)
            }
            )

            }
        </tbody>
    </table>)

    },[])
    
    
    return (
        <div className=''>
            {tabular}
        </div>
    )
}
