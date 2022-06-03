
import React from "react";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import { Mask, SpinLoading, Button, Space, Swiper, Card, Popover} from 'antd-mobile'
import './ui.css'
// import { SwiperRef } from 'antd-mobile/es/components/swiper'


const imgs = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const items = imgs.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className="house-swiper"
      style={{ background: color }}
      onClick={() => {
      
    }}
    >
    </div>
  </Swiper.Item>
))

class House extends React.Component{
    constructor(props){
        super();
        const username = sessionStorage.getItem("user");
        const token = sessionStorage.getItem("token");

        this.state = {
            username: username,
            token: token,
            id:null,
            data:null,
            visible: false,
            toid: 65140
        }
    }
    
    componentDidMount(){
        this.showMask();
        //请求有关数据
        axios.get(`/user/house/${this.state.toid}`,
            {
                headers: {
                    'authorization': this.state.token
                }
            }).then((res) => {
                this.getData(res);
                console.log(this.state.data);//null
                this.hideMask();
        }).catch(function (error){
            console.log(error)
        })
    }

    getData = (res) =>{
        this.setState({
            data: res.data.data
        })
    }
    showMask = () => {
        this.setState({
            visible: true
        })
    }

    hideMask = () => {
        this.setState({
            visible: false
        })
    }

    getProperty_management_type = () =>{
        switch(this.state.data?.property_management_type) {
            case 1:
                return '普通住宅';
            case 2:
                return '别墅';
            case 3:
                return '写字楼';
            case 4:
                return '商铺';
            case 5:
                return '商住两用';
            case 6:
                return '公寓';
            case 7:
                return '工业厂房';
            case 8:
                return '车库';
            case 9:
                return '经济适用房';
            case 99:
                return '其他';
        }
    }

    houseSource = () => {
        if(this.state.data?.data_source_id === 1)return '诸葛';
        else if(this.state.data?.data_source_id === 2) return '安居客';
        else return '未知';
    }
    render() {
        return (
            <div>
                <>
                    <Mask visible={this.state.visible}>
                        <div className="overlayContent">
                            <SpinLoading style={{ '--size': '48px' }} />
                        </div>
                    </Mask>
                </>
                <Swiper loop autoplay>{items}</Swiper>
                <Card bodyClassName="house-card-style">
                    <Space direction='vertical' className="house-card-title">
                        {/* {this.state.data && <h3>{this.state.data.listing_name}</h3>} */}
                        <h3>{this.state.data?.listing_name}</h3>
                        <Space>
                            {/* <Popover
                                content={this.houseSource()}
                                trigger='click'
                                placement='top'
                            > */}
                                <Button size="mini" className="house-card-title-button" onClick={e => e.preventDefault()}>房源发布机构</Button>    
                            {/* </Popover> */}
                            <Button size="mini" className="house-card-title-button">相关资质</Button>
                        </Space>
                    </Space>
                    <Space className="house-listing-name">
                        <div>
                            <h3 style={{color:"orange",fontSize:"20px",overflow:"hidden",margin:0}}>{(this.state.data?.pricing)/100000 + '万元'}</h3>
                            <p style={{color:"#bbb",margin:"2px 0 1px 0",fontSize:"8px"}}>售价</p>
                        </div>
                        <div>
                            <h3 style={{color:"orange",fontSize:"20px",overflow:"hidden",margin:0}}>{ this.state.data?.floor_plan_room + '室' + this.state.data?.floor_plan_hall + '厅'}</h3>
                            <p style={{color:"#bbb",margin:"2px 0 1px 0",fontSize:"8px"}}>房型</p>
                        </div>
                        <div>
                            <h3 style={{color:"orange",fontSize:"20px",overflow:"hidden",margin:0}}>{ this.state.data?.squaremeter/100 + '平'}</h3>
                            <p style={{color:"#bbb",margin:"2px 0 1px 0",fontSize:"8px"}}>建筑面积</p>
                        </div>
                    </Space>
                    <Space className="house-listing-info">
                        <div><span style={{color:"#aaa"}}>单价</span><span>&nbsp;&nbsp;{((this.state.data?.pricing/100000)/(this.state.data?.squaremeter/100)).toFixed(2) + '万元/平' }</span></div>
                        <div><span style={{color:"#aaa"}}>挂牌</span><span>&nbsp;&nbsp;{ this.state.data?.first_upload_at.split('T')[0]}</span></div>
                    </Space>
                    <Space className="house-listing-info">
                        <div><span style={{color:"#aaa"}}>装修</span><span>&nbsp;&nbsp;{this.state.data?.decoration_type === 1?'简装':'豪华装修' }</span></div>
                        <div><span style={{color:"#aaa"}}>电梯</span><span>&nbsp;&nbsp;{this.state.data?.elevator === null? '未知':this.state.data?.elevator === 1? '有' : '无'}</span></div>
                    </Space>
                    <Space className="house-listing-info">
                        <div><span style={{color:"#aaa"}}>类型</span><span>&nbsp;&nbsp;{this.getProperty_management_type()}</span></div>
                        <div><span style={{color:"#aaa"}}>年代</span><span>&nbsp;&nbsp;{this.state.data?.built_year + '年'}</span></div>
                    </Space>
                    <Space className="house-listing-info">
                        <div><span style={{color:"#aaa"}}>房源</span><span>&nbsp;&nbsp;{this.state.data?.house_type === 1? '新房' : this.state.data?.house_type === 2? '二手房' : '租房'}</span></div>
                        <div><span style={{color:"#aaa"}}>朝向</span><span>&nbsp;&nbsp;{this.state.data?.facing_type===null? '未知': '南北' }</span></div>
                    </Space>
                    <Space className="house-listing-info">
                        <div><span style={{color:"#aaa"}}>楼层</span><span>&nbsp;&nbsp;{this.state.data?.floor_leve === 1 ? '高楼层' : this.state.data?.floor_level === 2? '中楼层': '低楼层' + '/共' + this.state.data?.total_floor + '层'}</span></div>
                    </Space>
                </Card>
            </div>
        )
        
    }
}

export default withRouter(House);