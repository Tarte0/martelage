// @flow
import React from "react";
import {Form, Input, Button, Menu, Dropdown, Icon, Row, Col, Slider, InputNumber, Card} from "antd";

class ParcelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numero: "",
            diametre: "",
            essence: "",
            etat: "",
            noteEcologique: 0,
            coord: {
                x: 0.0,
                y: 0.0
            },
            utilisationBois: {
                chauffage: 33,
                industrie: 33,
                oeuvre: 33
            }
        };
    }

    render() {

        const parcelsDropDown = (
            <Menu>
                {this.props.parcels.map(p => (<Menu.Item key={p.id}>{p.nom}</Menu.Item>))}
            </Menu>
        );
        const etatsDropDown = (
            <Menu>
                {this.props.etats.map(p => (<Menu.Item key={p.etat}>{p.etat}</Menu.Item>))}
            </Menu>
        );
        const essencesDropDown = (
            <Menu>
                {this.props.essences.map(p => (<Menu.Item key={p.essence}>{p.essence}</Menu.Item>))}
            </Menu>
        );
        return (
            <Card>
                <Form>
                    <Form.Item label="Parcelle">
                        <Dropdown overlay={parcelsDropDown}>
                            <Button style={{marginLeft: 8}}>
                                parcelle <Icon type="down"/>
                            </Button>
                        </Dropdown>
                    </Form.Item>
                    <Form.Item label="Numero">
                        <Input value={this.state.numero} onChange={(e) => {
                            this.setState({numero: e.target.value})
                        }}/>
                    </Form.Item>
                    <Form.Item label="Diametre">
                        <InputNumber min={0} value={this.state.diametre} onChange={(e) => {
                            this.setState({diametre: e.target.value})
                        }}/>
                    </Form.Item>
                    <Form.Item label="Essence">
                        <Dropdown overlay={essencesDropDown}>
                            <Button style={{marginLeft: 8}}>
                                essence <Icon type="down"/>
                            </Button>
                        </Dropdown>
                    </Form.Item>
                    <Form.Item label="Etat">
                        <Dropdown overlay={etatsDropDown}>
                            <Button style={{marginLeft: 8}}>
                                etat <Icon type="down"/>
                            </Button>
                        </Dropdown>
                    </Form.Item>
                    <Form.Item label="Note ecologique">
                        <InputNumber min={0} value={this.state.noteEcologique} onChange={(e) => {
                            this.setState({noteEcologique: e.target.value})
                        }}/>
                    </Form.Item>
                    <Form.Item label="Coordonnees">
                        x: <InputNumber step="0.01" min={0} value={this.state.coord.x} onChange={(e) => {
                        this.setState({coord: e.target.value})
                    }}/>
                        y: <InputNumber step="0.01" min={0} value={this.state.coord.y} onChange={(e) => {
                        this.setState({coord: e.target.value})
                    }}/>
                    </Form.Item>
                    <Form.Item label="Utilisation du bois">
                        <Row>
                            <Col span={20}>
                                chauffage:
                                <Slider
                                    min={0}
                                    max={100}
                                    tipFormatter={() => `${this.state.utilisationBois.chauffage}%`}
                                    value={this.state.utilisationBois.chauffage}
                                    onChange={(value) => {
                                        const total = value + this.state.utilisationBois.industrie + this.state.utilisationBois.oeuvre;
                                        if (total > 100) {
                                            let removal = total - 100;
                                            if (this.state.utilisationBois.industrie > 0 && this.state.utilisationBois.oeuvre > 0) {
                                                removal = removal / 2;
                                            }
                                            this.setState({
                                                utilisationBois: {
                                                    chauffage: Math.floor(value),
                                                    industrie: Math.floor(Math.max(0, this.state.utilisationBois.industrie - removal)),
                                                    oeuvre: Math.floor(Math.max(0, this.state.utilisationBois.oeuvre - removal))
                                                }
                                            });
                                        } else {
                                            this.setState({
                                                utilisationBois: {
                                                    chauffage: Math.floor(value),
                                                    industrie: this.state.utilisationBois.industrie,
                                                    oeuvre: this.state.utilisationBois.oeuvre
                                                },
                                            });
                                        }

                                    }}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={0}
                                    max={100}
                                    style={{marginLeft: 16}}
                                    value={this.state.utilisationBois.chauffage}
                                    onChange={(value) => {
                                        const total = value + this.state.utilisationBois.industrie + this.state.utilisationBois.oeuvre;
                                        if (total > 100) {
                                            let removal = total - 100;
                                            if (this.state.utilisationBois.industrie > 0 && this.state.utilisationBois.oeuvre > 0) {
                                                removal = removal / 2;
                                            }
                                            this.setState({
                                                utilisationBois: {
                                                    chauffage: Math.floor(value),
                                                    industrie: Math.floor(Math.max(0, this.state.utilisationBois.industrie - removal)),
                                                    oeuvre: Math.floor(Math.max(0, this.state.utilisationBois.oeuvre - removal))
                                                }
                                            });
                                        } else {
                                            this.setState({
                                                utilisationBois: {
                                                    chauffage: Math.floor(value),
                                                    industrie: this.state.utilisationBois.industrie,
                                                    oeuvre: this.state.utilisationBois.oeuvre
                                                },
                                            });
                                        }

                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={20}>
                                industrie:
                                <Slider
                                    min={0}
                                    max={100}
                                    value={this.state.utilisationBois.industrie}
                                    onChange={(value) => {
                                        const total = this.state.utilisationBois.chauffage + value + this.state.utilisationBois.oeuvre;
                                        if (total > 100) {
                                            let removal = total - 100;
                                            if (this.state.utilisationBois.chauffage > 0 && this.state.utilisationBois.oeuvre > 0) {
                                                removal = removal / 2;
                                            }
                                            this.setState({
                                                utilisationBois: {
                                                    chauffage: Math.floor(Math.max(0, this.state.utilisationBois.chauffage - removal)),
                                                    industrie: Math.floor(value),
                                                    oeuvre: Math.floor(Math.max(0, this.state.utilisationBois.oeuvre - removal))
                                                }
                                            });
                                        } else {
                                            this.setState({
                                                utilisationBois: {
                                                    chauffage: this.state.utilisationBois.chauffage,
                                                    industrie: Math.floor(value),
                                                    oeuvre: this.state.utilisationBois.oeuvre
                                                },
                                            });
                                        }

                                    }}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={0}
                                    max={100}
                                    style={{marginLeft: 16}}
                                    value={this.state.utilisationBois.industrie}
                                    onChange={(value) => {
                                        const total = this.state.utilisationBois.chauffage + value + this.state.utilisationBois.oeuvre;
                                        if (total > 100) {
                                            let removal = total - 100;
                                            if (this.state.utilisationBois.chauffage > 0 && this.state.utilisationBois.oeuvre > 0) {
                                                removal = removal / 2;
                                            }
                                            this.setState({
                                                utilisationBois: {
                                                    chauffage: Math.floor(Math.max(0, this.state.utilisationBois.chauffage - removal)),
                                                    industrie: Math.floor(value),
                                                    oeuvre: Math.floor(Math.max(0, this.state.utilisationBois.oeuvre - removal))
                                                }
                                            });
                                        } else {
                                            this.setState({
                                                utilisationBois: {
                                                    chauffage: this.state.utilisationBois.chauffage,
                                                    industrie: Math.floor(value),
                                                    oeuvre: this.state.utilisationBois.oeuvre
                                                },
                                            });
                                        }

                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={20}>
                                oeuvre:
                                <Slider
                                    min={0}
                                    max={100}
                                    value={this.state.utilisationBois.oeuvre}
                                    onChange={(value) => {
                                        const total = this.state.utilisationBois.chauffage + this.state.utilisationBois.industrie + value;
                                        if (total > 100) {
                                            let removal = total - 100;
                                            if (this.state.utilisationBois.chauffage > 0 && this.state.utilisationBois.industrie > 0) {
                                                removal = removal / 2;
                                            }
                                            this.setState({
                                                utilisationBois: {
                                                    chauffage: Math.floor(Math.max(0, this.state.utilisationBois.chauffage - removal)),
                                                    industrie: Math.floor(Math.max(0, this.state.utilisationBois.industrie - removal)),
                                                    oeuvre: Math.floor(value)
                                                }
                                            });
                                        } else {
                                            this.setState({
                                                utilisationBois: {
                                                    chauffage: this.state.utilisationBois.chauffage,
                                                    industrie: this.state.utilisationBois.industrie,
                                                    oeuvre: Math.floor(value)
                                                },
                                            });
                                        }

                                    }}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={0}
                                    max={100}
                                    style={{marginLeft: 16}}
                                    value={this.state.utilisationBois.oeuvre}
                                    onChange={(value) => {
                                        const total = this.state.utilisationBois.chauffage + this.state.utilisationBois.industrie + value;
                                        if (total > 100) {
                                            let removal = total - 100;
                                            if (this.state.utilisationBois.chauffage > 0 && this.state.utilisationBois.industrie > 0) {
                                                removal = removal / 2;
                                            }
                                            this.setState({
                                                utilisationBois: {
                                                    chauffage: Math.floor(Math.max(0, this.state.utilisationBois.chauffage - removal)),
                                                    industrie: Math.floor(Math.max(0, this.state.utilisationBois.industrie - removal)),
                                                    oeuvre: Math.floor(value)
                                                }
                                            });
                                        } else {
                                            this.setState({
                                                utilisationBois: {
                                                    chauffage: this.state.utilisationBois.chauffage,
                                                    industrie: this.state.utilisationBois.industrie,
                                                    oeuvre: Math.floor(value)
                                                },
                                            });
                                        }

                                    }}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={this.props.savingTree}
                            disabled={!this.state.numero || !this.state.diametre || this.state.essence === null}
                            onClick={() => {
                                /*this.props.addParcel(this.state);
                                 this.setState({
                                 nom: "",
                                 lieu: "",
                                 surface: null
                                 })*/
                            }}>Sauvegarder</Button>
                    </Form.Item>
                </Form>

            </Card>
        );
    }
}

ParcelForm.propTypes = {};

export default ParcelForm;
