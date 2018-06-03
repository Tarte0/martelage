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
                    rowKey={record => record.type}
                    locale={{emptyText: 'Aucuns type'}}
                    dataSource={this.props.types}
                    onRowClick={(record) => {
                    }}
                    columns={[
                        {
                            title: "Type",
                            dataIndex: "type",
                            key: "type"
                        }
                    ]}
                />
            </Card>
        );
    }
}

TypeList.propTypes = {};

export default TypeList;
