import React, {Component} from 'react';
import './App.css';
import {Layout, Menu, Icon} from 'antd';
import {NavLink, Route, Switch, Redirect} from 'react-router-dom';
import CompanyRouter from "./pages/qiyeguanli/CompanyRouter";
import CompanyList from "./pages/company/CompanyList";
import UserList from "./pages/user/UserList";
import Login from "./pages/login/Login";
import Api from "./data/API";
import FlowPathNavigation from "./pages/flowpath/FlowPathNavigation";

const {Header, Sider, Content} = Layout;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            loginState: false,
        };
    }

    componentWillMount() {
        let loginState = Api.isLoginState();
        this.setState({
            loginState: loginState
        });
        if (!loginState) {
            if (window.location.pathname !== '/my/login') {
                window.location.href = '/my/login';
            }
        }

    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    /**
     * 退出登录
     */
    logout = () =>{
        localStorage.clear();
        window.location.href = '/my/login';
    }
    render() {
        return (
            this.state.loginState ? <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="head" onClick={this.logout}>
                            {this.state.collapsed? localStorage.getItem("userName") : localStorage.getItem("loginNum")}
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item >
                                <NavLink to={"/user"}>
                                    <Icon type="setting"/>
                                    <span>用户管理</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item >
                                <NavLink to={"/qiye-guanli"}>
                                    <Icon type="setting"/>
                                    <span>企业管理</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item >
                                <NavLink to={"/company"}>
                                    <Icon type="gold"/>
                                    <span>入驻企业</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item >
                                <NavLink to={"/flowPath"}>
                                    <Icon type="gold"/>
                                    <span>流程管理</span>
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    < Layout>
                        < Header style={{background: '#fff', padding: 0}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                style={{fontSize: 25, marginLeft: 5}}
                                onClick={this.toggle}
                            />

                        </Header>
                        <Content style={{margin: '24px 16px', background: '#fff', minHeight: 300}}>
                            <Switch>
                                <Route
                                    path={"/user"}
                                    component={UserList}/>
                                <Route
                                    path={"/qiye-guanli"}
                                    component={CompanyRouter}/>
                                <Route
                                    path={"/company"}
                                    component={CompanyList}/>
                                <Route
                                    path={"/flowPath"}
                                    component={FlowPathNavigation}/>
                                <Route path='/' exact render={() => (
                                    <Redirect to={"/user"}/>
                                )}/>

                            </Switch>
                        </Content>
                    </Layout>
                </Layout> :
                <Route path="/my/login" component={Login}/>
        )
            ;
    }
}

export default App;
