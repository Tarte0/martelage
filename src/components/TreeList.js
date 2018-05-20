// @flow
import React from "react";
import {Table, Button, Popconfirm, Input, Icon, Menu, Dropdown} from "antd";
import {List} from "immutable";
import TreeView from "./TreeView";

export const EditableCell = (editable, value, onChange, isNumerical, isFloat) => (
    <div>
        {editable
            ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => {
                if (isNumerical) {
                    if (Number(e.target.value)) {
                        onChange(Number(e.target.value))
                    }
                } else if (isFloat) {
                    const fRegex = /^[+-]?\d+(\.\d*)?$/;
                    if (fRegex.test(e.target.value)) {
                        onChange(e.target.value)
                    }
                    if (e.target.value === '') {
                        onChange(e.target.value)
                    }
                } else {
                    onChange(e.target.value)
                }
            }}/>
            : value
        }
    </div>
);

const EditableDropDown = (editable, value, key, overlay) => (
    <div>
        {editable
            ? <Dropdown overlay={overlay}>
                <Button style={{marginLeft: 8}}>
                    {value} <Icon type="down"/>
                </Button>
            </Dropdown>
            : value
        }
    </div>
);

const numericalKeys = ['diametre', 'noteEcologique'];
const floatNumericalKeys = ['coord.x', 'coord.y', 'utilisationBois.chauffage', 'utilisationBois.industrie', 'utilisationBois.oeuvre'];

class TreeList extends React.Component {
    componentWillReceiveProps(next) {
        if (next.editingTreeSuccess && !this.props.editingTreeSuccess) {
            this.setState({success: this.state.edit, edit: null, editId: null})
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            success: null,
            edit: null,
            editId: null,
            editedData: {
                numero: '',
                diametre: null,
                essence: '',
                etat: '',
                noteEcologique: null,
                coord: {
                    x: null,
                    y: null
                },
                utilisationBois: {
                    chauffage: null,
                    industrie: null,
                    oeuvre: null
                }
            }
        };
    }

