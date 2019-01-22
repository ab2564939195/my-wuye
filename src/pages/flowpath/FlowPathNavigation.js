import React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink, Route, Switch, Redirect} from 'react-router-dom';
import FlowPathSelect from "./FlowPathSelect";
import FlowPathAdd from "./FlowPathAdd";
import FlowPathDisPose from "./FlowPathDisPose";
import FlowPathPendingTrial from "./FlowPathPendingTrial";
export default class FlowPathNavigation extends React.Component{
    state ={
        current: 'select',
    };
    handleClick = (e) =>{
        this.setState({
            current: e.key,
        });
    };
    render(){
        return(
            <div>
                <Menu
                    mode={'horizontal'}
                    selectedKeys={[this.state.current]}
                    onClick={this.handleClick}
                >
                    <Menu.Item key="add">

                        <NavLink to={'/flowPath/add'}>
                            <Icon type="file-add" />
                            创建流程
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="select" >

                        <NavLink to={'/flowPath/select'}>
                            <Icon type="select" />
                            查看流程
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="pendingTrial " >

                        <NavLink to={'/flowPath/pendingTrial'}>
                            <Icon type="clock-circle" />待审核
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="dispose" >
                        <NavLink to={'/flowPath/dispose'}>
                            <Icon type="check-circle" />
                            已处理
                        </NavLink>
                    </Menu.Item>
                </Menu>
                <div>
                    <Switch>
                        <Route path="/flowPath/add" component={FlowPathAdd} />
                        <Route path="/flowPath/select" component={FlowPathSelect} />
                        <Route path="/flowPath/pendingTrial" component={FlowPathPendingTrial} />
                        <Route path="/flowPath/dispose" component={FlowPathDisPose} />
                        <Redirect to="/flowPath/select" />
                        <Route render={() => <FlowPathSelect/>} />
                    </Switch>
                </div>

            </div>
        )
    }
}