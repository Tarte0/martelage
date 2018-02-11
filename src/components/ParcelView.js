// @flow
import React from 'react';
import {Card, Col, Row, Table, Button} from 'antd';
import  TreeGraph from './TreeGraph'
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
                                    <p>surface : {selectedParcel.get("surface")}</p>
                                    <TreeGraph trees={arbres}/>
                                </Col>
                                <Col span={14}>
                                    <Table
                                        locale={{emptyText: 'Aucun arbre'}}
                                        dataSource={arbres}
                                        columns={
                                            [
                                                {
                                                    title: "numero",
                                                    dataIndex: "numero",
                                                    key: "numero",
                                                    sorter: (a, b) => a.numero - b.numero
                                                },
                                                {
                                                    title: "diametre",
                                                    dataIndex: "diametre",
                                                    key: "diametre",
                                                    sorter: (a, b) => a.diametre - b.diametre
                                                },
                                                {
                                                    title: "essence",
                                                    dataIndex: "essence",
                                                    key: "essence",
                                                    sorter: (a, b) => a.essence - b.essence
                                                },
                                                {
                                                    title: "etat",
                                                    dataIndex: "etat",
                                                    key: "etat",
                                                    sorter: (a, b) => a.etat - b.etat
                                                },
                                                {
                                                    title: "noteEcologique",
                                                    dataIndex: "noteEcologique",
                                                    key: "noteEcologique",
                                                    sorter: (a, b) => a.noteEcologique - b.noteEcologique
                                                },
                                            ]

                                        }/>
                                </Col>
                            </Row>


                        </div>
                        : "please select a parcel"}
                </Card>
            </div>
        );
    }
}

ParcelList.propTypes = {};

export default ParcelList;
