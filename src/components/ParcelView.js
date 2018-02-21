// @flow
import React from 'react';
import {Card, Col, Row, Table, Button} from 'antd';
import  TreeGraph from './TreeGraph'
import TreeList from '../containers/TreeList';
import TrunkGraph from "./TrunkGraph";
class ParcelList extends React.Component {

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
                                <Col span={10}>
                                    <p>nom : {selectedParcel.get("nom")}</p>
                                    <p>lieu : {selectedParcel.get("lieu")}</p>
                                    <p>surface : {selectedParcel.get("surface")} ha</p>
                                    <TreeGraph trees={arbres}/>

                                </Col>
                                <Col span={14}>
                                    <TreeList/>
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
