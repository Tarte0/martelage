// @flow
import React from "react";
import {Card, Table, Col, Row} from "antd";


class ConstantView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props.hauteurMoyenneConst);
        console.log(this.props.prixConst);
        return (
            <Card>
                <Row>
                    <Col span={11}>
                        <Table
                            locale={{emptyText: 'Aucunes constantes'}}
                            dataSource={this.props.hauteurMoyenneConst}
                            onRowClick={(record) => {
                            }}
                            columns={[
                                {
                                    title: "hauteur moyenne",
                                    dataIndex: "key",
                                    key: "key"
                                },
                                {
                                    title: "diametre (cm)",
                                    dataIndex: "value",
                                    key: "value"
                                }
                            ]}
                            bordered
                            title={() => 'Hauteurs Moyennes'}
                        />
                    </Col>
                    <Col offset={1} span={11}>
                        <Table
                            locale={{emptyText: 'Aucunes constantes'}}
                            dataSource={this.props.volumeCommercialConst}
                            onRowClick={(record) => {
                            }}
                            columns={[
                                {
                                    title: "type",
                                    dataIndex: "key",
                                    key: "key"
                                },
                                {
                                    title: "volume commercial (m3)",
                                    dataIndex: "value",
                                    key: "value"
                                }
                            ]}
                            bordered
                            title={() => 'Volumes Commerciaux'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Table
                            locale={{emptyText: 'Aucunes constantes'}}
                            dataSource={this.props.prixConst.chauffage}
                            onRowClick={(record) => {
                            }}
                            columns={[
                                {
                                    title: "type",
                                    dataIndex: "key",
                                    key: "chauffage.key"
                                },
                                {
                                    title: "prix (€)",
                                    dataIndex: "value",
                                    key: "chauffage.value"
                                }
                            ]}
                            bordered
                            title={() => 'Prix bois de chauffage'}
                        />
                    </Col>
                    <Col span={8}>
                        <Table
                            locale={{emptyText: 'Aucunes constantes'}}
                            dataSource={this.props.prixConst.industrie}
                            onRowClick={(record) => {
                            }}
                            columns={[
                                {
                                    title: "type",
                                    dataIndex: "key",
                                    key: "industrie.key"
                                },
                                {
                                    title: "prix (€)",
                                    dataIndex: "value",
                                    key: "industrie.value"
                                }
                            ]}
                            bordered
                            title={() => 'Prix bois d\'industrie'}
                        />
                    </Col>
                    <Col span={8}>
                        <Table
                            locale={{emptyText: 'Aucunes constantes'}}
                            dataSource={this.props.prixConst.oeuvre}
                            onRowClick={(record) => {
                            }}
                            columns={[
                                {
                                    title: "type",
                                    dataIndex: "key",
                                    key: "oeuvre.key"
                                },
                                {
                                    title: "prix (€)",
                                    dataIndex: "value",
                                    key: "oeuvre.value"
                                }
                            ]}
                            bordered
                            title={() => 'Prix bois d\'oeuvre'}
                        />
                    </Col>
                </Row>
            </Card>
        );
    }
}

ConstantView.propTypes = {};

export default ConstantView;
