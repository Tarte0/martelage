// @flow
import React from "react";
import {Card, Col, Row, Tabs} from "antd";
import DateChart from './chart/DateChart';
import {groupDateTreeNb} from "../helpers/d3Helper";

class FiledParcelView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {selectedParcel} = this.props;
        return (
            <div>{
                <Card>
                    {selectedParcel ?
                        <div>
                            <DateChart data={groupDateTreeNb(this.props.filedParcel)}/>
                        </div>
                        : "Merci de choisir une parcelle"}
                </Card>
            }</div>
        );
    }
}

FiledParcelView.propTypes = {};

export default FiledParcelView;
