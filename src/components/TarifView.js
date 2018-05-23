/**
 * Created by cimin on 23/05/2018.
 */
import React from "react";
import {Card, Table, Popconfirm, Button} from "antd";

const titles= {'diametre': 'Diamètre (cm)'};

class TarifView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card>
                <Table
                    title={()=>"Algan"}
                    rowKey={record => record.diametre}
                    locale={{emptyText: 'Aucuns tarifs'}}
                    dataSource={this.props.tarifs.algan}
                    onRowClick={(record) => {
                    }}
                    columns={[
                        Object.keys(this.props.tarifs.algan)
                            .map(k => ({
                                title: titles[k] != undefined ? titles[k] : k,
                                key: k
                            }))
                    ]}
                />
            </Card>
        );
    }
}

TarifView.propTypes = {};

export default TarifView;
