// @flow
import React from "react";
import {Card, Col, Row} from "antd";
import TreeGraph from './TreeGraph';
import TrunkGraph from './TrunkGraph';
import SpecieChart from './chart/SpecieChart';
class ParcelList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {selectedParcel} = this.props;
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
                                <Col span={8}>
                                    <TreeGraph trees={this.props.selectedTrees}/>
                                </Col>
                                <Col span={8}>
                                    <TrunkGraph trees={this.props.selectedTrees}/>
                                </Col>
                                <Col span={8}>
                                    <SpecieChart trees={this.props.selectedTrees} species={this.props.essences} types={this.props.types}/>
                                </Col>
                            </Row>
                        </div>
                        : "Merci de choisir une parcelle"}
                </Card>
            </div>
        );
    }
}

ParcelList.propTypes = {};

export default ParcelList;
