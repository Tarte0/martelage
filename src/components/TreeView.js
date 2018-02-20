// @flow
import React from 'react';
import {Card, Col, Row, Table, Button} from 'antd';
import TreeGraph from './TreeGraph';
import TreeList from '../containers/TreeList';
class TreeView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {
        const {selectedParcel} = this.props;
        let arbres = selectedParcel ? selectedParcel.has("arbres") ? selectedParcel.get("arbres").toList().toJS() : [] : [];
        return (
            <div>
                <Card>
                    {selectedParcel ?
                        <div>
                            <Row>
                                <Col span={24}>
                                <p>nom : {selectedParcel.get("nom")}</p>
                                <p>lieu : {selectedParcel.get("lieu")}</p>
                                <p>surface : {selectedParcel.get("surface")} ha</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <TreeList expended={true}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                <TreeGraph trees={arbres}/>
                                </Col>
                            </Row>


                        </div>
                        : "Merci de choisir une parcelle"}
                </Card>
            </div>
        );
    }
}

TreeView.propTypes = {};

export default TreeView;
