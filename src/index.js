import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import reduxRequestMiddleware from './http/reduxRequestMiddleware'
import reducers from './reducers/index'
import requestJson from './http/requestJson'
import './index.css';
import IndexRouter from './containers/index'
//import registerServiceWorker from './registerServiceWorker';

export const httpRequestJson = requestJson(process.env.REACT_APP_GATEWAY)  //获取node.js的全局变量作为地址前缀 比如：域名：https://baidu.com 在 scripts/start.js中配置
console.log('httpRequestJson',process.env.REACT_APP_GATEWAY)
const history = createHistory()
const middleware = [thunk, routerMiddleware(history), reduxRequestMiddleware(httpRequestJson)]
// see: http://zalmoxisus.github.io/redux-devtools-extension/
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const enhancer = composeEnhancers(applyMiddleware(...middleware))
const store = createStore(reducers, enhancer)

render(
    <Provider store={store}>
      < IndexRouter history={history}/>
    </Provider>,
    document.getElementById('root'),
)
/*render
 (<Login />,
 document.getElementById('root')
 );*/
//registerServiceWorker();
