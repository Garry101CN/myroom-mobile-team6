import React from "react"
import {List, Dialog, Mask, SpinLoading} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class Me extends React.Component{

    constructor(props) {
        super(props);
        const username = sessionStorage.getItem("user")
        const token = sessionStorage.getItem("token")
        this.state = {
            username: username,
            token: token,
            visible: false
        }
        console.log("进入我的页面，读取到user: "+username+" 读取到token: "+token)
    }

    render() {
        return(
            <div className="canvas">

                <>
                    <Mask visible={this.state.visible}>
                        <div className="overlayContent">
                            <SpinLoading style={{ '--size': '48px' }} />
                        </div>
                    </Mask>
                </>

                <div className="me-header-area">
                    <h1 className="me-header-area-greeting">欢迎来到麦荣，{this.state.username}。</h1>
                </div>
                <div className="me-operation-area">
                    <List>
                        <List.Item onClick={() => this.clickLogout()}>
                            退出登录
                        </List.Item>
                    </List>
                </div>
            </div>
        )
    }

    clickLogout(){
        let that = this
        console.log("点击了退出登录")
        Dialog.confirm({
            content: '您确定要退出登录吗？',
            onConfirm: async () => {
                console.log("-> 正在注销")
                that.showMask()
                console.log("-> 正在清除缓存")
                sessionStorage.clear()
                console.log("-> 关闭mask并跳转回登录页")
                that.hideMask()
                console.log(that.props)
                that.props.history.push("/login")
            }
        })
    }

    showMask(){
        this.setState({
            visible: true
        })
    }

    hideMask(){
        this.setState({
            visible: false
        })
    }


}

export default withRouter(Me) // 将List加入页面路由中