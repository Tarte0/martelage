import * as d3 from "d3";

const margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = 500
    , height = 500;

const treeChart = {};

treeChart.render = (el, data) => {
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

    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    const diam = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.diametre;
        })])
        .range([3, 10]);


    const color = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(data.map(function (d) {
            return d.essence;
        }));

    const trees = d3.select(el).select('g')
        .selectAll(".tree")
        .data(data,(d)=>d.numero);
    trees.enter()
        .append("circle")
        .attr("class", "tree")
        .attr("cx", function (d, i) {
            return x(d.coord.x);
        })
        .attr("cy", function (d) {
            return y(d.coord.y);
        })
        .attr('fill', function (d) {
            return color(d.essence);
        })
        .attr("r", function (d) {
            return 0;
        })
        .merge(trees)
        .transition()
        .duration(500)
        .attr("r", function (d) {
            return diam(d.diametre) / 2;
        })
        .attr('fill', function (d) {
            return color(d.essence);
        })
        .attr("cx", function (d, i) {
            return x(d.coord.x);
        })
        .attr("cy", function (d) {
            return y(d.coord.y);
        });

    trees.exit()
        .transition()
        .duration(500)
        .attr("r", function (d) {
            return 0;
        })
        .transition()
        .delay(500)
        .remove();


};
export default treeChart;