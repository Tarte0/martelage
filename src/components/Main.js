// @flow
import React from "react";
import {Card, Collapse, Tabs, Row, Col} from "antd";
import ParcelForm from "../containers/ParcelForm";
import ParcelList from "../containers/ParcelList";
import TreeForm from "../containers/TreeForm";
import TreeView from "../containers/TreeView";
import EtatsList from "../containers/EtatsList";
import EssenceList from "../containers/EssenceList";
import TypeList from "../containers/TypeList";
import EtatsForm from "../containers/EtatsForm";
import EssenceForm from "../containers/EssenceForm";
import ParcelView from "../containers/ParcelView";


class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Card>
                    <ParcelList />
                </Card>
                <Tabs defaultActiveKey="1" type="card">
                    <Tabs.TabPane tab="Parcelles" key="1">
                        <Collapse>
                            <Collapse.Panel header="Graphs" key="1">
                                <ParcelView/>
                            </Collapse.Panel>
                            <Collapse.Panel header="Ajouter une parcelle" key="2">
                                    <ParcelForm />
                            </Collapse.Panel>

                        </Collapse>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Arbres" key="2">
                        <Collapse>
                            <Collapse.Panel header="Arbres" key="1">
                                <TreeView />
                            </Collapse.Panel>
                            <Collapse.Panel header="Ajouter un arbre" key="2">
                                <TreeForm />
                            </Collapse.Panel>
                        </Collapse>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Général" key="3">
                        <Collapse>
                            <Collapse.Panel header="Etats" key="31">
                                <Row>
                                    <Col span={10} >
                                        <EtatsList/>
                                    </Col>
                                    <Col span={10} offset={4}>
                                        <EtatsForm/>
                                    </Col>
                                </Row>
                            </Collapse.Panel>
                            <Collapse.Panel header="Essences" key="32">
                                <Row>
                                    <Col span={10} >
                                        <EssenceList/>
                                    </Col>
                                    <Col span={10} offset={4}>
                                        <EssenceForm/>
                                    </Col>
                                </Row>
                            </Collapse.Panel>
                            <Collapse.Panel header="Types" key="33">
                                <Row>
                                    <Col span={10} >
                                        <TypeList/>
                                    </Col>
                                </Row>
                            </Collapse.Panel>
                        </Collapse>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

Main.propTypes = {};

export default Main;
