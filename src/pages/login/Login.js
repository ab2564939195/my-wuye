import React from 'react';
import {Button, Input, Icon, message} from 'antd';
import jsUtil from "../../util/JsUtil";
import API from "../../data/API";

export default class Login extends React.Component {
    state = {
        loading: false,
    };

    // constructor(prop) {
    //     super(prop);
    // }

    loginBtn = () => {
        this.setState({
            loading: true,
        });
        if (jsUtil.isEmpty(this.state.userName)) {
            message.error('用户名不能为空', 0.5);
            this.setState({
                loading: false,
            });
            return;
        }
        if (jsUtil.isEmpty(this.state.password)) {
            this.setState({
                loading: false,
            });
            message.error('密码不能为空', 0.5);
            return;
        }
        API.postWithAuth("/user/login", {
            userName: this.state.userName,
            password: this.state.password
        }).then(res => {
            if (res.returnCode === 1) {
                //将信息加入缓存
                localStorage.setItem("userId", res.object.uuid);
                localStorage.setItem("loginNum", res.object.loginId);
                localStorage.setItem("userName", res.object.realName);
                localStorage.setItem("loginTime", new Date().getTime());
                window.location.href = '/qiye-guanli';
            } else {
                message.warn(res.msg, 1);
            }
            this.setState({
                loading: false,
            });
        }).catch(err => {
            this.setState({
                loading: false,
            });
        });
    }
    inputUserName = (e) => {
        this.setState({
            userName: e.target.value
        });
    };
    inputPassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <div>用户名:</div>
                        <div onch>
                            <Input
                                placeholder="用户名"
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                onChange={this.inputUserName}
                            />
                        </div>
                    </div>
                    <div>
                        <div>密码</div>
                        <div>
                            <Input
                                type="password"
                                placeholder="密码"
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                onChange={this.inputPassword}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <Button type="primary" loading={this.state.loading} onClick={this.loginBtn}>
                                登录
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}