// @flow
import React from "react";
import {Card, Table, Input, Row, Button, Col} from "antd";


class ConstantView extends React.Component {
    componentWillReceiveProps(next) {
        if (next.savedConstant && !this.state.edited) {
            this.setState({
                edited: false,
                height: {},
                prelevement : {},
                chauffage: {},
                oeuvre: {},
                industrie: {},
                volume: {},
                newPrixOeuvreEssence: "",
                newPrixChauffageEssence: "",
                newPrixIndustrieEssence: ""
            })
        }
    }

    constructor(props) {
        super(props);
        let defaultState = {
            edited: false,
            height: {},
            prelevement : {},
            chauffage: {},
            oeuvre: {},
            industrie: {},
            volume: {},
            newPrixOeuvreEssence: "",
            newPrixChauffageEssence: "",
            newPrixIndustrieEssence: ""
        };
        this.state = defaultState
    }

    render() {
        return (
            <Card>
                <Row>
                    <Table
                        locale={{emptyText: 'Aucunes constantes'}}
                        dataSource={this.props.hauteurMoyenneConst}
                        onRowClick={(record) => {
                        }}
                        columns={[
                            {
                                title: "hauteur moyenne",
                                dataIndex: "key",
                                key: "key"
                            },
                            {
                                title: "diametre (cm)",
                                key: "value",
                                render: (a, record, i) => {
                                    return <Input defaultValue={record.value} type="number" onChange={(e) => {
                                        this.setState({height: {...this.state.height, [record.key]: e.target.value}})
                                    }}/>
                                }
                            }, {
                                title: "Save",
                                key: "save",
                                render: (a, record, i) => {
                                    return <Button
                                        disabled={this.state.height[record.key] === undefined && isNaN(Number(this.state.height[record.key])) }
                                        icon="save"
                                        onClick={() => {
                                            this.props.saveHauteurMoyenneConst(record.key, Number(this.state.height[record.key]))
                                        }}
                                        type="primary"/>
                                }
                            }
                        ]}
                        bordered
                        title={() => 'Hauteurs Moyennes'}
                    />
                </Row>
                <br/>
                <hr/>
                <br/>
                <Row>
                    <Table
                        locale={{emptyText: 'Aucunes constantes'}}
                        dataSource={this.props.volumeCommercialConst}
                        onRowClick={(record) => {
                        }}
                        columns={[
                            {
                                title: "type",
                                dataIndex: "key",
                                key: "key"
                            },
                            {
                                title: "volume commercial (m³)",
                                render: (a, record, i) => {
                                    return <Input defaultValue={record.value} type="number" onChange={(e) => {
                                        this.setState({volume: {...this.state.volume, [record.key]: e.target.value}})
                                    }}/>
                                },
                                key: "value"
                            }, {
                                title: "Sauvegarder",
                                key: "save",
                                render: (a, record, i) => {
                                    return <Button
                                        disabled={this.state.volume[record.key] === undefined && isNaN(Number(this.state.volume[record.key])) }
                                        icon="save"
                                        onClick={() => {
                                            this.props.saveVolumeConst(record.key, Number(this.state.volume[record.key]))
                                        }}
                                        type="primary"/>
                                }
                            }
                        ]}
                        bordered
                        title={() => 'Volumes Commerciaux'}
                    />
                </Row>
                <br/>
                <hr/>
                <br/>
                <Row>
                    <Table
                        locale={{emptyText: 'Aucunes constantes'}}
                        dataSource={this.props.prixConst.chauffage}
                        onRowClick={(record) => {
                        }}
                        columns={[
                            {
                                title: "type / essence",
                                dataIndex: "key",
                                key: "chauffage.key"
                            },
                            {
                                title: "prix (€)",
                                render: (a, record, i) => {
                                    return <Input defaultValue={record.value} type="number" addonAfter="€"
                                                  onChange={(e) => {
                                                      this.setState({
                                                          chauffage: {
                                                              ...this.state.chauffage,
                                                              [record.key]: e.target.value
                                                          }
                                                      })
                                                  }}/>
                                },
                                key: "chauffage.value"
                            }, {
                                title: "Sauvegarder",
                                key: "save",
                                render: (a, record, i) => {
                                    return <Button
                                        disabled={this.state.chauffage[record.key] === undefined && isNaN(Number(this.state.chauffage[record.key])) }
                                        icon="save"
                                        onClick={() => {
                                            this.props.savePrixBoisConst("chauffage", record.key, Number(this.state.chauffage[record.key]))
                                        }}
                                        type="primary"/>
                                }
                            }
                        ]}
                        bordered
                        title={() => 'Prix bois de chauffage'}
                    />
                    <Row>
                        <Col span={6}>
                            <p>Ajouter : </p>
                        </Col>
                        <Col span={6}>
                            Essence : <select
                            onChange={(e) => {
                                this.setState({newPrixChauffageEssence: e.target.value})
                            }}>
                            {[<option key=""
                                      value=""/>].concat(this.props.essences.filter(e => !this.props.prixConst.chauffage.find(d => d.key === e)).map(e =>
                                <option key={e} value={e}>{e}</option>))}
                        </select>
                        </Col>
                        <Col span={6}>
                            <input type="number"
                                   onChange={({target:{value}}) => {
                                       this.setState({newPrixChauffage: value})
                                   }}
                            /></Col>
                        <Col span={6}>
                            <Button icon="plus" type="primary"
                                    disabled={this.state.newPrixChauffageEssence === "" || isNaN(Number(this.state.newPrixChauffage)) }
                                    onClick={() => {
                                        this.props.saveNewPrix("chauffage", this.state.newPrixChauffageEssence, this.state.newPrixChauffage)
                                    }}
                            /></Col>
                    </Row>
                </Row>
                <br/>
                <hr/>
                <br/>
                <Row>
                    <Table
                        locale={{emptyText: 'Aucunes constantes'}}
                        dataSource={this.props.prixConst.industrie}
                        onRowClick={(record) => {
                        }}
                        columns={[
                            {
                                title: "type / essence",
                                dataIndex: "key",
                                key: "industrie.key"
                            },
                            {
                                title: "prix (€)",
                                render: (a, record, i) => {
                                    return <Input defaultValue={record.value} type="number" addonAfter="€"
                                                  onChange={(e) => {
                                                      this.setState({
                                                          industrie: {
                                                              ...this.state.industrie,
                                                              [record.key]: e.target.value
                                                          }
                                                      })
                                                  }}/>
                                },
                                key: "industrie.value"
                            }, {
                                title: "Sauvegarder",
                                key: "save",
                                render: (a, record, i) => {
                                    return <Button
                                        disabled={this.state.industrie[record.key] === undefined && isNaN(Number(this.state.industrie[record.key])) }
                                        icon="save"
                                        onClick={() => {
                                            this.props.savePrixBoisConst("industrie", record.key, Number(this.state.industrie[record.key]))
                                        }}
                                        type="primary"/>
                                }
                            }
                        ]}
                        bordered
                        title={() => 'Prix bois d\'industrie'}
                    />
                </Row>
                <Row>
                    <Col span={6}>
                        <p>Ajouter : </p>
                    </Col>
                    <Col span={6}>
                        Essence : <select
                        onChange={(e) => {
                            this.setState({newPrixIndustrieEssence: e.target.value})
                        }}>
                        {[<option key=""
                                  value=""/>].concat(this.props.essences.filter(e => !this.props.prixConst.industrie.find(d => d.key === e)).map(e =>
                            <option key={e} value={e}>{e}</option>))}
                    </select>
                    </Col>
                    <Col span={6}>
                        <input type="number"
                               onChange={({target:{value}}) => {
                                   this.setState({newPrixIndustrie: value})
                               }}
                        /></Col>
                    <Col span={6}>
                        <Button icon="plus" type="primary"
                                disabled={this.state.newPrixIndustrieEssence === "" || isNaN(Number(this.state.newPrixIndustrie)) }
                                onClick={() => {
                                    this.props.saveNewPrix("industrie", this.state.newPrixIndustrieEssence, this.state.newPrixIndustrie)
                                }}
                        /></Col>
                </Row>
                <br/>
                <hr/>
                <br/>
                <Row>
                    <Table
                        locale={{emptyText: 'Aucunes constantes'}}
                        dataSource={this.props.prixConst.oeuvre}
                        onRowClick={(record) => {
                        }}
                        columns={[
                            {
                                title: "type / essence",
                                dataIndex: "key",
                                key: "oeuvre.key"
                            },
                            {
                                title: "prix (€)",
                                render: (a, record, i) => {
                                    return <Input defaultValue={record.value} type="number" addonAfter="€"
                                                  onChange={(e) => {
                                                      this.setState({
                                                          oeuvre: {
                                                              ...this.state.oeuvre,
                                                              [record.key]: e.target.value
                                                          }
                                                      })
                                                  }}/>
                                },
                                key: "oeuvre.value"
                            }, {
                                title: "Sauvegarder",
                                key: "save",
                                render: (a, record, i) => {
                                    return <Button
                                        disabled={this.state.oeuvre[record.key] === undefined && isNaN(Number(this.state.oeuvre[record.key])) }
                                        icon="save"
                                        onClick={() => {
                                            this.props.savePrixBoisConst("oeuvre", record.key, Number(this.state.oeuvre[record.key]))
                                        }}
                                        type="primary"/>
                                }
                            }
                        ]}
                        bordered
                        title={() => 'Prix bois d\'oeuvre'}
                    />
                    <Row>
                        <Col span={6}>
                            <p>Ajouter : </p>
                        </Col>
                        <Col span={6}>
                            Essence : <select
                            onChange={(e) => {
                                this.setState({newPrixOeuvreEssence: e.target.value})
                            }}>
                            {[<option key=""
                                      value=""/>].concat(this.props.essences.filter(e => !this.props.prixConst.oeuvre.find(d => d.key === e)).map(e =>
                                <option key={e} value={e}>{e}</option>))}
                        </select>
                        </Col>
                        <Col span={6}>
                            <input type="number"
                                   onChange={({target:{value}}) => {
                                       this.setState({newPrixOeuvre: value})
                                   }}
                            /></Col>
                        <Col span={6}>
                            <Button icon="plus" type="primary"
                                    disabled={this.state.newPrixOeuvreEssence === "" || isNaN(Number(this.state.newPrixOeuvre)) }
                                    onClick={() => {
                                        this.props.saveNewPrix("oeuvre", this.state.newPrixOeuvreEssence, this.state.newPrixOeuvre)
                                    }}
                            /></Col>
                    </Row>
                </Row>
                <br/>

            </Card>
        );
    }
}

ConstantView.propTypes = {};

export default ConstantView;

/*

 <hr/>
 <Row>
 <Table
 locale={{emptyText: 'Aucunes constantes'}}
 dataSource={this.props.prelevementConst}
 onRowClick={(record) => {
 }}
 columns={[
 {
 title: "bornes",
 dataIndex: "key",
 key: "key"
 },
 {
 title: "volume à prelever (m3)",
 key: "value",
 render: (a, record, i) => {
 return <Input defaultValue={record.value} type="number" onChange={(e) => {
 this.setState({prelevement: {...this.state.prelevement, [record.key]: e.target.value}})
 }}/>
 }
 },
 {
 title: "Sauvegarder",
 key: "save",
 render: (a, record, i) => {
 return <Button
 disabled={this.state.prelevement[record.key] === undefined && isNaN(Number(this.state.prelevement[record.key])) }
 icon="save"
 onClick={() => {
 this.props.saveBornesConst(record.key, Number(this.state.prelevement[record.key]))
 }}
 type="primary"/>
 }
 }
 ]}
 bordered
 title={() => 'Bornes du prelevement'}
 />
 </Row>

 */