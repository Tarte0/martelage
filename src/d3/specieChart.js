import * as d3 from "d3";

const margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = 500
    , height = 500;

const specieChart = {};

specieChart.render = (el, data) => {
    d3.select(el)
        .selectAll("svg")
        .data(['svg'])
        .enter()
        .append('svg')
        .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('class', 'svg-content-responsive')
        .attr('width', '100%')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

};

export default specieChart;