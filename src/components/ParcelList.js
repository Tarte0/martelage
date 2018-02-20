// @flow
import React from 'react';
import {Card, Form, Icon, Table, Button, Popconfirm, message, Input} from 'antd';

const data = {
    nom: '',
    lieu: "",
    surface: 0.0
};

const EditableCell = (editable, value, onChange) => (
    <div>
        {editable
            ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => onChange(e.target.value)}/>
            : value
        }
    </div>
);

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
                    locale={{emptyText: 'Aucune parcelle'}}
                    loading={this.props.savingParcel}
                    dataSource={this.props.parcels}
                    columns={
                        Object.keys(data)
                            .map(k => ({
                                title: k,
                                render: (a, record, index) =>
                                    EditableCell(
                                        this.state.edit === index,
                                        this.state.edit === index ? this.state.editedData[k] : record[k],
                                        (value) => {
                                            this.setState({editedData: {...this.state.editedData, [k]: value}})
                                        }),
                                key: k
                            })).concat([
                            {
                                title: "arbres",
                                render: (a, r, i) => {
                                    return (<div>{Object.keys(r.arbres || []).length}</div>)
                                }

                            },
                            {
                                title: "selectionner",
                                key: "select",
                                render: (index, record, ind) => (
                                    <Button icon="pie-chart"
                                            onClick={() => {
                                                this.props.selectParcel(record.id);
                                            }}
                                    />)
                            },
                            {
                                title: "supprimer",
                                key: "delete",
                                render: (index, record, ind) => (
                                    <Popconfirm placement="topLeft" title="Etes-vous sur?" onConfirm={() => {
                                        this.props.deleteParcel(record.id)
                                    }} okText="oui" cancelText="non">
                                        <Button disabled={record.arbres !== undefined} icon="delete" type="danger"/>
                                    </Popconfirm>)
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
                            }
                        ])
                    }/>
            </div>
        );
    }
}

ParcelList.propTypes = {};

export default ParcelList;