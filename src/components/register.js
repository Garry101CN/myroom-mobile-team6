/**
 * MyRoom 麦荣 - 客户展示子系统 - 注册页面
 * @Author Xilai Jiang
 * @Version 1.0
 */
import React from "react"
// antd-mobile UI组件库
import {Button, Input, Form, Toast, Mask, SpinLoading, Dialog} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

// 网络库axios
import axios from 'axios'
import './ui.scss'
import logo from './res/image/login_logo.png'
import bottom_logo from './res/image/bytedance.png';

class Login extends React.Component{

    constructor(props) {
        super(props)

        // 检查是否已经登录
        if(sessionStorage.getItem("user") !== null){

        }

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
            let that = this
            console.log("账号密码合法，准备发起网络请求验证账号密码是否匹配")

            Dialog.confirm({
                content: '您确定要注册账号吗？',
                onConfirm: async () => {
                    // 执行注册
                    that.showMask()
                    axios.post('/user/register', {
                        name: this.state.username,
                        password: this.state.passwd
                    })
                        .then(function(response){
                            console.log(response)
                            that.setState({
                                visible: false
                            })
                            Toast.show({
                                content:'注册成功',
                                afterClose: () => {
                                    console.log("注册成功Toast显示结束")
                                }
                            })
                            console.log("将用户名写入缓存")
                            sessionStorage.setItem("username", that.state.username)
                            console.log("跳转到主页")
                            that.props.history.push("/login")
                        })
                        .catch(function(error){
                            console.log(error.response.data.message)
                            that.setState({
                                visible: false
                            })
                            Toast.show({
                                content:error.response.data.message,
                                afterClose: () => {
                                    console.log("注册失败Toast显示结束")
                                }
                            })
                        })
                }
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
            <div className="canvas">
                <>
                    <Mask visible={this.state.visible}>
                        <div className="overlayContent">
                            <SpinLoading style={{ '--size': '48px' }} />
                        </div>
                    </Mask>
                </>

                <img className='login-logo' src={logo} alt='LoginLogo'></img>

                <div className="welcome-register-text">欢迎注册麦荣</div>

                <div className='user-form-panel'>
                    <Form layout='horizontal' className='user-form'>
                        <Form.Item label='用户名' name='username'>
                            <Input onChange={(e) => this.getUsername(e)} placeholder='请输入新的用户名' clearable />
                        </Form.Item>
                        <Form.Item label='密码' name='password'>
                            <Input onChange={(e) => this.getPassword(e)} placeholder='请输入密码' clearable type='password' />
                        </Form.Item>
                    </Form>
                </div>

                <Button className='login-button' color="primary" onClick={() => {this.clickLogin('success')}}>注册</Button>

                <img className='bottom-logo' src={bottom_logo} alt='BottomLogo'></img>

            </div>
        )
    }

}

export default withRouter(Login)