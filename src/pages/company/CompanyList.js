import React from 'react';
import CecondLevelMenu from "../../util/CecondLevelMenu";
import Api from "../../data/API.js";
import { Table, Divider, Tag } from 'antd';
export default class CompanyList extends React.Component{
    constructor(prop){
        super(prop)
    }

    //获取搜索内容
    clickSearch = (value) => {
        this.setState({
            searchContent: value
        })
    };
    //获取点击菜单的key
    clickMenuReturnKey = (value) => {
       alert('afds');
    };
    render(){
        return(
            <div>
                <div>
                    <CecondLevelMenu clickMenuReturnKey={this.clickMenuReturnKey} clickSearch={this.clickSearch}
                                     defaultSelectMenu="companyList"
                                     searchHint={"请输入搜索内容"}/>
                </div>
                {/*<div>*/}
                    {/*<Table columns={this.columns} dataSource={this.state.data.obj} />*/}
                {/*</div>*/}
            </div>
        )
    }
}