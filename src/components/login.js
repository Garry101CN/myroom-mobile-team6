import React, {useState} from "react";
import {Button, Input} from 'antd-mobile'

import './login.css'
import logo from './res/image/login_logo.png'

class Login extends React.Component{

    constructor() {
        super();
        this.username = ""
        this.passwd = ""
    }

    render(){

        return (
            <div className="login-canvas">
                <img className='login-logo' src={logo} alt='LoginLogo'></img>

                <Input className='input-user' placeholder='请输入用户名' ></Input>
                <Input className='input-passwd'></Input>

                <Button className='login-button' color="primary">登录</Button>
                <Button className='register-button'>注册</Button>
            </div>
        )
    }

}

export default Login