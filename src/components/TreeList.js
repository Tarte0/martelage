// @flow
import React from 'react';
import {Card, Col, Row, Table, Button, Popconfirm} from 'antd';
import {List} from 'immutable';

const EditableCell = (editable, value, onChange, isNumerical) => (
    <div>
        {editable
            ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => {
                if (isNumerical) {
                    if (Number(e.target.value)) {

                        onChange(Number(e.target.value))
                    }
                } else {
                    onChange(e.target.value)

                }
            }}/>
            : value
        }
    </div>
);
const numericalKeys = ['numero', 'diametre', 'noteEcologique', 'x', 'y', 'chauffage', 'industrie', 'oeuvre'];

class TreeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            success: null,
            edit: null,
            editedData: {
                nom: '',
                lieu: '',
                surface: ''
            }
        };
    }

    getColumns() {
        const essences = List(this.props.selectedTrees.map((e) => e.essence)).groupBy((e) => e).keySeq().toJS();
        const etats = List(this.props.selectedTrees.map((e) => e.etat)).groupBy((e) => e).keySeq().toJS();
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
                filters: essences.map((essence) => ({
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
                filters: etats.map((etat) => ({
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
                            }
                        ]
                    },
                    {
                        title: "modifier",
                        key: "edit",
                        render: (index, record, ind) => (
                            this.state.edit === ind ?
                                <div>
                                    <Button icon="close"
                                            onClick={() => {
                                                this.setState({edit: null});
                                            }}
                                    /> <Button icon="save"
                                               onClick={() => {
                                                   this.setState({edit: ind});
                                                   this.props.editParcel(record.id, this.state.editedData)
                                               }}
                                /></div>
                                :
                                <div>
                                    <Button icon="edit"
                                            onClick={() => {
                                                this.setState({edit: ind, success: null});
                                                this.setState({editedData: {...record}});
                                            }}
                                    >{this.props.editingParcelSuccess && this.state.success === ind ?
                                        <Icon type="check" style={{color: "green"}}/> : ""}</Button>
                                </div>)
                    },
                    {
                        title: "supprimer",
                        key: "delete",
                        render: (index, record, ind) => (
                            <Popconfirm placement="topLeft" title="Etes-vous sur?" onConfirm={() => {
                                this.props.deleteTree(this.props.selectedParcel.get("id"), record.id)
                            }} okText="oui" cancelText="non">
                                <Button icon="delete" type="danger"/>
                            </Popconfirm>)
                    },
                ] : []
        )

    }


    render() {

        return (
            <div>
                <div>
                    <Table
                        locale={{
                            emptyText: 'Aucun arbre',
                            filterTitle: 'Filtre',
                            filterConfirm: 'Ok',
                            filterReset: 'Reset',
                        }}
                        dataSource={this.props.selectedTrees}
                        columns={this.getColumns()}
                        bordered
                        size='middle'
                    />
                </div>
            </div>
        );
    }
}

TreeList.propTypes = {};

export default TreeList;
