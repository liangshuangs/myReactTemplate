/**
 * Created by liangshuang on 18/3/13.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginComponent from '../../components/Login/login'
import {login } from '../../actions/login'
const mapStateToProps = state => ({
    userInfo:state.login
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        login,
    }, dispatch)
)
class Login extends React.Component {
    render() {
        return (
            <LoginComponent {...this.props} />
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);