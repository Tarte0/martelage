// @flow
import React from "react";
import specieChart from "../../d3/specieChart";


class SpecieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        specieChart.render(this.el, this.props.trees, this.props.species, this.props.types);
    }

    componentDidUpdate() {
        specieChart.render(this.el, this.props.trees, this.props.species, this.props.types);
    }

    render() {
        return <div className="speciechart" ref={(el) => (this.el = el)} />;
    }
}

SpecieChart.propTypes = {};

export default SpecieChart;
