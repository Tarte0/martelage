// @flow
import React from "react";
import treeChart from "../d3/treeChart";
import "../style/pie.css";


class TreeGraph extends React.Component {
    componentDidMount() {
        treeChart.render(this.el,this.props.trees);
    }

    componentDidUpdate() {
        treeChart.render(this.el,this.props.trees);
    }

    render() {
        console.log(this.props);
        return <div className="treechart" ref={(el) => (this.el = el)} />;
    }
}

TreeGraph.propTypes = {};

export default TreeGraph;
