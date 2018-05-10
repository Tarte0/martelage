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
                </Row>
                <Row>
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
                </Row>
                <Row>
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
                </Row>
                <Row>
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
                </Row>
                <Row>
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
                </Row>
                <Row>
                    <Table
                        locale={{emptyText: 'Aucunes constantes'}}
                        dataSource={this.props.prelevementConst}
                        onRowClick={(record) => {
                        }}
                        columns={[
                            {
                                title: "bornes",
                                dataIndex: "key",
                                key: "key"
                            },
                            {
                                title: "volume à prelever (m3)",
                                dataIndex: "value",
                                key: "value"
                            }
                        ]}
                        bordered
                        title={() => 'Bornes du prelevement'}
                    />
                </Row>
            </Card>
        );
    }
}

ConstantView.propTypes = {};

export default ConstantView;
