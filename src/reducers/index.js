/**
 * Created by liangshuang on 18/3/12.
 */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import login from './login'
export default combineReducers({
    login,
    routing:routerReducer,//整合路由
})