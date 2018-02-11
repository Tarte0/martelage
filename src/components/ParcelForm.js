// @flow
import React from 'react';
import ParcelList from '../containers/ParcelList'
import {Card, Form, Icon, Input, Button} from 'antd';

class ParcelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            lieu: "",
            surface: null
        };
    }

    render() {


        return (
            <div>
                    <Form>
                        <Form.Item label="Nom">
                            <Input value={this.state.nom} onChange={(e)=>{this.setState({nom : e.target.value})}} />
                        </Form.Item>
                        <Form.Item label="Lieux">
                            <Input value={this.state.lieu} onChange={(e)=>{this.setState({lieu : e.target.value})}} />
                        </Form.Item>
                        <Form.Item label="Surface">
                            <Input type="number" step="0.01" min="0" value={this.state.surface} onChange={(e)=>{this.setState({surface : e.target.value})}} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={this.props.savingParcel}
                                disabled={!this.state.nom ||!this.state.lieu||this.state.surface===null} onClick={() => {
                                this.props.addParcel(this.state);
                                this.setState({ nom: "",
                                    lieu: "",
                                    surface: null})
                            }}>Sauvegarder</Button>
                        </Form.Item>
                    </Form>

            </div>
        );
    }
}

ParcelForm.propTypes = {};

export default ParcelForm;
