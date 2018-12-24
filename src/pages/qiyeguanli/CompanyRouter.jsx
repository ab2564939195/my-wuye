import React from 'react';
import { Menu, Icon } from 'antd';
import {NavLink, Route, Switch} from 'react-router-dom';
import EmployeeList from "./EmployeeList";
export default class CompanyRouter extends React.Component{
    state = {
        current: 'user',
    };

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    render(){
        return(
            <div>
                <div>
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                        <Menu.Item key="user">
                            <NavLink to={"/qiye-guanli/employee"}>
                                <Icon type="user" />
                                <span>员工</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="fire">
                            <NavLink to={"/qiye-guanli/department"}>
                                <Icon type= "fire" />
                                <span>部门</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="crown">
                            <NavLink to={"/qiye-guanli/role"}>
                                <Icon type="crown" />
                                <span>角色</span>
                            </NavLink>

                        </Menu.Item>
                        <Menu.Item key="key">
                            <NavLink to={"/qiye-guanli/jurisdiction"}>
                                <Icon type="key" />
                                <span>权限</span>
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </div>
                <div>
                    <Switch>
                        <Route path={"/qiye-guanli/employee"} component={EmployeeList}/>
                        <Route path={"/qiye-guanli/department"} component={""}/>
                        <Route path={"/qiye-guanli/role"} component={""}/>
                        <Route path={"/qiye-guanli/jurisdiction"} component={""}/>
                        <Route render={() => <EmployeeList/>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}