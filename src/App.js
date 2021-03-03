import React ,{Component}from 'react'
import './App.css'
import { BrowserRouter,Router,Switch,Route,withRouter } from "react-router-dom";
import store from './store'
import {Provider} from 'react-redux'
import Nav from './Component/NavCompound'
import VerticalNav from './Component/VerticalNaV'
import NotePane from './Component/NavCompound/Pane'
import  Product_Page from "./Component/Main";
import Chart from './Component/Charts/charts'
import Schedule from './Component/Schedules/schedules'
import Map from './Component/Map/map'
import CADS from './Component/CAD/cads'
import Files from './Component/Files/files'


class App extends Component {
  render(){
    return(
      <div style={{width:'100%',height:'100vh'}}>
        <BrowserRouter>
        <Provider store={store}>
        <Nav/>
        <VerticalNav/>
        <NotePane/>
            <Switch>
              <Route exact path='/' component={Product_Page}/>
              <Route exact path='/schedule' component={Schedule}/>
              <Route exact path='/charts' component={Chart}/>
              <Route exact path='/map' component={Map}/>
              <Route exact path='/cad' component={CADS}/>
              <Route exact path='/files' component={Files}/>
            </Switch>
          </Provider>
        </BrowserRouter>  
      </div>
    )}
}

export default App;
