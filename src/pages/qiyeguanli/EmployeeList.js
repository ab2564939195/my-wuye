import React from 'react';
import CecondLevelMenu from "../../util/CecondLevelMenu";
import Api from "../../data/API.js";
import { Table, Divider } from 'antd';
import {message} from "antd/lib/index";
export default class EmployeeList extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            menuList: [{key: '1', value: '员工列表'}, {key: '0', value: '离职记录'}],
            btn: [{content: '添加员工'}],
            searchContent: '',
        };

    }

    //获取搜索内容
    clickSearch = (value) => {
        this.setState({
            searchContent: value
        })
    };
    //获取点击菜单的key
    clickMenuReturnKey = (value) => {
        Api.postWithAuth("/wuyeEmployee/wuyeEmployeeCondition" , {
            "state":value,
            "wuyeUuid":"cb743f05-e07e-4159-8a34-2d55ba713cea"})
            .then(res => {
            console.log(res.obj);
            if(res.returnCode === 1){
                this.setState({data: res.obj});

            }else{
                message.error(res.msg,0.5);
            }
        })
    };
    columns = [{
        title: '员工名称',
        dataIndex: 'employeeName',
        key: 'employeeName',
    }, {
        title: '用户账号',
        dataIndex: 'realEmail',
        key: 'realEmail',
    }, {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    }, {
        title: '手机号',
        key: 'phone',
        dataIndex: 'phone',
    }, {
        title: '部门',
        key: 'departmentName',
        dataIndex: 'departmentName',
    }, {
        title: '角色',
        key: 'roleName',
        dataIndex: 'roleName',
    }, {
        title: '创建人',
        key: 'createor',
        dataIndex: 'createor',
    }, {
        title: '创建时间',
        key: 'createdDate',
        dataIndex: 'createdDate',
    },
        {
            title: '备注',
            key: 'note',
            dataIndex: 'note',
        },
        {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
      <a >修改</a>
      <Divider type="vertical" />
      <a >离职</a>
    </span>
        ),
    }];
    render() {
        return (
            <div style={{marginTop: 15}}>
                <div>
                    <CecondLevelMenu clickMenuReturnKey={this.clickMenuReturnKey} clickSearch={this.clickSearch}
                                     defaultSelectMenu="userList" Btn={this.state.btn} MenuList={this.state.menuList}
                                     searchHint={"请输入搜索内容"}/>
                </div>
                <div>
                    <Table columns={this.columns} dataSource={this.state.data} />
                </div>
            </div>
        )
    }

}