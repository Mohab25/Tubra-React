export function handleHorizontalScroll(){
    /*

    i need to get the total size of the item. item.outerWidth
    calculate 16% of the page.
    when the arrow is clicked the scroll is that value.
    i don't have any way to tell if the scroll reached it's end


    get the inner and outer width of the item.
    calculate the scroll value = 16.4% of the inner width.
    add another variable to keep track of the scrolled width, with initial value equals the inner width.

    it worked without this logic ??!!, still finding the outer width of an object is a problem that may arise in the future

    */

    let ModalInnerHolder = document.getElementsByClassName('modal-inner-holer')[0]
    let ModalInnerHolderWidth = ModalInnerHolder.clientWidth
    //let ModalInnerHolderOuterWidth = ModalInnerHolder.scrollWidth
    let scrollingInterval = ModalInnerHolderWidth * 25/100
    //let scrolled = ModalInnerHolderWidth // initial value for what have been scrolled so far.

    // getting the arrows
    let leftArrow = document.getElementsByClassName('modal-left-arrow')[0]
    let rightArrow = document.getElementsByClassName('modal-right-arrow')[0]

    // handling right arrow click
    rightArrow.addEventListener('click',()=>{
        ModalInnerHolder.scrollLeft+=scrollingInterval
        //scrolled+=scrollingInterval

    })

    leftArrow.addEventListener('click',()=>{
        ModalInnerHolder.scrollLeft-=scrollingInterval
        //scrolled+=scrollingInterval

    })
}

