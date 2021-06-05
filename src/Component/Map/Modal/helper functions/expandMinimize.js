    // expand and minimize inner holder 
    export const handleDimensions=(isExpanded,innerHolderRef,setExpansion,initialExpandValue)=>{
        if(isExpanded=='minimized'){
            innerHolderRef.current.style.width = '100%'
            innerHolderRef.current.style.height = '100%'
            innerHolderRef.current.style.margin='0px'
            setExpansion('expanded')
        }
        else{
            innerHolderRef.current.style.width = `${initialExpandValue.width}px`
            innerHolderRef.current.style.height = `${initialExpandValue.height}px`
            innerHolderRef.current.style.margin='60px auto'
            setExpansion('minimized')
        }
    }
