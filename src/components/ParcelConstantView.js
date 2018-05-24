/**
 * Created by cimin on 21/05/2018.
 */
// @flow
import React from "react";
import {Card, Row, Button, Col, Switch, Slider, InputNumber, Table} from "antd";


class ParcelConstantView extends React.Component {
    componentWillReceiveProps(next) {
        this.setState({
            enabled: false,
            newExploitation: 0,
            newExploitationEssence: "",
            tarifs: next.selectedParcel != null ?
                (next.selectedParcel.toJS().constantes != undefined ?
                    next.selectedParcel.toJS().constantes.tarifs : null)
                : null,
            prelevement: next.selectedParcel != null ?
                (next.selectedParcel.toJS().constantes != undefined ?
                    next.selectedParcel.toJS().constantes.prelevement : null)
                : null,
            rotation: next.selectedParcel != null ?
                (next.selectedParcel.toJS().constantes != undefined ?
                    next.selectedParcel.toJS().constantes.rotation : null)
                : null,
            exploitation: next.selectedParcel != null ?
                (next.selectedParcel.toJS().constantes != undefined ?
                    next.selectedParcel.toJS().constantes.exploitation : null)
                : null,
        })
    }

    constructor(props) {
        super(props);
        let defaultState = {
            enabled: false,
            newExploitation: 0,
            newExploitationEssence: "",
            tarifs: this.props.selectedParcel != null ?
                (this.props.selectedParcel.toJS().constantes != undefined ?
                    this.props.selectedParcel.toJS().constantes.tarifs : null)
                : null,
            prelevement: this.props.selectedParcel != null ?
                (this.props.selectedParcel.toJS().constantes != undefined ?
                    this.props.selectedParcel.toJS().constantes.prelevement : null)
                : null,
            rotation: this.props.selectedParcel != null ?
                (this.props.selectedParcel.toJS().constantes != undefined ?
                    this.props.selectedParcel.toJS().constantes.rotation : null)
                : null,
            exploitation: this.props.selectedParcel != null ?
                (this.props.selectedParcel.toJS().constantes != undefined ?
                    this.props.selectedParcel.toJS().constantes.exploitation : null)
                : null,
        };
        this.state = defaultState;
    }

