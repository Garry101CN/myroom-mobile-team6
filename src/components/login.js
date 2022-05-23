/**
 * MyRoom 麦荣 - 客户展示子系统 - 登录页面
 * @Author Xilai Jiang
 * @Version 1.0
 */
import React from "react"
// antd-mobile UI组件库
import {Button, Input, Form, Toast, Mask, SpinLoading} from 'antd-mobile'
// 网络库axios
import axios from 'axios'
import './login.css'
import logo from './res/image/login_logo.png'

class Login extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            passwd:"",
            visible: false
        }
    }

    clickLogin(contents){
        console.log("state中存储的username"+this.state.username)
        console.log("state中存储的passwd"+this.state.passwd)
        if(this.state.username === "" || this.state.passwd === ""){
            console.log("用户未输入账号或密码")
            Toast.show({
                content: '请输入账号密码',
                afterClose: () => {
                    console.log("账号密码为空提示Toast显示结束")
                }
            })
            return false
        }else{
            console.log("账号密码合法，准备发起网络请求验证账号密码是否匹配")
            this.showMask()
            axios.post('http://192.168.140.23:8000/users/register', {
                username: this.state.username,
                password: this.state.passwd
            })
                .then(function(response){
                    console.log(response)
                })
                .catch(function(error){
                    console.log(error)
                })
        }
    }

    showMask(){
        this.setState({
            visible: true
        })
    }

    getUsername(e){
        console.log(e)
        this.setState({
            username: e
        })
    }

    getPassword(e){
        console.log(e)
        this.setState({
            passwd: e
        })
    }

    render(){

        return (
            <div className="login-canvas">
                <>
                    <Mask visible={this.state.visible}>
                        <div className="overlayContent">
                            <SpinLoading style={{ '--size': '48px' }} />
                        </div>
                    </Mask>
                </>

                <img className='login-logo' src={logo} alt='LoginLogo'></img>

                <div className='user-form-panel'>
                    <Form layout='horizontal' className='user-form'>
                        <Form.Item label='用户名' name='username'>
                            <Input onChange={(e) => this.getUsername(e)} placeholder='请输入用户名' clearable />
                        </Form.Item>
                        <Form.Item label='密码' name='password'>
                            <Input onChange={(e) => this.getPassword(e)} placeholder='请输入密码' clearable type='password' />
                        </Form.Item>
                    </Form>
                </div>

                <Button className='login-button' color="primary" onClick={() => {this.clickLogin('success')}}>登录</Button>
                <Button className='register-button'>注册</Button>
            </div>
        )
    }

}

export default Login