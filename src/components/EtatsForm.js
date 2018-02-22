// @flow
import React from "react";
import {Form, Input, Button, Card} from "antd";

class EtatsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            etat: ""
        };
    }

    render() {


        return (
            <Card>
                <Form>
                    <Form.Item label="Etat">
                        <Input value={this.state.etat} onChange={(e)=>{this.setState({etat : e.target.value})}} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={this.props.savingEtat}
                            disabled={!this.state.etat} onClick={() => {
                            this.props.addEtat(this.state.etat);
                            this.setState({etat: ""})
                        }}>Sauvegarder</Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

EtatsForm.propTypes = {};

export default EtatsForm;
