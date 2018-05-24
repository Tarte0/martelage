// @flow
import React from "react";
import {Form, Input, Button, Card} from "antd";

class ParcelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            lieu: "",
            surface: null,
            altitude: null,
            habitat: "",
            constantes: {
                prelevement: {
                    min: 0,
                    max: 100
                },
                rotation: {
                    min: 1,
                    max: 10
                },
                tarifs: {
                    feuillus: {
                        algan : 7
                    },
                    resineux: {
                        schaefferLent : 11
                    }
                }
            },
            version: 0
        };
    }

    render() {


        return (
            <Card>
                <Form>
                    <Form.Item label="Nom">
                        <Input value={this.state.nom} onChange={(e) => {
                            this.setState({nom: e.target.value})
                        }}/>
                    </Form.Item>
                    <Form.Item label="Lieux">
                        <Input value={this.state.lieu} onChange={(e) => {
                            this.setState({lieu: e.target.value})
                        }}/>
                    </Form.Item>
                    <Form.Item label="Surface">
                        <Input type="number" step="0.01" min="0" value={this.state.surface} onChange={(e) => {
                            this.setState({surface: e.target.value})
                        }}/>
                    </Form.Item>
                    <Form.Item label="Altitude">
                        <Input type="number" step="0.01" min="0" value={this.state.altitude} onChange={(e) => {
                            this.setState({altitude: e.target.value})
                        }}/>
                    </Form.Item>
                    <Form.Item label="Habitat">
                        <Input value={this.state.habitat} onChange={(e) => {
                            this.setState({habitat: e.target.value})
                        }}/>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={this.props.savingParcel}
                            disabled={!this.state.nom || !this.state.lieu || this.state.surface === null
                            || !this.state.altitude || this.state.habitat === null}
                            onClick={() => {
                                this.state.altitude = Number(this.state.altitude);
                                this.state.surface = Number(this.state.surface);
                                this.props.addParcel(this.state);
                                this.setState({
                                    nom: "",
                                    lieu: "",
                                    surface: null,
                                    altitude: null,
                                    habitat: "",
                                    constantes: {
                                        prelevement: {
                                            min: 0,
                                            max: 100
                                        },
                                        rotation: {
                                            min: 1,
                                            max: 10
                                        },
                                        tarifs: {
                                            feuillus: {
                                                algan : 7
                                            },
                                            resineux: {
                                                schaefferLent : 11
                                            }
                                        }
                                    },
                                    version: 0
                                })
                            }}>Sauvegarder</Button>
                    </Form.Item>
                </Form>

            </Card>
        );
    }
}

ParcelForm.propTypes = {};

export default ParcelForm;
