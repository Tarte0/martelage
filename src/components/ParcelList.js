// @flow
import React from "react";
import {Icon, Table, Button, Popconfirm, Input} from "antd";
import "../style/csvRows.css";

const data = {
    nom: '',
    lieu: "",
    surface: 0.0,
    altitude: 0.0,
    habitat: ""
};

const EditableCell = (editable, value, onChange, isNumerical, isFloat) => (
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
const numericalKeys = ['altitude'];
const floatNumericalKeys = ['surface'];

const titles = {nom: 'Nom', lieu: 'Lieu', surface: 'Surface (ha)', altitude: 'Altitude (m)', habitat: 'Habitat'};

class ParcelList extends React.Component {
    componentWillReceiveProps(next) {
        if (next.editingParcelSuccess && !this.props.editingParcelSuccess) {
            this.setState({success: this.state.edit, edit: null})
        }
    }

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


    render() {
        return (
            <div>
                <Table
                    rowKey={record => record.id}
                    locale={{emptyText: 'Aucune parcelle'}}
                    loading={this.props.savingParcel}
                    dataSource={this.props.parcels}
                    onRowClick={(record) => {
                        this.props.selectParcel(record.id);
                    }}
                    rowClassName={(record, index) => this.props.selectedParcel === record.id ? 'selectedRow' : ''}

                    columns={
                        Object.keys(data)
                            .map(k => ({
                                title: titles[k],
                                render: (a, record, index) =>
                                    EditableCell(
                                        this.state.edit === index,
                                        this.state.edit === index ? this.state.editedData[k] : record[k],
                                        (value) => {
                                            this.setState({editedData: {...this.state.editedData, [k]: value}})
                                        }, numericalKeys.indexOf(k) > -1, floatNumericalKeys.indexOf(k) > -1),
                                key: k,
                                sorter: (a, b) =>
                                    numericalKeys.indexOf(k) > -1 || floatNumericalKeys.indexOf(k) > -1 ?
                                    a[k] - b[k] : a[k].localeCompare(b[k])
                            })).concat([
                            {
                                title: "Arbres",
                                key: 'trees',
                                render: (a, r, i) => {
                                    return (<div>{Object.keys(r.arbres || []).length}</div>)
                                },
                                sorter: (a, b) => Object.keys(a.arbres || []).length - Object.keys(b.arbres || []).length
                            },
                            {
                                title: "Supprimer",
                                key: "delete",
                                render: (index, record, ind) => (
                                    <Popconfirm placement="topLeft" title="Etes-vous sur?" onConfirm={() => {
                                        this.props.deleteParcel(record.id)
                                    }} okText="oui" cancelText="non">
                                        <Button disabled={record.arbres !== undefined} icon="delete" type="danger"/>
                                    </Popconfirm>)
                            },
                            {
                                title: "Modifier",
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
                                                           this.state.editedData.surface = Number(this.state.editedData.surface);
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
                                title: "Archiver",
                                key: "file",
                                render: (index, record, ind) => (
                                    <Popconfirm placement="topLeft" title="Etes-vous sur?" onConfirm={() => {
                                        this.props.fileParcel(record.id)
                                    }} okText="oui" cancelText="non">
                                        <Button icon="clock-circle-o"/>
                                    </Popconfirm>)
                            }
                        ])
                    }
                />
            </div>
        );
    }
}

ParcelList.propTypes = {};

export default ParcelList;
