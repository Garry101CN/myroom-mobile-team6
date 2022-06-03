/**
 * MyRoom Mobile 活动页面
 */

import React from 'react'
import {withRouter} from "react-router-dom"
import axios from 'axios'
import { Card } from "antd";
import { Player } from "video-react";

class Activity extends React.Component{
    constructor(props) {
        super(props);
        if(sessionStorage.getItem("user") == null){
            console.log("非法访问，回到登录页")
            this.props.history.replace("/login")
        }

        this.state = {
            loading: true,
            components: [],
            data: []
        }

    }

    componentDidMount() {
        this.renderCanvas()
    }

    render() {

        if(this.state.loading){
            return (
                <div className="canvas">
                    <h1>Loading...</h1>
                </div>
            )
        }else{
            return (
                <div className="canvas">
                    <div className="canvas-activity">
                        {this.state.components}
                    </div>
                </div>
            )
        }

    }

    enterHouse(id){
        console.log("进入房源页面，id:"+id)
        console.log("将toId写入缓存")
        sessionStorage.setItem("toId", id)
        this.props.history.push("/house")
    }

    renderCanvas(){

        let that = this
        let id = sessionStorage.getItem("activity-id")
        let token = sessionStorage.getItem("token")
        console.log("获取到ID："+ id)
        console.log("获取到token："+ token)

        console.log("开始请求活动页数据...")
        axios.get('/agent/active/'+id, {
            headers:{
                'authorization': token
            }
        }).then((res)=>{
            let json = res.data.data

            that.setState({
                loading: false
            })

            console.log("读取到画布树：")
            console.log(json)
            let data = json

            for (let i = 0; i < data.length; i++) {
                let current = data[i]
                let oldComponents = this.state.components
                switch (current['type']){
                    case 'panel':{
                        console.log("正在渲染panel组件，id是: "+current['id'])

                        break
                    }
                    case 'text':{
                        console.log("正在渲染text组件，id是："+current['id'])
                        oldComponents.push(
                            <div
                                key={current['id']}
                                style={{
                                    color: current['color'],
                                    fontSize: current['size'],
                                    width: current['width'],
                                    height: current['height'],
                                    left: current['left'],
                                    top: current['top'],
                                    position: "absolute",
                                }}
                            >
                                {current['data']}
                            </div>
                        )
                        this.setState({
                            components: oldComponents
                        })
                        break
                    }
                    case 'image':{
                        console.log("正在渲染image组件，id是："+current['id'])
                        oldComponents.push(
                            <img
                                key={current['id']}
                                alt="这是图片组件"
                                src={current['src']}
                                style={{
                                    width: current['width'],
                                    height: current['height'],
                                    left: current['left'],
                                    top: current['top'],
                                    position: "absolute",
                                }}
                            ></img>
                        )
                        this.setState({
                            components: oldComponents
                        })
                        break
                    }
                    case 'video':{
                        console.log("正在渲染video组件，id是："+current['id'])
                        oldComponents.push(
                            <div
                                key={current['id']}
                                style={{
                                    width: current['width'],
                                    position: "absolute",
                                    left: current['left'],
                                    top: current['top'],
                                }}
                            >
                                <Player src={current['src']} id="myvideo" controls></Player>
                            </div>
                        )
                        this.setState({
                            components: oldComponents
                        })
                        break
                    }
                    case 'audio':{
                        console.log("正在渲染audio组件，id是："+current['id'])
                        oldComponents.push(
                            <div
                                // eslint-disable-next-line no-loop-func
                                key={current['id']}
                                style={{
                                    left: current['left'],
                                    top: current['top'],
                                    position: "absolute",
                                }}
                            >
                                <div
                                    className="audio_mask"
                                ></div>
                                <audio
                                    style={{ width: current['width'], height: current['height'] }}
                                    controls
                                    src={current['src']}
                                ></audio>
                            </div>
                        )
                        this.setState({
                            components: oldComponents
                        })
                        break
                    }
                    case 'card':{
                        console.log("正在渲染card组件，id是："+current['id'])
                        oldComponents.push(
                            <Card
                                key={current['id']}
                                onClick={()=>this.enterHouse(current['toid'])}
                                style={{
                                    position: "absolute",
                                    left: current['left'],
                                    top: current['top'],
                                    width: current['width'],
                                    height: current['height'],
                                }}
                                hoverable
                                cover={
                                    <img
                                        style={{ width: current['width_img'], height: current['height_img'] }}
                                        className="card_img"
                                        alt="example"
                                        src={current['src']}
                                    />
                                }
                            >
                                <h2>{current['name']}</h2>
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        fontSize: 16,
                                    }}
                                >
                                    <div style={{ width: "40%", textAlign: "center" }}>
                                        售价:{current['soujia']}
                                    </div>
                                    <div style={{ width: "40%", textAlign: "center" }}>
                                        挂牌:{current['guapai']}
                                    </div>
                                    <div style={{ width: "40%", textAlign: "center" }}>
                                        房型:{current['fangxing']}
                                    </div>
                                    <div style={{ width: "40%", textAlign: "center" }}>
                                        装修:{current['zhuangxiu']}
                                    </div>
                                    <div style={{ width: "40%", textAlign: "center" }}>
                                        面积:{current['mianji']}
                                    </div>
                                    <div style={{ width: "40%", textAlign: "center" }}>
                                        楼型:{current['louxing']}
                                    </div>
                                    <div style={{ width: "40%", textAlign: "center" }}>
                                        朝向:{current['chaoxiang']}
                                    </div>
                                    <div style={{ width: "40%", textAlign: "center" }}>
                                        年代:{current['niandai']}
                                    </div>
                                </div>
                            </Card>
                        )
                        this.setState({
                            components: oldComponents
                        })
                        break
                    }
                    default:{
                        console.log("不支持的组件类型，拒绝渲染")
                    }
                }
            }


        }).catch((error)=>{
            console.log(error)
        })

    }
}


export default withRouter(Activity)