    render() {
        const {selectedParcel} = this.props;

        let tarifsProp = this.props.selectedParcel != null ?
            (this.props.selectedParcel.toJS().constantes != undefined ?
                this.props.selectedParcel.toJS().constantes.tarifs : null)
            : null;

        let prelevementProp = this.props.selectedParcel != null ?
            (this.props.selectedParcel.toJS().constantes != undefined ?
                this.props.selectedParcel.toJS().constantes.prelevement : null)
            : null;

        let rotationProp = this.props.selectedParcel != null ?
            (this.props.selectedParcel.toJS().constantes != undefined ?
                this.props.selectedParcel.toJS().constantes.rotation : null)
            : null;

        let isEditable = selectedParcel && prelevementProp != null && rotationProp != null && tarifsProp != null;

        return (
            <Card>
                {isEditable ?
                    <div>
                        <Row>
                            Modifier: <Switch size="large" checked={this.state.enabled}
                                              onChange={(enabled) => this.setState({enabled})}/>
                        </Row>
                        <br/>
                        <br/>
                        <Row>
                            <Col span={4}>
                                Bornes du prélevement :
                                <InputNumber
                                    min={0}
                                    max={100}
                                    style={{marginLeft: 16}}
                                    value={this.state.prelevement.min}
                                    onChange={
                                        (value) => {
                                            value <= this.state.prelevement.max ? this.setState({
                                                    prelevement: {
                                                        ...this.state.prelevement,
                                                        min: value
                                                    }
                                                }) : ''
                                        }
                                    }
                                />
                            </Col>
                            <Col span={12}>
                                <Slider range defaultValue={[this.state.prelevement.min, this.state.prelevement.max]}
                                        value={[this.state.prelevement.min, this.state.prelevement.max]}
                                        onChange={
                                            (values) => {
                                                this.setState({prelevement: {min: values[0], max: values[1]}})
                                            }
                                        }
                                        tipFormatter={(value) => {
                                            return `${value}%`;
                                        }}
                                        disabled={!this.state.enabled}/>
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={0}
                                    max={100}
                                    style={{marginLeft: 16}}
                                    value={this.state.prelevement.max}
                                    onChange={(value) => {
                                        value >= this.state.prelevement.min ? this.setState({
                                                prelevement: {
                                                    ...this.state.prelevement,
                                                    max: value
                                                }
                                            }) : ''
                                    }
                                    }
                                />
                            </Col>
                            <Col span={4}>
                                <Button
                                    disabled={this.state.prelevement.min === undefined ||
                                    this.state.prelevement.max === undefined ||
                                    this.state.prelevement.min > this.state.prelevement.max ||
                                    this.state.prelevement.max < this.state.prelevement.min || !this.state.enabled}
                                    icon="save"
                                    onClick={() => {
                                        this.props.saveBornesConst(this.props.selectedParcelID, 'prelevement', this.state.prelevement)
                                    }}
                                    type="primary"/>
                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <Row>
                            <Col span={4}>
                                Bornes de la rotation :
                                <InputNumber
                                    min={0}
                                    max={100}
                                    style={{marginLeft: 16}}
                                    value={this.state.rotation.min}
                                    onChange={
                                        (value) => {
                                            value <= this.state.rotation.max ? this.setState({
                                                    rotation: {
                                                        ...this.state.rotation,
                                                        min: value
                                                    }
                                                }) : ''
                                        }
                                    }
                                />
                            </Col>
                            <Col span={12}>
                                <Slider range defaultValue={[this.state.rotation.min, this.state.rotation.max]}
                                        value={[this.state.rotation.min, this.state.rotation.max]}
                                        onChange={
                                            (values) => {
                                                this.setState({rotation: {min: values[0], max: values[1]}})
                                            }
                                        }
                                        tipFormatter={(value) => {
                                            return `${value}ans`;
                                        }}
                                        disabled={!this.state.enabled}/>
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={0}
                                    max={100}
                                    style={{marginLeft: 16}}
                                    value={this.state.rotation.max}
                                    onChange={(value) => {
                                        value >= this.state.rotation.min ? this.setState({
                                                rotation: {
                                                    ...this.state.rotation,
                                                    max: value
                                                }
                                            }) : ''
                                    }
                                    }
                                />
                            </Col>
                            <Col span={4}>
                                <Button
                                    disabled={this.state.rotation.min === undefined ||
                                    this.state.rotation.max === undefined ||
                                    this.state.rotation.min > this.state.rotation.max ||
                                    this.state.rotation.max < this.state.rotation.min || !this.state.enabled}
                                    icon="save"
                                    onClick={() => {
                                        this.props.saveBornesConst(this.props.selectedParcelID, 'rotation', this.state.rotation)
                                    }}
                                    type="primary"/>
                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <hr/>
                        <br/>
                        <br/>
                        <Row>
                            <Table
                                locale={{emptyText: 'Aucunes constantes'}}
                                dataSource={this.state.exploitation != null && this.state.exploitation != undefined ? Object.keys(this.state.exploitation).map(c => ({
                                        key: c,
                                        value: this.state.exploitation[c]
                                    })) : null}
                                onRowClick={(record) => {
                                }}
                                columns={[
                                    {
                                        title: "Essence",
                                        dataIndex: "key",
                                        key: "key"
                                    },
                                    {
                                        title: "diametre (cm)",
                                        key: "value",
                                        render: (a, record, i) => {
                                            return <InputNumber value={record.value} onChange={(value) => {
                                                this.setState({
                                                    exploitation: {
                                                        ...this.state.exploitation,
                                                        [record.key]: value
                                                    }
                                                })
                                            }}/>
                                        }
                                    }, {
                                        title: "Sauvegarder",
                                        key: "save",
                                        render: (a, record, i) => {
                                            return <Button
                                                disabled={!this.state.enabled || this.state.exploitation[record.key] === undefined || isNaN(Number(this.state.exploitation[record.key])) }
                                                icon="save"
                                                onClick={() => {
                                                    this.props.saveBornesConst(this.props.selectedParcelID, 'exploitation', this.state.exploitation);
                                                }}
                                                type="primary"/>
                                        }
                                    }
                                ]}
                                bordered
                                title={() => "Diametre minimum d'exploitation"}
                            />
                        </Row>
                        <br/>
                        <Row>
                            <Col span={6}>
                                <p>Ajouter : </p>
                            </Col>
                            <Col span={6}>
                                Essence : <select
                                onChange={(e) => {
                                    this.setState({newExploitationEssence: e.target.value})
                                }}>
                                {[<option key=""
                                          value=""/>].concat(this.state.exploitation == null ||
                                this.state.exploitation == undefined ? this.props.essences.map(e =>
                                        <option key={e} value={e}>{e}</option>)
                                    : this.props.essences.filter(e => !Object.keys(this.state.exploitation).map(
                                        c => ({
                                            key: c,
                                            value: this.state.exploitation[c]
                                        })).find(d => d.key === e)).map(e =>
                                        <option key={e} value={e}>{e}</option>))}
                            </select>
                            </Col>
                            <Col span={6}>
                                <InputNumber
                                    value={this.state.newExploitation}
                                    onChange={(value) => {
                                        this.setState({newExploitation: value})
                                    }}
                                /></Col>
                            <Col span={6}>
                                <Button icon="plus" type="primary"
                                        disabled={this.state.newExploitationEssence === "" || isNaN(Number(this.state.newExploitation)) }
                                        onClick={() => {
                                            this.props.saveBornesConst(this.props.selectedParcelID, `exploitation/${this.state.newExploitationEssence}`, this.state.newExploitation);
                                        }}
                                /></Col>
                        </Row>
                        <br/>
                        <br/>
                        <hr/>
                        <br/>
                        <br/>
                        <Row>
                            <Col span={6}>
                                <p>Tarifs feuillus : </p>
                            </Col>
                            <Col span={6}>
                                <select
                                    value={Object.keys(this.state.tarifs.feuillus)[0]}
                                    onChange={(e) => {
                                        const newFeuillu = {};
                                        newFeuillu[e.target.value] = this.state.tarifs.feuillus[Object.keys(this.state.tarifs.feuillus)[0]];
                                        this.setState({tarifs: {...this.state.tarifs, feuillus: newFeuillu}})
                                    }}>
                                    {[<option key=""
                                              value=""/>].concat(Object.keys(this.props.tarifs.toJS()).map(e =>
                                        <option key={e} value={e}>{e}</option>))}
                                </select>
                            </Col>
                            <Col span={6}>
                                version : <InputNumber
                                value={this.state.tarifs.feuillus[Object.keys(this.state.tarifs.feuillus)[0]]}
                                onChange={(value) => {
                                    value < 1 ? value = 1 : '';
                                    value > 20 ? value = 20 : '';
                                    const newFeuillu = {};
                                    newFeuillu[Object.keys(this.state.tarifs.feuillus)[0]] = value;
                                    this.setState({tarifs: {...this.state.tarifs, feuillus: newFeuillu}});
                                }}
                            />
                            </Col>

                        </Row>
                        <Row>
                            <Col span={6}>
                                <p>Tarifs Résineux : </p>
                            </Col>
                            <Col span={6}>
                                <select
                                    value={Object.keys(this.state.tarifs.resineux)[0]}
                                    onChange={(e) => {
                                        const newResineux = {};
                                        newResineux[e.target.value] = this.state.tarifs.resineux[Object.keys(this.state.tarifs.resineux)[0]];
                                        this.setState({tarifs: {...this.state.tarifs, resineux: newResineux}})
                                    }}>
                                    {[<option key=""
                                              value=""/>].concat(Object.keys(this.props.tarifs.toJS()).map(e =>
                                        <option key={e} value={e}>{e}</option>))}
                                </select>
                            </Col>
                            <Col span={6}>
                                version : <InputNumber
                                value={this.state.tarifs.resineux[Object.keys(this.state.tarifs.resineux)[0]]}
                                onChange={(value) => {
                                    value < 1 ? value = 1 : '';
                                    value > 20 ? value = 20 : '';
                                    const newResineux = {};
                                    newResineux[Object.keys(this.state.tarifs.resineux)[0]] = value;
                                    this.setState({tarifs: {...this.state.tarifs, resineux: newResineux}});
                                }}
                            />
                            </Col>
                            <Col span={6}>
                                <Button icon="save" type="primary"
                                        disabled={!this.state.enabled || Object.keys(this.state.tarifs.resineux)[0] === "" ||
                                        isNaN(Number(this.state.tarifs.resineux[Object.keys(this.state.tarifs.resineux)[0]])) ||
                                        Object.keys(this.state.tarifs.feuillus)[0] === "" ||
                                        isNaN(Number(this.state.tarifs.feuillus[Object.keys(this.state.tarifs.feuillus)[0]])) }
                                        onClick={() => {
                                            this.props.saveBornesConst(this.props.selectedParcelID, `tarifs`, this.state.tarifs);
                                        }}
                                /></Col>
                        </Row>
                    </div> : "Merci de selectionner une parcelle"}
            </Card>
        );
    }
}

ParcelConstantView.propTypes = {};

export default ParcelConstantView;
