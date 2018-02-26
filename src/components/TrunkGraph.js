// @flow
import React from "react";
import trunkChart from "../d3/trunkChart";


class TrunkGraph extends React.Component {
    componentDidMount() {
       trunkChart.render(this.el, this.props.trees, this.props.version);
    }

    componentDidUpdate() {
        trunkChart.render(this.el, this.props.trees, this.props.version);
    }

    render() {
        return <div className={"trunkchart"} ref={(el) => (this.el = el)} />;
    }
}

TrunkGraph.propTypes = {};

export default TrunkGraph;
