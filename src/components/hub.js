import React from "react";
import {withRouter} from 'react-router-dom'
// 网络库axios
import axios from 'axios'
import {Mask, SpinLoading, List} from "antd-mobile";
class Hub extends React.Component{

    constructor(props) {
        super(props);

        const username = sessionStorage.getItem("user")
        const token = sessionStorage.getItem("token")

        this.state = {
            username: username,
            token: token,
            data: [],
            visible: false,
            numsOfData: -1
        }
    }

    render(){

        if(this.state.numsOfData === -1){
            // 正在获取数据
            return(
                <div className="canvas">
                    <>
                        <Mask visible={this.state.visible}>
                            <div className="overlayContent">
                                <SpinLoading style={{ '--size': '48px' }} />
                            </div>
                        </Mask>
                    </>
                </div>
            );
        }else if(this.state.numsOfData === 0){
            // 没有条目
            return(
                <div className="canvas">
                    <>
                        <Mask visible={this.state.visible}>
                            <div className="overlayContent">
                                <SpinLoading style={{ '--size': '48px' }} />
                            </div>
                        </Mask>
                    </>

                    <h1>当前没有数据</h1>
                </div>
            );
        }else{
            // 建立list
            return(
                <div className="canvas">
                    <>
                        <Mask visible={this.state.visible}>
                            <div className="overlayContent">
                                <SpinLoading style={{ '--size': '48px' }} />
                            </div>
                        </Mask>
                    </>

                    <List className="hub-operation-area">
                        {this.state.data.map(activity => (
                            <List.Item
                                key={activity.id}
                                description={activity.author}>
                                <div className="hub-operation-area-font-main">{activity.name}</div>
                            </List.Item>
                        ))}
                    </List>

                </div>
            )
        }
    }

    componentDidMount() {
        let that = this
        console.log("UI渲染完毕，开始进行网络请求")
        this.showMask()

        axios.get('/agent/project/list',
            {
                headers: {
                    'authorization': that.state.token
                }
            }).then(function(res){
                console.log(res.data.message)
                that.setState({
                    data: res.data.data,
                    numsOfData: res.data.data.length
                })
                that.hideMask()
        }).catch(function (error){
            console.log(error)
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

export default withRouter(Hub);