// @flow
import React from 'react';
import {Card, Form, Icon, Input, Tabs} from 'antd';
import ParcelForm from '../containers/ParcelForm'
import ParcelList from '../containers/ParcelList'
import ParcelView from '../containers/ParcelView'
import TreeView from '../containers/TreeView'


class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (

            <Tabs defaultActiveKey="1" type="card">
                <Tabs.TabPane tab="Parcelles" key="1">
                    <Card>
                        {/*<Switch/>*/}
                        <ParcelForm />
                        <ParcelList />
                        <ParcelView />
                    </Card>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Arbres" key="2">
                    <TreeView />
                </Tabs.TabPane>
            </Tabs>

        );
    }
}

Main.propTypes = {};

export default Main;
