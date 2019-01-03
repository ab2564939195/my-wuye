import React from 'react';
import Api from "../../data/API.js";
import { Row, Col  ,Switch , Input ,Table, Divider,message  } from 'antd';
import jsUtil from "../../util/JsUtil";
import './user.css';
export default class UserList extends React.Component{
    constructor(prop) {
        super(prop);
        this.state = {
            data:[]
        };

    }
    componentWillMount(){
        this.getDate()
    }
    getDate(userName , isCardNum , isBrankNum , sex){
        Api.postWithAuth("/user/all",{
            userName: userName,
            isCardNum: isCardNum,
            isBrankNum: isBrankNum,
            sex: sex,

        }).then(res =>{
            this.setState({resultData: res.obj});
        }).catch(e=>{
            message.warn("请稍后再试", 1);
        })
    }
    filtrateData(type,checked) {
        let isCardNum;
        let isBrankNum;
        let sex;
        switch (type){
            case "sex":
                if(checked){
                    sex = '男';
                }else{
                    sex = '女';
                }
                break;
            case "isCardNum":
                if(checked){
                    isCardNum = '1';
                }else{
                    isCardNum = '0';
                }
                break;
            case "isBrankNum":
                if(checked){
                    isBrankNum = '1';
                }else{
                    isBrankNum = '0';
                }
                break;
            default:
                    return;
        }
        this.getDate(null , isCardNum , isBrankNum , sex);
    }

    columns = [{
        title: '登陆账号',
        dataIndex: 'loginId',
        key: 'loginId',
    }, {
        title: '姓名',
        dataIndex: 'realName',
        key: 'realName',
    },{
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
    }, {
        title: '出生日期',
        dataIndex: 'birthday',
        key: 'birthday',
    }, {
        title: '身份证号',
        key: 'cardIdNum',
        dataIndex: 'cardIdNum',
    },{
        title: '银行卡号',
        key: 'bankcardNo',
        dataIndex: 'bankcardNo',
    },{
        title: '家庭住址',
        key: 'homeAddress',
        dataIndex: 'homeAddress',
    }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
    </span>
        ),
    }];
    render(){
        return(
            <div>
                <div>
                    <Row type="flex" justify="start" align="middle" >
                        <Col span={5} >
                            <Input.Search
                                placeholder="请输入搜索的内容"
                                onSearch={value => this.getDate(value)}
                                enterButton
                            />
                        </Col>
                        <Col span={1}/>
                        <Col span={2} >
                            <Switch checkedChildren="男" unCheckedChildren="女" defaultChecked onChange={this.filtrateData.bind(this,"sex")}/> <span className='font'>性别</span>
                        </Col>
                        <Col span={1}/>
                        <Col span={2} >
                           <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked onChange={this.filtrateData.bind(this,"isCardNum")}/> <span className='font'>实名认证</span>
                        </Col>
                        <Col span={1}/>
                        <Col span={2} >
                            <Switch checkedChildren="有" unCheckedChildren="无" defaultChecked onChange={this.filtrateData.bind(this,"isBrankNum")}/> <span className='font'>银行卡</span>
                        </Col>
                        <Col span={1}/>
                        <Col span={2} >
                            <Switch checkedChildren="有" unCheckedChildren="无" defaultChecked onChange={this.filtrateData.bind(this,"sex")}/> <span className='font'>密码</span>
                        </Col>
                    </Row>
                    <Row>
                        <Table columns={this.columns} dataSource={jsUtil.isEmpty(this.state.resultData) ? null : this.state.resultData } />
                    </Row>
                </div>
            </div>
        )
    }
}