# Search Component

## General Overview

The Search Component is a compound component used to conduct searches about different parts of the Aerodrome and surroundings, it help the user with searching tasks by providing autocomplete functionality for different types of information stored in the database. the following figures illustrates how the search is conducted with this component.
!['Search-1']()
!['Search-1']()
!['Search-1']()

### Usage and Functionalities

This component is dedicated for making search, autocomplete is used to help with such operation, moreover this component alters other components states (as changing the location of map as the user clicks on his search result).

## Component structure

As being hinted in the overview, this component is a compound of three components, the search component which holds both the searching input and the search icon , the \<SearchingComponent/> which handles the user interaction and the \<SearchingResultsHolder/> which is a card like object that saves teh result of search, the following jsx illustrates the structure of these component.

1. the \<Search/> component

~~~jsx
export default function Search() {
    return (
        <div className='search'>
            <div className='search-container'>
                <div className='search-box'>
                    <div>
                        <i className='fa fa-search'>
                        </i>
                    </div>
                </div>
                <SearchingComponent/>
            </div>
        </div>
    )
}

~~~

1. the \<SearchingComponent/>

~~~jsx
export default function SearchingComponent() {

    useEffect(()=>{
        setData(data)
    },[])
    
    return (

        <div className='Search-Component'>
        <div className='Search-Component-container'>
            <div className='Search-input-container'>
                <input className='searchInput' placeholder='search..' onChange={handleChange}/>
                <button>Enter</button>
            </div>  
         </div>
         {MatchedValues.length>0?<SearchResultsHolder display={searchResultsHolderDisplay} matches={MatchedValues}/>:<></>}
        </div>
        
    )
}

~~~

1. \<SearchingResultsHolder/>

~~~jsx
    console.log(props.matches)
const [matchedItems,setMatchedItems] = useState([])

useEffect(()=>{
    const matchedItems = props.matches.map((item,index)=>{
        return(
            <div key={index}>
                <p>{item.music_title}</p>
            </div>
        )
    })
    return (
        <div className='Cards-Holder' style={{display:props.display}}>
            <div className='Cards-Holder-container'>
                <div className='Card-holder'>
                    <div className='matched-card-item'>
                        {matchedItems}
                    </div>
                </div>
            </div>
        </div>
    )
~~~

## Component Type

1. \<Search/> component: functional component.
1. \<SearchingComponent/>: functional component.
1. \<SearchingResultsHolder/>: functional component.

## Component State

### \<Search/> component state

#### SearchBarDisplay,toggleSearchBar

 this state variable controls the visibility of the search bar, it takes toggle between two values 'none' and 'block', these values are sent as properties to \<SearchingComponent/>

#### SearchBoxColor,toggleSearchBoxColor

a state  variable to control the color of the search tool box to illustrate if the tool is used currently or not, it toggles between two values 'orange' and 'orangered', figures below illustrate it's functionality:
!['Search box default color']()
!['Search box active color']()

### \<SearchingComponent/> state

#### searchResultsHolderDisplay,setSearchResultsHolderDisplay

string passed to the \<SearchingResultsHolder/> to control wether it is displayed or not, it takes two values 'none' and 'block'.

#### Data,setData

list of data fetched from the server and passed to a filter function to determine what will be returned as autocomplete results.

#### MatchedValues,setMatchedValues

list of matching results from setMatches function (see functions below), it is passed to \<SearchingResultsHolder/> component to show autocomplete results matching what the user typed.

### SearchResultsHolder state

#### matchedItems,setMatchedItems

list of items passed from \<SearchingComponent/> and set as the component mounts, it holds to values to be shown for the user, corresponding to the user's search values.

## Component Properties

### \<Search/> component properties

no properties variables used.

### \<SearchingComponent/> properties

#### SearchBarDisplay

a prop that control the display of the search bar, according to the value passed from the \<Search/> component, it either to be 'none' to prevent the display of the search bar or 'block' to show it, figures below illustrates the search bar toggling.
!['Search bar active']()
!['Search bar inactive']()

### \<SearchResultsHolder>

#### display

string value controls wether the component will be shown on the screen, this is helpful for toggling the results component visibility.

#### matches

list of matching items corresponds to what the user has input and used for autocompletion as simple cards.

## Component Lifecycle

### \<Search/> component lifecycle

#### Return

as this component doesn't have a useState lifecycle function, it only renders to the screen when mounted (see structure above for implementation).

### \<SearchingComponent/> lifecycle

#### useEffect(()=>{},[])

~~~jsx
useEffect(()=>{
    setData(data)
},[])
~~~

this is called when the component mounts the first time, it makes the GET request to the server and get the data corresponds to what the user searched then sets the Data state variable accordingly.

### \<SearchResultsHolder> lifecycle

#### useEffect(()=>{},[props.matches])

~~~jsx
useEffect(()=>{
        const matchedItems = props.matches.map((item,index)=>{
            return(
                <div key={index}>
                    <p>{item.music_title}</p>
                </div>
            )
        })
        setMatchedItems(matchedItems)
    },[props.matches])
~~~

this function is called whenever the property matched is changed, it constructs the searching card item according to the matches properties and pass the card to setMatchedItems function (see functions below).

## Functions

### \<Search> component functions

no functions implemented

### \<SearchingComponent> component functions

#### handleChange

this functions is called whenever the user changes the input values (by typing in or deleting from the input element), the main functionality is toggle the visibility of the \<SearchResultsHolder/> component by examining the value of event parameter, if the input value equals an empty input it toggles visibility to none, other cases to 'block'. then it calls setMatches function passing the value of search.

#### handleChange parameters

event object (e): this object holds all information about it's caller (search input) most importantly the current value of the input.  

#### handleChange Implementation

~~~jsx
    const handleChange=(e)=> {
        e.target.value!==''?setSearchResultsHolderDisplay('block'):setSearchResultsHolderDisplay('none')        
        setMatches(e.target.value)
    }
    
~~~

#### setMatches

where the actual filtering happens, it takes a search value and examine it, if the value is not en empty string, it loop through data returned from the server and a RegExp "regex expression" is constructed, values that fetched from the server and matches this regex are returned and inserted to a list.

#### setMatches parameters

searchValue (string): a string holding the values of the search input.

#### setMatches implementation

~~~jsx
const setMatches=(searchValue)=>{
        if(searchValue!==''){
        // filter according to regex
        let list_of_matches = Data.filter(item=>{
            const reg = new RegExp(`^${searchValue}`);
            return item.music_title.match(reg)
        })
        setMatchedValues(list_of_matches)
    }
        else setMatchedValues([])
    }
~~~

### \<SearchResultsHolder> functions

no functions implemented.

## Actions Implementation

## Reducers Implementation
