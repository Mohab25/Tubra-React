<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">

# Project Horizontal Navigation Component \<Nav/>

## General Overview

Project *\<Nav/>* Component is responsible of Horizontal Navigation between different Elements in the Project Dashboard, links hold in the nav are represented by icons, current links are: Humburger menu toggler, Current Dash Page, Notification, Message and User Control.

### Component Type

functional component.

### Child Components

<br/>
<p><i class="fa fa-bars"></i>
&nbspHumbergur menu: Responsible for toggling the vertical navigation menu visibility on and off.</p>

Current Page: this is represented by several icons, each one representing a separate section of the Dashboard.

<p><i class="fa fa-bell"></i>
&nbspNotification: Responsible for informing the user about relevant now actions took place. </p>

<p><i class="fas fa-envelope"></i>
&nbspMessage: Responsible for informing the user about incoming new messages </p>

<p><i class="fas fa-power-off"></i>
&nbspUser control: Responsible for control user's Login and out activities. </p>

### Properties

#### HTML Structure

    <div className='Project-page-nav'>
        <div className='Project-page-nav-container'>
            <div className='Project-page-nav-first-icons-set-container'>
                <i className='fa fa-bars'></i>                  
                <i className='fa fa-home'></i>     
                <span> &gt; Current Page Name </span>             
            </div>
            <div className='Project-page-nav-second-icons-set-container'>
                <i className='fas fa-bell'></i>       
                <i className='fas fa-envelope'></i>                  
                <i className='fas fa-power-off'></i>       
            </div>
            </div>          
    </div>

#### HTML Styling

    .Project-page-nav{
    width:100%; 
    height:50px; 
    }

    .Project-page-nav-container{
        width:100%; 
        height: 100%;
        margin-left:50px;  
        padding-top:4px; 
        display:flex; 
        justify-content: space-between;
        overflow-x:hidden; 
    }

    .Project-page-nav-first-icons-set-container{
        display: flex;
        flex-direction: row;
        margin-left:10px; 
    }

    .Project-page-nav-first-icons-set-container i{
        margin-left:20px;
        color:#8493a5; 
    }

    .Project-page-nav-first-icons-set-container span{
        padding-left: 10px;
        margin-top: -2.5px;
    }
    .Project-page-nav-second-icons-set-container{
        width:200px;  /* i need to know why this is obligatory width */
        display: flex;
        flex-direction: row;
    }


    .Project-page-nav-second-icons-set-container i{
        margin-left:20px;
        color:#8493a5
    }

### Functions



### what to write about next: 
there is a functionality when the user clicks on vertical nav icon, the nav icon and the name of the page will change accordingly (redux here), and when the user clicks of the bars the vertical will collapse. Also the power button will have a sliding menu, and wen there is an action (like adding a new file) the notification will change. Also message handling.