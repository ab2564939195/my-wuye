import React from 'react';
import Api from "../../data/API.js";
import {Row, Col, Switch, Input, Table, Divider,DatePicker , message, Pagination, Popconfirm, Modal ,Radio } from 'antd';
import jsUtil from "../../util/JsUtil";
import './user.css';
import moment from 'moment';
export default class UserList extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {tableLoading: true, pageNum: 1, pageSize: 10, visible: false , item:{} };
    }

    componentWillMount() {
        this.getDate();
    }

    columns = [{
        title: '登陆账号',
        dataIndex: 'loginId',
        key: 'loginId',
    }, {
        title: '姓名',
        dataIndex: 'realName',
        key: 'realName',
    }, {
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
    }, {
        title: '银行卡号',
        key: 'bankcardNo',
        dataIndex: 'bankcardNo',
    }, {
        title: '家庭住址',
        key: 'domicilePlace',
        dataIndex: 'domicilePlace',
    }, {
        title: '操作',
        key: '操作',
        render: (text, record , index) => (
            <span>
              <a href="#">修改密码</a>
                 <Divider type="vertical"/>
              <a href="#" onClick={() => {
                  this.setState({
                      visible: true,
                      item: record,
                  })
              }}>修改</a>
                <Divider type="vertical"/>
                <Popconfirm title="确定要删除该用户吗？" onConfirm={this.deleteUser.bind(this, record.uuid)}
                            okText="Yes" cancelText="No">
                    <a href="#">删除</a>
            </Popconfirm>
            </span>
        ),
    }];
    /**
     * 获取数据
     */
    getDate = () => {
        Api.postWithAuth("/user/all", {
            userName: this.state.searchContent,
            isCardNum: this.state.isCardNum,
            isBrankNum: this.state.isBrankNum,
            sex: this.state.sex,
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize,
        }).then(res => {
            if (res.returnCode === 200) {
                this.setState({
                    resultData: res.obj,
                    tableLoading: false,
                    pages: res.map.pages,
                    pageNum: res.map.pageNum,
                    pageSize: res.map.pageSize,
                });
            }

        }).catch(e => {
            this.setState({
                tableLoading: false
            });
            message.error("请稍后再试", 1);
        })
    }
    /**
     * 点击搜索
     * @param value
     */
    searchInput = (value) => {
        this.setState({
            searchContent: value,
            tableLoading: true
        }, () => {
            this.getDate();
        });
    };
    /**
     * 条件查询
     * @param type
     * @param checked
     */
    filtrateData = (type, checked) => {
        this.setState({
            tableLoading: true,
        });
        switch (type) {
            case "sex":
                if (checked) {
                    this.setState({
                        sex: '男',
                    });
                } else {
                    this.setState({
                        sex: '女',

                    });
                }
                break;
            case "isCardNum":
                if (checked) {
                    this.setState({
                        isCardNum: '1',
                    });
                } else {
                    this.setState({
                        isCardNum: '0',
                    });
                }
                break;
            case "isBrankNum":
                if (checked) {
                    this.setState({
                        isBrankNum: '1',
                    });

                } else {
                    this.setState({
                        isBrankNum: '0',
                    });
                }
                break;
            case "sx":
                this.setState({
                    sx: checked
                });
                if (!checked) {
                    this.setState({
                        isBrankNum: null,
                        isCardNum: null,
                        sex: null,
                    });
                }
                break;
            default:
                return;
        }
        this.setState({}, () => {
            this.getDate();
        });
    }
    /**
     * 删除用户
     * @param res
     */
    deleteUser = (res) => {
        Api.deleteWithAuth("/user/delete/" + res).then(res => {
            if (res.returnCode === 200) {
                message.success("删除成功", 1);
                this.getDate();
            } else {
                message.warn("删除失败", 1);
            }
        }).catch(e => {
            message.error("删除失败", 1);
        })
    };
    /**
     * 分页
     * @param current 当前页数
     * @param pageSize 每页数量
     */
    pageChange = (current, pageSize) => {
        this.setState({
            pageNum: current,
            pageSize: pageSize
        }, () => {
            this.getDate();
        });
    }
    onChangeInput = (value,e) =>{
        if(value === 'loginId'){
            this.state.item.loginId = e.target.value
        }
        if(value === 'realName'){
            this.state.item.realName = e.target.value
        }
        if(value === 'cardIdNum'){
            this.state.item.cardIdNum = e.target.value
        }
        if(value === 'bankcardNo'){
            this.state.item.bankcardNo = e.target.value
        }
        if(value === 'domicilePlace'){
            this.state.item.domicilePlace = e.target.value
        }
        this.setState({
            item: this.state.item
        })
    }
    onChangeRadio = (value,e) =>{
        if(value === "sex"){
            this.state.item.sex = e.target.value
        }
        if(value === "isCertification"){
            this.state.item.isCertification = e.target.value
        }
        this.setState({
            item: this.state.item
        })
    }
    onChangeDatePicker =(flag,date, dateString)=>{
        if(flag === "birthday"){
            this.state.item.birthday = dateString
        }
        if(flag === "caValidDate"){
            this.state.item.caValidDate = dateString
        }
        this.setState({
            item: this.state.item
        })
    }
    onClickUpdateBtn = () => {
        this.setState({
            confirmLoading: true,
        });
        Api.postWithAuth("/user/update", {
            ...this.state.item
        }).then(res => {
            if(res.returnCode === 200){
                message.success(res.msg,1);
                this.setState({
                    confirmLoading: false,
                    visible: false
                });
            }else{
                message.warn(res.msg,1);
            }

        }).catch(e=>{
            this.setState({
                confirmLoading: false,
            });
        })
    }
    render() {
        return (
            <div style={{minWidth: 1024}}>
                <div>
                    <Row type="flex" justify="start" align="middle">
                        <Col span={5}>
                            <Input.Search
                                placeholder="请输入搜索的内容"
                                onSearch={value => this.searchInput(value)}
                                enterButton
                            />
                        </Col>
                        <Col span={1}/>

                        <Col span={2}>
                            <Switch checkedChildren="开" unCheckedChildren="关"
                                    onChange={this.filtrateData.bind(this, "sx")}/> <span className='font'>筛选</span>
                        </Col>


                        <Col span={1}/>
                        <Col span={2}>
                            <Switch checkedChildren="男" unCheckedChildren="女" checked={this.state.sex === '男'}
                                    onChange={this.filtrateData.bind(this, "sex")}/> <span
                            className='font'>性别</span>
                        </Col>
                        <Col span={1}/>
                        <Col span={3}>
                            <Switch checkedChildren="是" unCheckedChildren="否" checked={this.state.isCardNum === '1'}
                                    onChange={this.filtrateData.bind(this, "isCardNum")}/> <span
                            className='font'>实名认证</span>
                        </Col>
                        <Col span={1}/>
                        <Col span={3}>
                            <Switch checkedChildren="有" unCheckedChildren="无"
                                    checked={this.state.isBrankNum === '1'}
                                    onChange={this.filtrateData.bind(this, "isBrankNum")}/> <span
                            className='font'>银行卡</span>
                        </Col>


                    </Row>
                    <Row>
                        <Row>
                            <Table columns={this.columns}
                                   dataSource={jsUtil.isEmpty(this.state.resultData) ? null : this.state.resultData}
                                   loading={this.state.tableLoading}
                                   pagination={false}
                            />
                        </Row>
                        <Row type="flex" justify="center">
                            <Pagination showSizeChanger onChange={this.pageChange} onShowSizeChange={this.pageChange}
                                        total={this.state.pages}/>
                        </Row>
                    </Row>
                </div>
                {/*修改用户信息*/}
                <Modal
                    title="修改用户资料"
                    okText="保存"
                    confirmLoading={this.state.confirmLoading}
                    visible={this.state.visible}
                    onOk={this.onClickUpdateBtn}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        });
                        this.getDate()
                    }}
                >
                    <Row type="flex" justify="center" align="middle" className="marginBottom">
                        <Col span={4} className="font marginRight textAlignR">登录账户</Col>
                        <Col span={10}>
                            <Input value={this.state.item.loginId} onChange={this.onChangeInput.bind(this, 'loginId')}  />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" className="marginBottom">
                        <Col span={4} className="font marginRight textAlignR">姓名</Col>
                        <Col span={10}>
                            <Input value={this.state.item.realName} onChange={this.onChangeInput.bind(this, 'realName')}/>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" className="marginBottom">
                        <Col span={4} className="font marginRight textAlignR">性别</Col>
                        <Col span={10}>
                            <Radio.Group onChange={this.onChangeRadio.bind(this, 'sex')} value={this.state.item.sex}>
                                <Radio value={'男'}>男</Radio>
                                <Radio value={'女'}>女</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" className="marginBottom">
                        <Col span={4} className="font marginRight textAlignR">出生日期</Col>
                        <Col span={10}>
                            <DatePicker onChange={this.onChangeDatePicker.bind(this,'birthday')} value={ jsUtil.isEmpty(this.state.item.birthday) ? null : moment(this.state.item.birthday , 'YYYY-MM-DD')}  />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" className="marginBottom">
                        <Col span={4} className="font marginRight textAlignR">身份证号</Col>
                        <Col span={10}>
                            <Input value={this.state.item.cardIdNum} onChange={this.onChangeInput.bind(this, 'cardIdNum')} />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" className="marginBottom">
                        <Col span={4} className="font marginRight textAlignR">银行卡号</Col>
                        <Col span={10}>
                            <Input value={this.state.item.bankcardNo} onChange={this.onChangeInput.bind(this, 'bankcardNo')}/>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" className="marginBottom">
                        <Col span={4} className="font marginRight textAlignR">家庭住址</Col>
                        <Col span={10}>
                            <Input.TextArea value={this.state.item.domicilePlace} autosize={{
                                minRows: 2, maxRows: 6
                            }} onChange={this.onChangeInput.bind(this, 'domicilePlace')} />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" className="marginBottom">
                        <Col span={4} className="font marginRight textAlignR">实名认证</Col>
                        <Col span={10}>
                            <Radio.Group onChange={this.onChangeRadio.bind(this, 'isCertification')} value={this.state.item.isCertification}>
                                <Radio value={'1'}>是</Radio>
                                <Radio value={'0'}>否</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" className="marginBottom">
                        <Col span={4} className="font marginRight textAlignR">ca证书时间</Col>
                        <Col span={10}>
                            <DatePicker onChange={this.onChangeDatePicker.bind(this,'caValidDate')} value={ jsUtil.isEmpty(this.state.item.caValidDate) ? null : moment(this.state.item.caValidDate , 'YYYY-MM-DD')}  />
                        </Col>
                    </Row>
                </Modal>

            </div>
        )
    }
}