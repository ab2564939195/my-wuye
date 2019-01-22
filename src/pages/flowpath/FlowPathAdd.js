import React from 'react';
import {Button, Icon, Row, Col, Modal, Input, Switch, message, Checkbox} from 'antd';
import './flowPath.css';
import ComponentSelect from "./ComponentSelect";

export default class FlowPathAdd extends React.Component {

    constructor(prop) {
        super(prop);
        this.state = {
            addButZhuJian: false, //添加节点按钮加载状态
            serve: {name: '服务单', type: '', isShowAuditor: false},
            visible: false,
            serveInput: {name: '服务单', type: '', isShowAuditor: false},
            // {order: -1 , type: '' , name : ''}
            jieguoArray: [{name: '未命名', describe: '', ziduanResult: []}],
            jieguoInputResult: {index: -1, item: {}},
        }

    }

    updateServeNameClick = () => {
        this.setState({
            visible: true
        })
    };
    /***
     * 点击保存
     * @param e
     */
    onClickAddBtn = () => {
        let data = Object.assign({}, this.state.serveInput, {...this.state.serveInput});
        this.state.jieguoArray[this.state.jieguoInputResult.index] = this.state.jieguoInputResult.item;
        this.setState({
            visible: false,
            visibleSetting: false,
            visibleJieDianName: false,
            serve: data,
            jieguoArray: this.state.jieguoArray
        });
    };
    /***
     * 文本输入
     * @param e
     */
    inputChange = (e) => {
        if (e.target.id === 'serverName') {
            this.state.serveInput.name = e.target.value;
        }
        if (e.target.id === 'serverType') {
            this.state.serveInput.type = e.target.value;
        }
        if (e.target.id === 'jieguoArrayName') {
            this.state.jieguoInputResult.item.name = e.target.value;
        }
        if (e.target.id === 'jieguoArrayDescribe') {
            this.state.jieguoInputResult.item.describe = e.target.value;
        }
        this.setState({
            jieguoInputResult: this.state.jieguoInputResult,
            serveInput: this.state.serveInput
        });
        console.log(this.state.jieguoInputResult)
    };
    /**
     * 点击取消
     * */
    onCancel = () => {
        let data = Object.assign({}, this.state.serve, {...this.state.serve});
        this.setState({
            visible: false,
            serveInput: data
        });
    };
    addSetting = () => {
        this.setState({
            visibleSetting: true,
        });
    };

    //删除节点
    delJieDian = (e) => {
        let index = e.target.id;
        console.log(index);
        console.log(this.state.jieguoArray.length);
        if (this.state.jieguoArray.length === 1) {
            message.warn("必须保留一个节点", 1)
        }
        this.state.jieguoArray.splice(index, 1);
        this.setState({
            jieguoArray: this.state.jieguoArray
        });
        console.log(...this.state.jieguoArray);

    }
    //添加节点
    addJIeDian = () => {
        this.state.jieguoArray.push({name: '未命名', describe: '', ziduanResult: []});
        this.setState({
            jieguoArray: this.state.jieguoArray
        })
        console.log(...this.state.jieguoArray);
    }


    addZj = (index, e) => {
        console.log(index);
        this.setState({
            pageY: e.pageY,
            addButZhuJian: true,
            zhujianHid: 'false',
            addBtnZhuJianIndex: index
        })

    }

    componentClose = () => {
        this.setState({
            addButZhuJian: false,
            zhujianHid: 'true'
        })
    }
    componentBtnClick = (type) => {
        let item = {
            order: this.state.jieguoArray[this.state.addBtnZhuJianIndex].ziduanResult.length,
            type: type,
            name: ''
        };
        this.state.jieguoInputResult.item = item;
        this.state.jieguoInputResult.index = this.state.addBtnZhuJianIndex;
        this.setState({
            componentRedactModal: true,
            jieguoInputResult: this.state.jieguoInputResult
        })
    }
    componentContentUpdateInput = (type, e) => {
        if (type === 'name') {
            this.state.jieguoInputResult.item.name = e.target.value
        }
        if (type === 'detail') {
            this.state.jieguoInputResult.item.detail = e.target.value
        }
        if (type === 'defaultValue') {
            this.state.jieguoInputResult.item.defaultValue = e.target.value
        }
        if (type === 'alias') {
            this.state.jieguoInputResult.item.alias = e.target.value
        }

        this.setState({
            jieguoInputResult: this.state.jieguoInputResult
        })
        console.log(this.state.jieguoInputResult)
    }

