    // expand and minimize inner holder 
    export const handleDimensions=(isExpanded,innerHolderRef,setExpansion,initialExpandValue,setEnlargeButtonsPosition)=>{
        if(isExpanded=='minimized'){
            innerHolderRef.current.style.width = '100%'
            innerHolderRef.current.style.height = '100%'
            innerHolderRef.current.style.margin='0px'
            setExpansion('expanded')
            let newPositions = {enlargeTop:'5%',enlargeRight:'1%',leftArrowLeft:'2%',rightArrowRight:'2%'}
            setEnlargeButtonsPosition(newPositions)
        }
        else{
            innerHolderRef.current.style.width = `${initialExpandValue.width}px`
            innerHolderRef.current.style.height = `${initialExpandValue.height}px`
            innerHolderRef.current.style.margin='60px auto'
            setExpansion('minimized')
            let newPositions = {enlargeTop:'15%',enlargeRight:'16%',leftArrowLeft:'16%',rightArrowRight:'15%'}
            setEnlargeButtonsPosition(newPositions)
        }
    }
