import React, {Component} from 'react';
import './App.css';
import {Layout, Menu, Icon} from 'antd';
import {NavLink, Route, Switch , Redirect} from 'react-router-dom';
import CompanyRouter from "./pages/qiyeguanli/CompanyRouter";
import CompanyList from "./pages/company/CompanyList";

const {Header, Sider, Content} = Layout;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div style={{height: 50, backgroundColor: "red", margin: 10}}/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <NavLink to={"/qiye-guanli"}>
                                <Icon type="setting"/>
                                <span>企业管理</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to={"/company"}>
                                <Icon type="gold"/>
                                <span>入驻企业</span>
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
                            path={"/qiye-guanli"}
                            component={CompanyRouter}/>
                        <Route
                            path={"/company"}
                            component={CompanyList}/>
                        <Route path='/' exact render={()=> (
                            <Redirect to={"/qiye-guanli"}/>
                        )}/>
                    </Switch>
                </Content>
            </Layout>
    </Layout>
    )
        ;
    }
}

export default App;
