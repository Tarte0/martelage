// @flow
import React from "react";
import volumeChart from "../../d3/volumeChart";


class VolumeChart extends React.Component {
    componentDidMount() {
        volumeChart.render(this.el, this.props.trees, this.props.version);
    }

    componentDidUpdate() {
        volumeChart.render(this.el, this.props.trees, this.props.version);
    }

    render() {
        return <div className={"volumechart"} ref={(el) => (this.el = el)} />;
    }
}

VolumeChart.propTypes = {};

export default VolumeChart;