    getColumns() {
        const essences = List(this.props.selectedTrees.map((e) => e.essence)).groupBy((e) => e).keySeq().toJS();
        const etats = List(this.props.selectedTrees.map((e) => e.etat)).groupBy((e) => e).keySeq().toJS();
        const etatsDropDown = (
            <Menu onClick={(e) => this.setState({editedData: {...this.state.editedData, ['etat']: e.key}})}>
                {this.props.etats.map(p => (<Menu.Item key={p.etat}>{p.etat}</Menu.Item>))}
            </Menu>
        );
        const essencesDropDown = (
            <Menu onClick={(e) => this.setState({editedData: {...this.state.editedData, ['essence']: e.key}})}>
                {this.props.essences.map(p => (<Menu.Item key={p.essence}>{p.essence}</Menu.Item>))}
            </Menu>
        );
        return [
            {
                title: "numero",
                dataIndex: "numero",
                key: "numero",
                render: (a, record, index) =>
                    EditableCell(
                        this.state.edit === index,
                        this.state.edit === index ? this.state.editedData['numero'] : record['numero'],
                        (value) => {
                            this.setState({editedData: {...this.state.editedData, ['numero']: value}})
                        }, numericalKeys.indexOf('numero') > -1, floatNumericalKeys.indexOf('numero') > -1),
                sorter: (a, b) => a.numero - b.numero
            },
            {
                title: "diametre (cm)",
                dataIndex: "diametre",
                key: "diametre",
                render: (a, record, index) =>
                    EditableCell(
                        this.state.edit === index,
                        this.state.edit === index ? this.state.editedData['diametre'] : record['diametre'],
                        (value) => {
                            this.setState({editedData: {...this.state.editedData, ['diametre']: value}})
                        }, numericalKeys.indexOf('diametre') > -1, floatNumericalKeys.indexOf('diametre') > -1),
                sorter: (a, b) => a.diametre - b.diametre
            },
            {
                title: "essence",
                dataIndex: "essence",
                key: "essence",
                render: (a, record, index) =>
                    EditableDropDown(
                        this.state.edit === index,
                        this.state.edit === index ? this.state.editedData['essence'] : record['essence'],
                        'essence',
                        essencesDropDown),
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
                render: (a, record, index) =>
                    EditableDropDown(
                        this.state.edit === index,
                        this.state.edit === index ? this.state.editedData['etat'] : record['etat'],
                        'etat',
                        etatsDropDown),
                sorter: (a, b) => a.etat.localeCompare(b.etat),
                filters: etats.map((etat) => ({
                    text: etat,
                    value: etat
                })),
                onFilter: (value, record) => record.etat == value,
                filterMultiple: true
            },
            {
                title: "note ecologique",
                dataIndex: "noteEcologique",
                key: "noteEcologique",
                render: (a, record, index) =>
                    EditableCell(
                        this.state.edit === index,
                        this.state.edit === index ? this.state.editedData['noteEcologique'] : record['noteEcologique'],
                        (value) => {
                            this.setState({editedData: {...this.state.editedData, ['noteEcologique']: value}})
                        }, numericalKeys.indexOf('noteEcologique') > -1, floatNumericalKeys.indexOf('noteEcologique') > -1),
                sorter: (a, b) => a.noteEcologique - b.noteEcologique
            }
        ].concat(
            this.props.expanded ?
                [
                    {
                        title: "volume commercial (m3)",
                        dataIndex: "volumePrix.volume.commercial",
                        key: "volumeCommercial",
                        sorter: (a, b) => a.volumePrix.volume.commercial - b.volumePrix.volume.commercial
                    },
                    {
                        title: "valeur économique (€)",
                        dataIndex: "volumePrix.prix.valeurEco",
                        key: "valeurEconomique",
                        sorter: (a, b) => a.volumePrix.prix.valeurEco - b.volumePrix.prix.valeurEco
                    },
                    {
                        title: "utilisation bois (sur 100%)",
                        children: [
                            {
                                title: "chauffage (%)",
                                dataIndex: "utilisationBois.chauffage",
                                key: "utilisationBois.chauffage",
                                render: (a, record, index) =>
                                    EditableCell(
                                        this.state.edit === index,
                                        this.state.edit === index ? this.state.editedData['utilisationBois']['chauffage'] : record['utilisationBois']['chauffage'],
                                        (value) => {
                                            this.setState({
                                                editedData: {
                                                    ...this.state.editedData,
                                                    ['utilisationBois']: {
                                                        chauffage: value,
                                                        industrie: this.state.editedData.utilisationBois.industrie,
                                                        oeuvre: this.state.editedData.utilisationBois.oeuvre
                                                    }
                                                }
                                            })
                                        }, numericalKeys.indexOf('utilisationBois.chauffage') > -1, floatNumericalKeys.indexOf('utilisationBois.chauffage') > -1),
                                sorter: (a, b) => a.utilisationBois.chauffage - b.utilisationBois.chauffage
                            },
                            {
                                title: "industrie (%)",
                                dataIndex: "utilisationBois.industrie",
                                key: "utilisationBois.industrie",
                                render: (a, record, index) =>
                                    EditableCell(
                                        this.state.edit === index,
                                        this.state.edit === index ? this.state.editedData['utilisationBois']['industrie'] : record['utilisationBois']['industrie'],
                                        (value) => {
                                            this.setState({
                                                editedData: {
                                                    ...this.state.editedData,
                                                    ['utilisationBois']: {
                                                        chauffage: this.state.editedData.utilisationBois.chauffage,
                                                        industrie: value,
                                                        oeuvre: this.state.editedData.utilisationBois.oeuvre
                                                    }
                                                }
                                            })
                                        }, numericalKeys.indexOf('utilisationBois.industrie') > -1, floatNumericalKeys.indexOf('utilisationBois.industrie') > -1),
                                sorter: (a, b) => a.utilisationBois.industrie - b.utilisationBois.industrie
                            },
                            {
                                title: "oeuvre (%)",
                                dataIndex: "utilisationBois.oeuvre",
                                key: "utilisationBois.oeuvre",
                                render: (a, record, index) =>
                                    EditableCell(
                                        this.state.edit === index,
                                        this.state.edit === index ? this.state.editedData['utilisationBois']['oeuvre'] : record['utilisationBois']['oeuvre'],
                                        (value) => {
                                            this.setState({
                                                editedData: {
                                                    ...this.state.editedData,
                                                    ['utilisationBois']: {
                                                        chauffage: this.state.editedData.utilisationBois.chauffage,
                                                        industrie: this.state.editedData.utilisationBois.industrie,
                                                        oeuvre: value
                                                    }
                                                }
                                            })
                                        }, numericalKeys.indexOf('utilisationBois.oeuvre') > -1, floatNumericalKeys.indexOf('utilisationBois.oeuvre') > -1),
                                sorter: (a, b) => a.utilisationBois.oeuvre - b.utilisationBois.oeuvre
                            }
                        ],
                        key: 'utilisationBois'
                    },
                    {
                        title: "modifier",
                        key: "edit",
                        render: (index, record, ind) => (
                            this.state.edit === ind ?
                                <div>
                                    <Button icon="close"
                                            onClick={() => {
                                                this.setState({edit: null, editId: null});
                                            }}
                                    /> <Button icon="save"
                                               onClick={() => {
                                                   this.setState({edit: ind});
                                                   const editedDataNumbers = this.state.editedData;
                                                   this.state.editedData['coord'] = {
                                                       x: Number(this.state.editedData.coord.x),
                                                       y: Number(this.state.editedData.coord.y)
                                                   };

                                                   this.state.editedData['utilisationBois'] = {
                                                       chauffage: Number(this.state.editedData.utilisationBois.chauffage),
                                                       industrie: Number(this.state.editedData.utilisationBois.industrie),
                                                       oeuvre: Number(this.state.editedData.utilisationBois.oeuvre)
                                                   };

                                                   console.log(this.state.editedData);
                                                   delete this.state.editedData.volumePrix;
                                                   this.props.editTree(this.props.selectedParcel, record.id, this.state.editedData)
                                               }
                                               }
                                /></div>
                                :
                                <div>
                                    <Button icon="edit"
                                            onClick={() => {
                                                this.setState({edit: ind, editId: record.id, success: null});

                                                this.setState({editedData: {...record}});
                                            }}
                                    >{this.props.editingTreeSuccess && this.state.success === ind ?
                                        <Icon type="check" style={{color: "green"}}/> : ""}</Button>
                                </div>)
                    },
                    {
                        title: "supprimer",
                        key: "delete",
                        render: (index, record, ind) => (
                            <Popconfirm placement="topLeft" title="Etes-vous sur?" onConfirm={() => {
                                this.props.deleteTree(this.props.selectedParcel, record.id)
                            }} okText="oui" cancelText="non">
                                <Button icon="delete" type="danger"/>
                            </Popconfirm>)
                    },
                ] : []
        )

    }


    render() {
        const {selectedTree} = this.props;

        return (
            <div>
                <div>
                    <Table
                        rowKey={record => record.id}
                        locale={{
                            emptyText: 'Aucun arbre',
                            filterTitle: 'Filtre',
                            filterConfirm: 'Ok',
                            filterReset: 'Reset',
                        }}
                        dataSource={this.props.treesWithVolume}
                        columns={this.getColumns()}
                        onRowClick={(record) => {
                            this.props.selectTree(record.id);
                        }}
                        expandedRowRender={record => <TreeView
                            edited={this.state.editId === record.id}
                            valueX={this.state.editId === record.id ? this.state.editedData.coord.x : record.coord.x}
                            onChangeX={ (value) => {
                                this.setState({editedData: {...this.state.editedData, coord: {x:value,y:this.state.editedData.coord.y}}})
                            }}
                            valueY={this.state.editId === record.id ? this.state.editedData.coord.y : record.coord.y}

                            onChangeY={ (value) => {
                                this.setState({editedData: {...this.state.editedData, coord: {x:this.state.editedData.coord.x, y:value}}})
                            }}/>}
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
