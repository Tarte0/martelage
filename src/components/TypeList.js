// @flow
import React from "react";
import {Card, Table, Popconfirm, Button} from "antd";


class TypeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card>
                <Table
                    locale={{emptyText: 'Aucuns type'}}
                    dataSource={this.props.types}
                    onRowClick={(record) => {
                    }}
                    columns={[
                        {
                            title: "type",
                            dataIndex: "type",
                            key: "type"
                        },
                        {
                            title: "supprimer",
                            key: "delete",
                            render: (index, record, ind) => (
                                <Popconfirm placement="topLeft" title="Etes-vous sur?" onConfirm={() => {
                                    this.props.deleteType(record.type)
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

TypeList.propTypes = {};

export default TypeList;
