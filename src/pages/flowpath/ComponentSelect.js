import React from 'react';
import './flowPath.css';
import {Button, Row, Col} from 'antd';

export default class ComponentSelect extends React.Component {

    render() {
        return (
            // style={{top: this.props.top}}
            <div className="componentSelectDiv" hidden={this.props.zhujianHid === 'false' ? false : true || true}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col>
                        <Button  onClick={this.props.componentBtnClick.bind(this,'text')}>单行文本</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.props.componentBtnClick.bind(this,'number')}>数字</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.props.componentBtnClick.bind(this,'text')}>关联</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.props.componentBtnClick.bind(this,'text')}>上传文件</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.props.componentBtnClick.bind(this,'dateTime')}>日期时间</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.props.componentBtnClick.bind(this,'date')}>日期</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.props.componentBtnClick.bind(this,'text')}>手机号码</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.props.componentBtnClick.bind(this,'text')}>审核控件</Button>
                    </Col>

                    <Col>
                        <Button onClick={this.props.componentBtnClick.bind(this,'text')}>多行文本</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.props.componentBtnClick.bind(this,'checkbox')}>多选按钮</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.props.componentBtnClick.bind(this,'radio')}>单选按钮</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.props.componentClose}>关闭</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}