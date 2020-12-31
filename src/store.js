import { applyMiddleware, createStore } from "redux";
import RootReducer from './Reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const initialState={}
const middleware = [thunk]

const store= createStore(RootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store;