// @flow
import React from "react";
import {Card, Table, Popconfirm, Button} from "antd";


class EtatsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.etats)
    }

    render() {
        return (
            <Card>
                <Table
                    locale={{emptyText: 'Aucuns état'}}
                    dataSource={this.props.etats}
                    onRowClick={(record) => {
                    }}
                    columns={[
                        {
                            title: "etat",
                            dataIndex: "etat",
                            key: "etat"
                        }
                    ]}
                />
            </Card>
        );
    }
}

EtatsList.propTypes = {};

export default EtatsList;
