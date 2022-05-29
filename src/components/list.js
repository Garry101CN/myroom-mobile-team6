import React from 'react'
import {TabBar, Toast} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import Hub from './hub'
import Me from './me'
import './ui.css'

class List extends React.Component{
    constructor(props) {
        super(props);
        // sessionStorage.clear() // 测试用 - 本地缓存清理
        console.log("username: "+sessionStorage.getItem("user"))
        console.log("token: "+sessionStorage.getItem("token"))
        this.state = {
            username: sessionStorage.getItem("user"),
            tabs: [
                {
                    key: 'hub',
                    title: '麦荣中心',
                    icon: null,
                    badge: null
                },
                {
                    key: 'me',
                    title: '我的信息',
                    icon: null,
                    badge: null
                }
            ],
            page: "hub"
        }
        if(sessionStorage.getItem("user") == null){
            console.log("非法访问，回到登录页")
            this.props.history.replace("/login") // replace不可回退 push 可回退 也可以用React的<Redirect to="url">标签
        }
    }

    // 页面切换处理函数
    dealSwift(value){
        console.log("跳转至 "+value)
        this.setState({
            page: value
        })
    }

    render(){

        const username = this.state.username

        if(this.state.page === "hub"){
            return(
                <div className="canvas">
                    <div className="fragment">
                        <Hub />
                    </div>
                    <div className="nav-bottom">
                        <TabBar onChange={value => this.dealSwift(value)}>
                            {this.state.tabs.map(item => (
                                <TabBar.Item key={item.key} title={item.title} />
                            ))}
                        </TabBar>
                    </div>
                </div>
            )
        }else if(this.state.page === "me"){
            return(
                <div className="canvas">
                    <div className="fragment">
                        <Me />
                    </div>
                    <div className="nav-bottom">
                        <TabBar onChange={value => this.dealSwift(value)}>
                            {this.state.tabs.map(item => (
                                <TabBar.Item key={item.key} title={item.title} />
                            ))}
                        </TabBar>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="canvas">
                    <div className="fragment-page">
                        <div className="fragment">
                            <Hub />
                        </div>
                        <div className="nav-bottom">
                            <TabBar onChange={value => this.dealSwift(value)}>
                                {this.state.tabs.map(item => (
                                    <TabBar.item key={item.key} title={item.title} />
                                ))}
                            </TabBar>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default withRouter(List)