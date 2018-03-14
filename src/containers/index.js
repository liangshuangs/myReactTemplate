/**
 * Created by liangshuang on 18/3/12.
 */
import React from 'react'
import { connect } from 'react-redux'
import { Router,Route,Redirect,Switch } from 'react-router-dom'
import Login from './Login/index'

class RootContainer extends React.Component {
    render() {
        const rootPath = process.env.REACT_APP_ROOT_PATH
        return (
            <Router history={this.props.history}>
                <div>
                    <Route exact path="/" component={Login}/>
                </div>
            </Router>
        )
    }

}
export default connect()(RootContainer)