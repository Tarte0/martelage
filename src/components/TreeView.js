// @flow
import React from "react";
import {Card, Col, Input} from "antd";
import {EditableCell} from './TreeList'
class TreeView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div>
                <Card>

                    <Col span={12}>
                        {this.props.edited?EditableCell(this.props.edited, this.props.valueX, this.props.onChangeX, false, true):<p>Coordonnée x : {this.props.valueX}</p>}

                    </Col>
                    <Col span={12}>
                        {this.props.edited?EditableCell(this.props.edited, this.props.valueY, this.props.onChangeY, false, true):<p>Coordonnée y : {this.props.valueY}</p>}
                    </Col>

                </Card>
            </div>
        );
    }
}

TreeView.propTypes = {};

export default TreeView;
