import React from "react";
import {Card, Button, Row} from "antd";


class Init extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Card title="Initialisation de la base de donnée">
                    <Row>
                        La base de données ne semble pas initialisée, voulez vous le faire ?
                    </Row>
                    <br/>
                    <Row>
                        <Button type="primary"
                                size="large"
                                loading={this.props.initStart}
                                onClick={() => {
                                    this.props.initDB()
                                }}>
                            INITIALISER

                        </Button>
                    </Row>
                </Card>


            </div>
        );
    }
}

Init.propTypes = {};

export default Init;
