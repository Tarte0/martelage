// @flow
import React from "react";
import {Card, Table, Popconfirm, Button} from "antd";


class EssenceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card>
                <Table
                    rowKey={record => record.essence}
                    locale={{emptyText: 'Aucunes éssences'}}
                    dataSource={this.props.essences}
                    onRowClick={(record) => {
                    }}
                    columns={[
                        {
                            title: "Essence",
                            dataIndex: "essence",
                            key: "essence"
                        },
                        {
                            title: "Type",
                            dataIndex: "type",
                            key: "type"
                        },
                        {
                            title: "Supprimer",
                            key: "delete",
                            render: (index, record, ind) => (
                                <Popconfirm placement="topLeft" title="Etes-vous sur?" onConfirm={() => {
                                    this.props.deleteEssence(record.essence)
                                }} okText="oui" cancelText="non">
                                    <Button icon="delete" type="danger"/>
                                </Popconfirm>)
                        }
                    ]}
                />
            </Card>
        );
    }
}

EssenceList.propTypes = {};

export default EssenceList;
