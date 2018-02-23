import * as d3 from "d3";
import {countSpecies} from "../helpers/d3Helper";

const margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = 500
    , height = 500;

const specieChart = {};


const speciesArc = d3.arc()
    .outerRadius((width / 2.3))
    .innerRadius(width/4);
const typeArc = d3.arc()
    .outerRadius((width / 2))
    .innerRadius((width / 2.3)+1);

const colors = d3.interpolateRainbow;

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
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .append('g')
        .attr('class', 'pie')
        .attr('transform', `translate(${width / 2},${height / 2})`);


    const pie = d3.pie()
        .sort(null)
        .value((d) => d.count);


    const keys = d3.map(countSpecies(data), function (d) {
        return d.type;
    }).keys();
    console.log(keys);

    const arcs = d3.select(el)
        .select(".pie")
        .selectAll(".arc")
        .data(pie(countSpecies(data)));

    arcs.enter()
        .append("path")
        .attr("class", "arc")
        .merge(arcs)
        .attr("d", (d) => speciesArc(d))
        .attr("fill", (d) => colors(keys.indexOf(d.data.type) / keys.length));

    arcs.exit().remove();

    const tarcs = d3.select(el)
        .select(".pie")
        .selectAll(".tarc")
        .data(pie(countSpecies(data)));

    tarcs.enter()
        .append("path")
        .attr("class", "tarc")
        .merge(tarcs)
        .attr("d", (d) => typeArc(d))
        .attr("fill",(d) => colors( 1- keys.indexOf(d.data.type) / keys.length));

    tarcs.exit().remove();


};

export default specieChart;