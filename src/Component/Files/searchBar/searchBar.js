    // // this will handle the dynamic filtering.
    // const handleChange=async (e)=>{
    //     let matches = [] 
    //     // fetch. filter the response with regex, set state with the title of the filtered elem. 
    //         // let regx = new RegExp(`${e.target.value}`,'gi')
    //         // console.log(e.target.value)
    //         // data.filter(item=>{ 
    //         //     if(item.Title.match(regx)){
    //         //         matches.push(item.Title)
    //         //     }
    //         // })
            
    //   await  fetch(`http://localhost:8000/Reports?title=${e.target.value}/`).then(res=>res.json()).then(data=>matches=data)
    //     // setting the cards according to the filter above. 
    //     for(let i of matches){
    //         //console.log('the click handler is called!:',i)
    //     }
    // }

    // // this will handle the submit of the search input
    // const handleSubmit=(e)=>{
    //     e.preventDefault()
    // }


    // <form onSubmit={handleSubmit}>
    // <input name='search' onChange={handleChange} placeholder='search..'/>
    // </form>