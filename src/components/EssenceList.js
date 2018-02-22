// @flow
import React from "react";
import {Card, Table, Popconfirm, Button} from "antd";


class EssenceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.etats)
    }

    render() {
        return (
            <Card>
                <Table
                    locale={{emptyText: 'Aucunes éssences'}}
                    dataSource={this.props.essences}
                    onRowClick={(record) => {
                    }}
                    columns={[
                        {
                            title: "essence",
                            dataIndex: "essence",
                            key: "essence"
                        },
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
