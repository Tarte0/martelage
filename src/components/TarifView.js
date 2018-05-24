/**
 * Created by cimin on 23/05/2018.
 */
import React from "react";
import {Card, Table, Popconfirm , Row, Col} from "antd";
import SpreadSheet from './SpreadSheet'

class TarifView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Row>
                <Col>
                    <Card title="Algan">
                <SpreadSheet
                    colLabel="Version"
                    lineLabel="Diamètre"
                    colTitle={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
                    lineTitle={[15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]}
                    matrix = {this.props.tarifs.get('algan').toJS()}/>
                    </Card>
                </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Card title="Chaudé">
                        <SpreadSheet
                            colLabel="Version"
                            lineLabel="Diamètre"
                            colTitle={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
                            lineTitle={[15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]}
                            matrix = {this.props.tarifs.get('chaudé').toJS()}/>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Card title="Schaeffer lent">
                        <SpreadSheet
                            colLabel="Version"
                            lineLabel="Diamètre"
                            colTitle={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
                            lineTitle={[15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]}
                            matrix = {this.props.tarifs.get('schaefferLent').toJS()}/>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Card title="Schaeffer rapide">
                        <SpreadSheet
                            colLabel="Version"
                            lineLabel="Diamètre"
                            colTitle={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
                            lineTitle={[15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]}
                            matrix = {this.props.tarifs.get('schaefferRapide').toJS()}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

TarifView.propTypes = {};

export default TarifView;
