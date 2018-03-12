// @flow
import React from "react";
import dateChart from "../../d3/dateChart";
import "../../style/line.css";

class DateChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        dateChart.render(this.el, this.props.data);
    }

    componentDidUpdate() {
        dateChart.render(this.el, this.props.data);
    }

    render() {
        return <div className="datechart" ref={(el) => (this.el = el)} />;
    }
}

DateChart.propTypes = {};

export default DateChart;
