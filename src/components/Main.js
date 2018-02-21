// @flow
import React from "react";
import {Card, Collapse, Tabs, Row, Col} from "antd";
import ParcelForm from "../containers/ParcelForm";
import ParcelList from "../containers/ParcelList";
import TreeForm from "../containers/TreeForm";
import TreeView from "../containers/TreeView";
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
                            <Collapse.Panel header="Ajouter une parcelle" key="1">
                                <Card>
                                    <ParcelForm />
                                </Card>
                            </Collapse.Panel>
                            <Collapse.Panel header="Graphs" key="2">
                                <ParcelView/>
                            </Collapse.Panel>
                        </Collapse>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Arbres" key="2">
                        <Collapse>
                            <Collapse.Panel header="Arbres" key="1">
                                <Card>
                                    <TreeView />
                                </Card>
                            </Collapse.Panel>
                            <Collapse.Panel header="Ajouter un arbre" key="2">
                                <TreeForm />
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
