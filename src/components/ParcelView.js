// @flow
import React from "react";
import {Card, Col, Row, Tabs} from "antd";
import TreeGraph from './TreeGraph';
import TrunkGraph from './TrunkGraph';
import VolumeChart from './chart/VolumeChart';
import SpecieChart from './chart/SpecieChart';

class ParcelView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {selectedParcel} = this.props;
        return (
            <div>

                    {selectedParcel ?
                        <div>
                            <Row>
                                <Col span={8}>
                                    <Card title="Répartition des arbres sur la parcelle">
                                    <TreeGraph trees={this.props.selectedTrees}/>
                                    </Card>
                                </Col>
                                <span style={{width:'2px',color:'grey',height:"100%"}}/>
                                <Col span={8}>
                                    <Card title="Divers">
                                    <Tabs defaultActiveKey="1" type="card">

                                        <Tabs.TabPane tab="Nombre de tiges" key="1">
                                            <TrunkGraph trees={this.props.selectedTrees} version={["diametre"]}/>
                                        </Tabs.TabPane>

                                        <Tabs.TabPane tab="Volume" key="3">
                                            <VolumeChart trees={this.props.treesWithVolume} />
                                        </Tabs.TabPane>

                                        <Tabs.TabPane tab="Note ecologique" key="2">
                                            <TrunkGraph trees={this.props.selectedTrees} version={["noteEcologique"]}/>
                                        </Tabs.TabPane>


                                    </Tabs>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="Distribution des types et essences des arbres de la parcelle">
                                    <SpecieChart trees={this.props.selectedTrees} species={this.props.essences}
                                                 types={this.props.types}/>
                                     </Card>
                                </Col>
                            </Row>
                        </div>
                        : "Merci de sélectionner une parcelle"}

            </div>
        );
    }
}

ParcelView.propTypes = {};

export default ParcelView;
