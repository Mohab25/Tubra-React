import React from 'react'

export default function StripeTable() {
    
    useEffect(()=>{
        setTabular(<table style={{width:'100%',position:'relative',top:'38px'}}className='table table-striped'>    
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
            {match.map((block,index)=>   
            <tr key={index}>
                <td style={{fontFamily:'Cairo'}}>{block.properties.au_name}</td>
                <td style={{fontFamily:'Cairo'}}>{block.properties.pau_name}</td>
                <td style={{textAlign:'center',fontFamily:'Open Sans',fontSize:'19px'}}>{isNaN(parseInt(block.properties.census))?'No Data':parseInt(block.properties.census)}</td>
                <td style={{textAlign:'center',fontFamily:'Open Sans',fontSize:'19px'}}>{isNaN(parseInt(block.properties.es1))?'No Data':parseInt(block.properties.es1)}</td>
                <td style={{textAlign:'center',fontFamily:'Open Sans',fontSize:'19px'}}>{isNaN(parseInt(block.properties.es2))?'No Data':parseInt(block.properties.es2)}</td>
            </tr>)

            }
        </tbody>
    </table>)

    },[match])
    
    
    return (
        <div className>
            
        </div>
    )
}
