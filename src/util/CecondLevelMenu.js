import React from 'react';
import {Menu, Input, Button, Row, Col} from 'antd';

const Search = Input.Search;
export default class CecondLevelMenu extends React.Component {
    constructor(prop) {
        super(prop);
    }

    state = {
        current: this.props.defaultSelectMenu,
    };

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
        this.props.clickMenuReturnKey(e.key);
    };
    render() {
        return (
            <Row type={"flex"} justify={"space-between"} align="middle">
                {
                    this.props.MenuList !== undefined ?
                        <Col>
                            <Menu
                                onClick={this.handleClick}
                                selectedKeys={[this.state.current]}
                                mode="horizontal"
                            >
                                {
                                    this.props.MenuList.map((item, index) => {
                                        return (
                                            <Menu.Item key={item.key}>
                                                <span>{item.value}</span>
                                            </Menu.Item>
                                        )
                                    })
                                }
                            </Menu>
                        </Col> : null
                }

                {

                    this.props.searchHint !== undefined ?

                        <Col span={5}>
                            <Search
                                placeholder={this.props.searchHint}
                                onSearch={this.props.clickSearch}
                                enterButton
                            />
                        </Col> : null

                }
                {
                    this.props.Btn !== undefined ?
                        <Col>
                            {this.props.Btn.map((item, index) => {
                                return (
                                    <Button>{item.content}</Button>
                                )
                            })}
                        </Col> : null
                }
            </Row>

        )
    }
}