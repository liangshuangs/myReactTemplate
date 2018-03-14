/**
 * Created by liangshuang on 18/3/13.
 */
import React, { Component } from 'react';
import './login.css'

export default class Login extends React.Component {
    render() {
        console.log(this.props.userInfo.getStatementList.data)
        return (
            <div className='login-wrap'>
                <div>
                    用户名：<input type="text" name="username"></input>
                </div>
                <div>
                    密码：<input type="password" name="password"></input>
                </div>
                <button onClick={this.props.login}>登录</button>

            </div>
        );
    }
}