    render() {
        return (
            <div className="add-body">
                <Row className="add-head" type="flex" justify="space-between" align="middle">
                    <Col offset={1}>
                        <a className="add-font-bold" onClick={this.updateServeNameClick}>
                            {this.state.serve.name}
                            <span className="add-font-bold" style={{marginLeft: 5}}>
                            <Icon type="form"/>
                        </span>
                        </a>
                        {/*修改服务单名字的模态框*/}
                        <Modal
                            title="服务单名字"
                            visible={this.state.visible}
                            onOk={this.onClickAddBtn}
                            onCancel={this.onCancel}
                        >
                            <Row type="flex" justify="center" align="middle" className="marginBottom">
                                <Col className="font marginRight textAlignR">名称</Col>
                                <Col>
                                    <Input onChange={this.inputChange} id="serverName" placeholder="最多输入20个字"
                                           maxLength={20} value={this.state.serveInput.name}/>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center" align="middle" className="marginBottom">
                                <Col className="font marginRight textAlignR">类型</Col>
                                <Col>
                                    <Input placeholder="最多输入10个字" onChange={this.inputChange} id="serverType"
                                           maxLength={10} value={this.state.serveInput.type}/>
                                </Col>
                            </Row>
                        </Modal>

                    </Col>
                    <Col span={4} offset={-2}>
                        <Button onClick={this.addSetting} className="add-margin-right" size={'large'} type="primary">
                            <span className="add-font-bold">
                              设置
                            </span>
                        </Button>
                        <Modal

                            title="设置"
                            visible={this.state.visibleSetting}
                            onCancel={() => {
                                this.setState({
                                    visibleSetting: false
                                })

                            }}
                        >
                            <Row type="flex" justify="center" align="middle" className="marginBottom">

                                <Col className="font marginRight textAlignR">
                                    <Switch checked={this.state.serve.isShowAuditor} onChange={(checked) => {
                                        let data = Object.assign({}, this.state.serve, {isShowAuditor: checked});
                                        this.setState({
                                            serve: data
                                        });
                                    }}/>
                                    <span>
                                    是否显示审核人
                                    </span>
                                </Col>
                            </Row>
                        </Modal>


                        <Button size={'large'} type="primary">
                            <span className="add-font-bold">
                              保存
                            </span>
                        </Button>
                    </Col>
                </Row>
                <div style={{margin: 10}}>
                    {
                        this.state.jieguoArray.map((item, index) => (
                            <Row>
                                <Row type='flex' justify='start' align="middle">
                                    <Col span={1} className='add-text-align'>
                                        <Icon style={{fontSize: 24, color: 'rgb(2, 136, 209)'}} type="minus-circle"
                                              theme="filled"/>
                                    </Col>
                                    <Col span={3} className='add-text-align'>
                                        <Button className="addBtn" onClick={() => {
                                            this.state.jieguoInputResult.index = index;
                                            let data = Object.assign({}, this.state.jieguoInputResult.item, {...item});
                                            this.state.jieguoInputResult.item = data;
                                            this.setState({
                                                visibleJieDianName: true,
                                                jieguoInputResult: this.state.jieguoInputResult
                                            })
                                        }}>
                                            节点名称：{item.name}
                                        </Button>


                                    </Col>
                                    <Col span={18}>
                                        <div style={{height: 3, backgroundColor: 'rgb(2, 136, 209)'}}/>
                                    </Col>
                                    {this.state.jieguoArray.length !== 1 ?
                                        <Col span={2}>
                                            <Button id={index} className="addBtn" onClick={this.delJieDian}>
                                                删除节点
                                            </Button>
                                        </Col>
                                        :
                                        null
                                    }
                                </Row>
                                {/*字段*/}
                                {
                                    item.ziduanResult.map((zhiduanItem, index) => (
                                        <Row type='flex' justify='start' align="middle">
                                            {zhiduanItem.alias != undefined && zhiduanItem.alias != null && zhiduanItem.alias != '' ?
                                                <Col span={24}>
                                                    数据别名：{zhiduanItem.alias}
                                                </Col> : null
                                            }
                                            <Row type='flex' justify='start' align="middle">
                                                <Col pull={1} span={6}
                                                     className="add-text-right">{zhiduanItem.name}：</Col>
                                                <Col span={18}>
                                                    <Input disabled={true} type={zhiduanItem.type}
                                                           defaultValue={zhiduanItem.defaultValue}/>
                                                </Col>
                                            </Row>
                                            {/*<Col span={24} className="colHeight"/>*/}
                                        </Row>
                                    ))
                                }
                                <Row type='flex' justify='center' align="middle">
                                    <Col span={1} className='add-text-align'>
                                        <Button loading={this.state.addButZhuJian} type="primary"
                                                onClick={this.addZj.bind(this, index)}>
                                            添加组件
                                        </Button>
                                    </Col>
                                </Row>
                            </Row>
                        ))
                    }
                    <Row type='flex' justify='start' align="middle">
                        <Col span={1} className='add-text-align'>
                            <Icon style={{fontSize: 24, color: 'rgb(2, 136, 209)'}} type="plus-circle" theme="filled"/>
                        </Col>
                        <Col span={3} className='add-text-align'>
                            <Button className="addBtn" onClick={this.addJIeDian}>
                                添加节点
                            </Button>
                        </Col>
                        <Col span={18}>
                            <div style={{height: 3, backgroundColor: 'rgb(2, 136, 209)'}}/>
                        </Col>
                    </Row>
                    <ComponentSelect componentBtnClick={this.componentBtnClick} componentClose={this.componentClose}
                                     zhujianHid={this.state.zhujianHid} top={this.state.pageY}/>
                </div>
                {/*编辑节点名字*/}
                <Modal
                    title="编辑信息"
                    visible={this.state.visibleJieDianName}
                    onOk={this.onClickAddBtn}
                    onCancel={() => {
                        this.setState({
                            visibleJieDianName: false,
                        });
                    }}
                >
                    <Row type="flex" justify="center" align="middle" className="marginBottom">
                        <Col className="font marginRight textAlignR">节点名称</Col>
                        <Col>
                            <Input onChange={this.inputChange} id="jieguoArrayName" placeholder="最多输入20个字"
                                   maxLength={20} value={this.state.jieguoInputResult.item.name}/>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" className="marginBottom">
                        <Col className="font marginRight textAlignR">节点描述</Col>
                        <Col>
                            <Input placeholder="最多输入10个字" onChange={this.inputChange} id="jieguoArrayDescribe"
                                   maxLength={10} value={this.state.jieguoInputResult.item.describe}/>
                        </Col>
                    </Row>
                </Modal>
                {/*编辑组件内容*/}
                <Modal
                    title="编辑信息"
                    onOk={() => {
                        let data = Object.assign({}, this.state.jieguoInputResult.item, {...this.state.jieguoInputResult.item});
                        this.state.jieguoArray[this.state.jieguoInputResult.index].ziduanResult.push(data);
                        this.setState({
                            jieguoArray: this.state.jieguoArray,
                            componentRedactModal: false
                        });
                        this.componentClose();
                        console.log(...this.state.jieguoArray)
                    }}
                    visible={this.state.componentRedactModal}
                    onCancel={() => {
                        this.state.jieguoInputResult.item = {};
                        this.setState({
                            componentRedactModal: false,
                            jieguoInputResult: this.state.jieguoInputResult
                        });
                    }}
                >
                    <Row type="flex" justify="space-between" align="middle">
                        <Col pull={1} span={6} className="add-text-right">名字：</Col>
                        <Col span={18}>
                            <Input value={this.state.jieguoInputResult.item.name}
                                   onChange={this.componentContentUpdateInput.bind(this, 'name')}/>
                        </Col>
                        <Col span={24} className="colHeight"/>
                        <Col pull={1} span={6} className="add-text-right">描述：</Col>
                        <Col span={18}>
                            <Input.TextArea value={this.state.jieguoInputResult.item.detail}
                                            onChange={this.componentContentUpdateInput.bind(this, 'detail')}/>
                        </Col>
                        <Col span={24} className="colHeight"/>
                        <Col pull={1} span={6} className="add-text-right">数据别名：</Col>
                        <Col span={18}>
                            <Input value={this.state.jieguoInputResult.item.alias}
                                   onChange={this.componentContentUpdateInput.bind(this, 'alias')}/>
                        </Col>
                        <Col span={24} className="colHeight"/>
                        <Col pull={1} span={6} className="add-text-right">默认值：</Col>
                        <Col span={18}>
                            <Input value={this.state.jieguoInputResult.item.defaultValue}
                                   type={this.state.jieguoInputResult.item.type}
                                   onChange={this.componentContentUpdateInput.bind(this, 'defaultValue')}/>
                        </Col>
                        <Col span={24} className="colHeight"/>
                        <Col pull={1} span={6} className="add-text-right">是否必填：</Col>
                        <Col span={18}>
                            <Checkbox/>
                        </Col>
                        <Col span={24} className="colHeight"/>
                        <Col pull={1} span={6} className="add-text-right">列表显示：</Col>
                        <Col span={18}>
                            <Checkbox/>
                        </Col>
                        <Col span={24} className="colHeight"/>
                        <Col pull={1} span={6} className="add-text-right">是否允许隐藏：</Col>
                        <Col span={18}>
                            <Checkbox/>
                        </Col>

                    </Row>


                </Modal>


            </div>
        )
    }
}