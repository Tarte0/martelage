// @flow
import React from "react";
import trunkChart from "../d3/trunkChart";


class TrunkGraph extends React.Component {
    componentDidMount() {
        trunkChart.render(this.el, this.props.trees);
    }

    componentDidUpdate() {
        trunkChart.render(this.el, this.props.trees);
    }

    render() {
        return <div className="trunkchart" ref={(el) => (this.el = el)} />;
    }
}

TrunkGraph.propTypes = {};

export default TrunkGraph;
