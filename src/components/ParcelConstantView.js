/**
 * Created by cimin on 21/05/2018.
 */
// @flow
import React from "react";
import {Card, Row, Button, Col, Switch, Slider, InputNumber} from "antd";


class ParcelConstantView extends React.Component {
    componentWillReceiveProps(next) {
        this.setState({
            enabled: false,
            prelevement: next.selectedParcel != null ?
                (next.selectedParcel.toJS().constantes != undefined ?
                    next.selectedParcel.toJS().constantes.prelevement: null)
                : null,
            rotation: next.selectedParcel != null ?
                (next.selectedParcel.toJS().constantes != undefined ?
                    next.selectedParcel.toJS().constantes.rotation: null)
                : null,
        })
    }

    constructor(props) {
        super(props);
        let defaultState = {
            enabled: false,
            prelevement: this.props.selectedParcel != null ?
                (this.props.selectedParcel.toJS().constantes != undefined ?
                    this.props.selectedParcel.toJS().constantes.prelevement: null)
                : null,
            rotation: this.props.selectedParcel != null ?
                (this.props.selectedParcel.toJS().constantes != undefined ?
                    this.props.selectedParcel.toJS().constantes.rotation: null)
                : null,
        };
        this.state = defaultState;
        console.log(this.state);
    }

    render() {
        const {selectedParcel} = this.props;

        let prelevementProp = this.props.selectedParcel != null ?
            (this.props.selectedParcel.toJS().constantes != undefined ?
                this.props.selectedParcel.toJS().constantes.prelevement: null)
            : null;

        let rotationProp = this.props.selectedParcel != null ?
            (this.props.selectedParcel.toJS().constantes != undefined ?
                this.props.selectedParcel.toJS().constantes.rotation: null)
            : null;

        let isEditable = selectedParcel && prelevementProp!=null && rotationProp!=null;
        console.log(prelevementProp);
        console.log(rotationProp);
        console.log(this.state);
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
                                            return `${value}%`;
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
                    </div> : "Merci de selectionner une parcelle"}
            </Card>
        );
    }
}

ParcelConstantView.propTypes = {};

export default ParcelConstantView;
