// @flow
import React from "react";
import {Form, Input, Button, Card, Menu, Dropdown, Icon} from "antd";

class EtatsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            essence: "",
            type: ""
        };
    }

    render() {

        const typesDropDown = (
            <Menu onClick={(e) => this.setState({type : e.key})}>
                {this.props.types.map(p => (<Menu.Item key={p.type}>{p.type}</Menu.Item>))}
            </Menu>
        );

        return (
            <Card>
                <Form>
                    <Form.Item label="Essence">
                        <Input value={this.state.essence} onChange={(e) => {
                            this.setState({essence: e.target.value.toLowerCase()})
                        }}/>
                    </Form.Item>
                    <Form.Item label="Type">
                        <Dropdown overlay={typesDropDown}>
                            <Button style={{marginLeft: 8}}>
                                {this.state.type} <Icon type="down"/>
                            </Button>
                        </Dropdown>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={this.props.savingEssence}
                            disabled={!this.state.essence || !this.state.type} onClick={() => {
                            this.props.addEssence(this.state.essence, this.state.type);
                            this.setState({essence: "", type: ""})
                        }}>Sauvegarder</Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

EtatsForm.propTypes = {};

export default EtatsForm;
