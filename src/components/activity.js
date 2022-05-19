import React from "react"
import {Link} from "react-router-dom";

class Activity extends React.Component{

    render() {
        return(
            <div>
                <h2>活动页</h2>
                <div>
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
            </div>
        )
    }
}

export default Activity;