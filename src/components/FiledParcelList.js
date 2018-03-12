// @flow
import React from "react";
import {Icon, Table, Button, Popconfirm} from "antd";


class FiledParcelList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Table
                    locale={{emptyText: 'Aucune parcelle archivée'}}
                    dataSource={this.props.filedParcel}
                    onRowClick={(record) => {}}
                    size='small'
                    columns={
                        [
                            {
                                title: "version",
                                key: 'version',
                                dataIndex: 'version',
                                sorter: (a, b) => a.version - b.version
                            },
                            {
                                title: "date",
                                key: 'date',
                                dataIndex: 'date',
                                render: (value, row, index) => {
                                    const date = new Date(value);

                                    let min = date.getMinutes();
                                    min < 10 ? (min == 0 ? min = '00' : min = `0${min}`) : min;

                                    let h = date.getHours();
                                    h < 10 ? (h == 0 ? h = '00' : h = `0${h}`) : h;

                                    let mois = date.getMonth() + 1;
                                    mois < 10 ? mois = `0${mois}` : mois;

                                    let jours = date.getDate();
                                    jours < 10 ? jours = `0${jours}` : jours;

                                    const dateFr = `${jours}/${mois}/${date.getFullYear()} (${h}h${min})`;

                                    return (<p>{dateFr}</p>);
                                },
                                sorter: (a, b) => a.date - b.date
                            },
                            {
                                title: "arbres",
                                key: 'trees',
                                render: (a, r, i) => {
                                    return (<div>{Object.keys(r.arbres || []).length}</div>)
                                }
                            },
                            {
                                title: "surface",
                                key: 'surface',
                                dataIndex: 'surface',
                                sorter: (a, b) => a.surface - b.surface
                            },

                        ]
                    }
                />
            </div>
        );
    }
}

FiledParcelList.propTypes = {};

export default FiledParcelList;
