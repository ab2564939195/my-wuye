import React from 'react';
import {Button, Icon, Row, Col, Modal, Input, Switch, message, Checkbox, DatePicker} from 'antd';
import './flowPath.css';
import ComponentSelect from "./ComponentSelect";
import moment from 'moment';
import jsUtil from "../../util/JsUtil";

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

    //点击设置
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

    //点击添加组件
    addZj = (index, e) => {
        console.log(index);
        this.setState({
            pageY: e.pageY,
            addButZhuJian: true,
            zhujianHid: 'false',
            addBtnZhuJianIndex: index
        })

    }
    //关闭组件
    componentClose = () => {
        this.setState({
            addButZhuJian: false,
            zhujianHid: 'true',
            isUpdate: false
        })

    }
    //点击小组件
    componentBtnClick = (type) => {
        let item = {
            order: this.state.jieguoArray[this.state.addBtnZhuJianIndex].ziduanResult.length,
            type: type,
            name: ''
        };
        if (type === 'radio' || type === 'checkbox') {
            item.radioGroup = ['默认值', '默认值']
        }
        this.state.jieguoInputResult.item = item;
        this.state.jieguoInputResult.index = this.state.addBtnZhuJianIndex;
        this.setState({
            componentRedactModal: true,
            jieguoInputResult: this.state.jieguoInputResult
        })
        console.log(this.state.jieguoInputResult);
    }
    //组件编辑文本框输入内容
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
    //组件编辑单选
    componentContentUpdateCheckbox = (type, e) => {
        if (type === 'isFillIn') {
            this.state.jieguoInputResult.item.isFillIn = e.target.checked
        }
        if (type === 'listShow') {
            this.state.jieguoInputResult.item.listShow = e.target.checked
        }
        if (type === 'isHidden') {
            this.state.jieguoInputResult.item.isHidden = e.target.checked
        }
        if (type === 'defaultNewDate') {
            this.state.jieguoInputResult.item.defaultNewDate = e.target.checked
        }
        this.setState({
            jieguoInputResult: this.state.jieguoInputResult
        })
    }
    componentContentSelectInput = (index, e) => {
        this.state.jieguoInputResult.item.radioGroup[index] = e.target.value;
        this.setState({
            jieguoInputResult: this.state.jieguoInputResult
        })
    }
    componentContentSelectDelect = (index) => {
        if (this.state.jieguoInputResult.item.radioGroup.length === 1) {
            message.warn("必须保留一个", 1);
            return;
        }
        this.state.jieguoInputResult.item.radioGroup.splice(index, 1);
        this.setState({
            jieguoInputResult: this.state.jieguoInputResult
        })

    }
    //删除字段结果
    deletzhiDuanJieGuo = (index , zhiduanIndex) =>{
        console.log(index);
        console.log(this.state.jieguoArray);
        this.state.jieguoArray[index].ziduanResult.splice(zhiduanIndex, 1);
        this.setState({
            jieguoArray:  this.state.jieguoArray
        })
    }
    updateZhiDuanJieGuo = (index , zhiduanIndex) =>{
        this.setState({
            componentRedactModal: true,
            isUpdate: true
        })
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
                    {/*节点结构*/}
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
                                    item.ziduanResult.map((zhiduanItem, zhiduanIndex) => (
                                        <Row>
                                            <Row type='flex' justify='start' align="middle">
                                                <Col offset={5} span={19}>
                                                <span className="add-margin-right">
                                                    {zhiduanItem.listShow === undefined || zhiduanItem.listShow === null || zhiduanItem.listShow === '' ||
                                                    zhiduanItem.listShow === false ?
                                                        <Icon type="close-circle" theme="twoTone"/> :
                                                        <Icon type="check-circle" theme="twoTone"/>
                                                    }
                                                    列表显示
                                                </span>
                                                    <span className="add-margin-right">
                                                    {zhiduanItem.isFillIn === undefined || zhiduanItem.isFillIn === null || zhiduanItem.isFillIn === '' ||
                                                    zhiduanItem.isFillIn === false ?
                                                        <Icon type="close-circle" theme="twoTone"/> :
                                                        <Icon type="check-circle" theme="twoTone"/>
                                                    }
                                                        必填
                                                </span>
                                                    <span className="add-margin-right">
                                                    {zhiduanItem.isHidden === undefined || zhiduanItem.isHidden === null || zhiduanItem.isHidden === '' ||
                                                    zhiduanItem.isHidden === false ?
                                                        <Icon type="close-circle" theme="twoTone"/> :
                                                        <Icon type="check-circle" theme="twoTone"/>
                                                    }
                                                        隐藏
                                                </span>
                                                    {
                                                        zhiduanItem.type === 'dateTime' || zhiduanItem.type === 'date' ?
                                                                <span className="add-margin-right">
                                                                    {zhiduanItem.defaultNewDate === undefined || zhiduanItem.defaultNewDate === null || zhiduanItem.defaultNewDate === '' ||
                                                                    zhiduanItem.defaultNewDate === false ?
                                                                        <Icon type="close-circle" theme="twoTone"/> :
                                                                        <Icon type="check-circle" theme="twoTone"/>
                                                                    }
                                                                    当前时间
                                                                </span>
                                                            : null
                                                    }
                                                    <span>
                                                    {zhiduanItem.alias !== undefined && zhiduanItem.alias !== null && zhiduanItem.alias !== '' ?
                                                        '数据别名：' + zhiduanItem.alias : null
                                                    }
                                                </span>

                                                </Col>
                                            </Row>
                                            {zhiduanItem.type === 'radio' || zhiduanItem.type === 'checkbox' ?
                                                <Row type='flex' justify='start' align="middle">
                                                    <Col span={5}
                                                         className="add-text-right">{zhiduanItem.name}：</Col>
                                                    <Col span={10}>
                                                        {
                                                            zhiduanItem.radioGroup.map((radioGroupItem, index) => ((
                                                                <span className="add-margin-right">
                                                                      {radioGroupItem} <Checkbox disabled={true}/>
                                                                   </span>
                                                            )))
                                                        }
                                                    </Col>
                                                    <Col span={24} className="colHeight"/>
                                                    <Col span={24} className="colHeight"/>
                                                </Row> :

                                                <Row type='flex' justify='start' align="middle">
                                                    <Col span={5}
                                                         className="add-text-right">{zhiduanItem.name}：</Col>
                                                    <Col span={10}>
                                                        <Input disabled={true} type={zhiduanItem.type}
                                                               value={zhiduanItem.defaultValue}/>
                                                    </Col>
                                                    <Col push={1} span={2}>
                                                        <Button  onClick={this.deletzhiDuanJieGuo.bind(this,index,zhiduanIndex)}>
                                                            删除
                                                        </Button>

                                                    </Col>
                                                    <Col push={1} span={2}>
                                                        <Button onClick={this.updateZhiDuanJieGuo.bind(this,index,zhiduanIndex)}>
                                                            更新
                                                        </Button>

                                                    </Col>
                                                    <Col span={24} className="colHeight"/>
                                                    <Col span={24} className="colHeight"/>
                                                </Row>
                                            }

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

                    {/*添加节点*/}
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
                        if(this.state.isUpdate){
                            this.state.jieguoArray[this.state.jieguoInputResult.index].ziduanResult[data.order]=data;
                        }else{
                            this.state.jieguoArray[this.state.jieguoInputResult.index].ziduanResult.push(data);
                        }
                        this.setState({
                            jieguoArray: this.state.jieguoArray,
                            componentRedactModal: false
                        });
                        this.componentClose();
                        console.log(...this.state.jieguoArray)
                    }}
                    visible={this.state.componentRedactModal}
                    onCancel={() => {
                        if (this.state.isUpdate !== true) {
                            this.state.jieguoInputResult.item = {};
                            this.setState({
                                componentRedactModal: false,
                                jieguoInputResult: this.state.jieguoInputResult,
                                isUpdate: false
                            });
                        }else{
                            console.log(this.state.jieguoArray[this.state.jieguoInputResult.index].ziduanResult[this.state.jieguoInputResult.item.order]);
                            let data = Object.assign({}, this.state.jieguoArray[this.state.jieguoInputResult.index].ziduanResult[this.state.jieguoInputResult.item.order], {...this.state.jieguoArray[this.state.jieguoInputResult.index].ziduanResult[this.state.jieguoInputResult.item.order]});
                            this.state.jieguoInputResult.item =data;
                            this.setState({
                                componentRedactModal: false,
                                jieguoInputResult:  this.state.jieguoInputResult,
                                isUpdate: false
                            });
                        }

                    }}
                >
                    <Row type="flex" justify="space-between" align="middle">
                        <Col pull={1} span={7} className="add-text-right">名字：</Col>
                        <Col span={17}>
                            <Input value={this.state.jieguoInputResult.item.name}
                                   onChange={this.componentContentUpdateInput.bind(this, 'name')}/>
                        </Col>
                        <Col span={24} className="colHeight"/>
                    </Row>
                    <Row type="flex" justify="space-between" align="middle">
                        <Col pull={1} span={7} className="add-text-right">描述：</Col>
                        <Col span={17}>
                            <Input.TextArea value={this.state.jieguoInputResult.item.detail}
                                            onChange={this.componentContentUpdateInput.bind(this, 'detail')}/>
                        </Col>
                        <Col span={24} className="colHeight"/>
                    </Row>
                    <Row type="flex" justify="space-between" align="middle">
                        <Col pull={1} span={7} className="add-text-right">数据别名：</Col>
                        <Col span={17}>
                            <Input value={this.state.jieguoInputResult.item.alias}
                                   onChange={this.componentContentUpdateInput.bind(this, 'alias')}/>
                        </Col>
                        <Col span={24} className="colHeight"/>
                    </Row>
                    {this.state.jieguoInputResult.item.type === 'radio' || this.state.jieguoInputResult.item.type === 'checkbox' ?
                        <Row type="flex" justify="space-between" align="middle">
                            <Col pull={1} span={7} className="add-text-right">
                                选项：
                            </Col>
                            <Col span={17}>
                                {this.state.jieguoInputResult.item.radioGroup.map((radioGroupItem, index) => (
                                    <Row type="flex" className="marginBottom">
                                        <Col span={18}>
                                            <Input value={radioGroupItem}
                                                   onChange={this.componentContentSelectInput.bind(this, index)}/>
                                        </Col>
                                        <Col push={1} span={2}>
                                            <Button onClick={this.componentContentSelectDelect.bind(this, index)}>
                                                删除
                                            </Button>
                                        </Col>
                                    </Row>

                                ))}
                            </Col>
                            <Col push={6} span={24}>
                                <Button onClick={() => {
                                    this.state.jieguoInputResult.item.radioGroup.push("默认值");
                                    this.setState({
                                        jieguoInputResult: this.state.jieguoInputResult
                                    })
                                }}>
                                    添加选项
                                </Button>

                            </Col>
                            <Col span={24} className="colHeight"/>
                        </Row>
                        : this.state.jieguoInputResult.item.type === 'dateTime' || this.state.jieguoInputResult.item.type === 'date' ?
                            //时间控件
                            (
                                <Row type="flex" justify="space-between" align="middle">
                                    <Col pull={1} span={7} className="add-text-right">默认值：</Col>
                                    <Col span={17}>
                                        <DatePicker
                                            value={jsUtil.isEmpty(this.state.jieguoInputResult.item.defaultValue) ? null : moment(this.state.jieguoInputResult.item.defaultValue, this.state.jieguoInputResult.item.type === 'dateTime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')}
                                            showTime={this.state.jieguoInputResult.item.type === 'dateTime'}
                                            format={this.state.jieguoInputResult.item.type === 'dateTime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
                                            showTime={this.state.jieguoInputResult.item.type === 'dateTime'}
                                            onChange={(date, dateString) => {
                                                this.state.jieguoInputResult.item.defaultValue = dateString;
                                                this.setState({
                                                    jieguoInputResult: this.state.jieguoInputResult
                                                })
                                            }}/>
                                    </Col>
                                    <Col span={24} className="colHeight"/>
                                </Row>
                            )
                            :
                            (
                                <Row type="flex" justify="space-between" align="middle">
                                    <Col pull={1} span={7} className="add-text-right">默认值：</Col>
                                    <Col span={17}>
                                        <Input value={this.state.jieguoInputResult.item.defaultValue}
                                               type={this.state.jieguoInputResult.item.type}
                                               onChange={this.componentContentUpdateInput.bind(this, 'defaultValue')}/>
                                    </Col>
                                    <Col span={24} className="colHeight"/>
                                </Row>
                            )

                    }

                    <Row type="flex" justify="space-between" align="middle">
                        <Col pull={1} span={7} className="add-text-right">是否必填：</Col>
                        <Col span={17}>
                            <Checkbox checked={this.state.jieguoInputResult.item.isFillIn}
                                      onChange={this.componentContentUpdateCheckbox.bind(this, 'isFillIn')}/>
                        </Col>
                        <Col span={24} className="colHeight"/>
                    </Row>
                    <Row type="flex" justify="space-between" align="middle">
                        <Col pull={1} span={7} className="add-text-right">列表显示：</Col>
                        <Col span={17}>
                            <Checkbox checked={this.state.jieguoInputResult.item.listShow}
                                      onChange={this.componentContentUpdateCheckbox.bind(this, 'listShow')}/>
                        </Col>
                        <Col span={24} className="colHeight"/>
                    </Row>
                    <Row type="flex" justify="space-between" align="middle">
                        <Col pull={1} span={7} className="add-text-right">是否允许隐藏：</Col>
                        <Col span={17}>
                            <Checkbox checked={this.state.jieguoInputResult.item.isHidden}
                                      onChange={this.componentContentUpdateCheckbox.bind(this, 'isHidden')}/>
                        </Col>
                        <Col span={24} className="colHeight"/>
                    </Row>
                    {
                        this.state.jieguoInputResult.item.type === 'dateTime' || this.state.jieguoInputResult.item.type === 'date' ?
                            <Row type="flex" justify="space-between" align="middle">
                                <Col pull={1} span={7} className="add-text-right">是否默认当前时间：</Col>
                                <Col span={17}>
                                    <Checkbox checked={this.state.jieguoInputResult.item.defaultNewDate}
                                              onChange={this.componentContentUpdateCheckbox.bind(this, 'defaultNewDate')}/>
                                </Col>
                            </Row> : null
                    }
                </Modal>


            </div>
        )
    }
}