import React from "react";
import {Link} from 'react-router-dom';

class Home extends React.Component{

    render(){
        return(
            <div>
                <h1>MyRoom Construction Site</h1>
                <ul>
                    <li>
                        <Link to={"/"}>Home页面</Link>
                    </li>
                    <li>
                        <Link to={"/activity"}>Activity页面</Link>
                    </li>
                    <li>
                        <Link to={"/house"}>House页面</Link>
                    </li>
                    <li>
                        <Link to={"/login"}>登录页面</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Home;