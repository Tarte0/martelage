// @flow
import React from 'react';
import {Card, Form, Icon, Input,Tabs} from 'antd';
import ParcelForm from '../containers/ParcelForm'
import ParcelList from '../containers/ParcelList'
import ParcelView from '../containers/ParcelView'


class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {



        return (

                <Card>
                    {/*<Switch/>*/}
                    <ParcelForm />
                    <ParcelList />
                    <ParcelView />
                </Card>

        );
    }
}

Main.propTypes = {};

export default Main;
