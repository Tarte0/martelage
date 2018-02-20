// @flow
import React from 'react';
import {Card, Col, Row, Table, Button, Popconfirm} from 'antd';
import {List} from 'immutable';
class TreeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getColumns(arbres) {
        const essences = List(arbres.map((e) => e.essence)).groupBy((e) => e).keySeq().toJS();
        const etats = List(arbres.map((e) => e.etat)).groupBy((e) => e).keySeq().toJS();
        console.log(essences);
        return [
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
                sorter: (a, b) => a.essence.localeCompare(b.essence),
                filters:
                    essences.map((essence) => ({
                        text: essence,
                        value: essence
                    })),
                onFilter: (value, record) => record.essence == value,
                filterMultiple: true
            },
            {
                title: "etat",
                dataIndex: "etat",
                key: "etat",
                sorter: (a, b) => a.etat.localeCompare(b.etat),
                filters:
                    etats.map((etat) => ({
                        text: etat,
                        value: etat
                    })),
                onFilter: (value, record) => record.etat == value,
                filterMultiple: true
            },
            {
                title: "noteEcologique",
                dataIndex: "noteEcologique",
                key: "noteEcologique",
                sorter: (a, b) => a.noteEcologique - b.noteEcologique
            }
        ].concat(
            this.props.expended ?
                [
                    {
                        title: "x",
                        dataIndex: "coord.x",
                        key: "coord.x",
                        sorter: (a, b) => a.coord.x - b.coord.x
                    },
                    {
                        title: "y",
                        dataIndex: "coord.y",
                        key: "coord.y",
                        sorter: (a, b) => a.coord.y - b.coord.y
                    },
                    {
                        title: "utilisationBois",
                        children: [
                            {
                                title: "chauffage",
                                dataIndex: "utilisationBois.chauffage",
                                key: "utilisationBois.chauffage",
                                sorter: (a, b) => a.utilisationBois.chauffage - b.utilisationBois.chauffage
                            },
                            {
                                title: "industrie",
                                dataIndex: "utilisationBois.industrie",
                                key: "utilisationBois.industrie",
                                sorter: (a, b) => a.utilisationBois.industrie - b.utilisationBois.industrie
                            },
                            {
                                title: "oeuvre",
                                dataIndex: "utilisationBois.oeuvre",
                                key: "utilisationBois.oeuvre",
                                sorter: (a, b) => a.utilisationBois.oeuvre - b.utilisationBois.oeuvre
                            },
                            {
                                title: "selectionner",
                                key: "select",
                                render: (index, record, ind) => (
                                    <Button icon="pie-chart"
                                            onClick={() => {
                                                console.log(record);
                                                this.props.selectTree(record.id);
                                            }}
                                    />)
                            },
                            {
                                title: "supprimer",
                                key: "delete",
                                render: (index, record, ind) => (
                                    <Popconfirm placement="topLeft" title="Etes-vous sur?" onConfirm={()=>{
                                        this.props.deleteTree(this.state.selectedParcel, record.id)
                                    }} okText="oui" cancelText="non">
                                        <Button icon="delete" type="danger" />
                                    </Popconfirm>)
                            },
                        ]
                    }
                ] : []
        )

    }

    handleTableChange(){

    }

    render() {
        const {selectedParcel} = this.props;
        let arbres = selectedParcel ? selectedParcel.has("arbres") ? selectedParcel.get("arbres").toList().toJS() : [] : [];
        return (
            <div>
                <div>
                    <Table
                        locale={{emptyText: 'Aucun arbre',
                            filterTitle: 'Filtre',
                            filterConfirm: 'Ok',
                            filterReset: 'Reset',
                        }}
                        dataSource={arbres}
                        columns={this.getColumns(arbres)}
                        onChange={this.handleTableChange}
                    />
                </div>
            </div>
        );
    }
}

TreeList.propTypes = {};

export default TreeList;
