// @flow
import React from "react";
import specieChart from "../../d3/specieChart";


class SpecieChart extends React.Component {
    componentDidMount() {
        specieChart.render(this.el,this.props.trees);
    }

    componentDidUpdate() {
        specieChart.render(this.el,this.props.trees);
    }

    render() {
        return <div className="speciechart" ref={(el) => (this.el = el)} />;
    }
}

SpecieChart.propTypes = {};

export default SpecieChart;
