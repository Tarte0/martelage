import * as d3 from "d3";
import {groupTrees} from "../helpers/d3Helper";

const margin = {top: 150, right: 100, bottom: 50, left: 50}
    , width = 500
    , height = 500;

const trunkChart = {};

const keys = ["v",
    "ms",
    "mp"];
const z = d3.scaleOrdinal().domain(keys)
    .range(["#7de14b", "#FF6432", "#FFC832"]);

trunkChart.render = (el, data, version) => {
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
        .attr('class', 'chartGroup')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .each(function () {
            const g = d3.select(this);
            g.append('text').attr("class","titleText")
                .attr("y",-margin.top/2)
                .attr("x",width/2)
                .style("text-anchor",'middle');

            g.append("g")
                .attr("class", "xAxis")
                .attr("transform", "translate(0," + height + ")")
                .append("text")
                .attr("transform", "translate(" + (width +margin.right) + "," + 25 + ")")
                .attr("font-weight", "bold")
                .attr("text-anchor", "end")
                .attr("class", "xAxisLabel");


            g.append("g")
                .attr("class", "yAxis")
                .append("text")
                .attr("x", 2)
                .attr("y", "-25")
                .attr("dy", "0.32em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text("Tiges");

            const legend = g.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter().append("g")
                .attr("transform", function (d, i) {
                    return "translate(50," + (i * 20) + ")";
                });

            legend.append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", z);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function (d) {
                    return d;
                });
        });
    d3.select(el).select('.titleText').text(version[0] === "diametre" ? "Nombre de tiges par classe de diamètre":"Nombre de tiges par note écologique");
    const versionUpper = version[0].charAt(0).toUpperCase() + version[0].slice(1);
    d3.select(el).select('.xAxisLabel').text(versionUpper === "Diametre" ? "Diamètre (cm)" :versionUpper);
    const stack = groupTrees(data, version);

    const x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.05)
        .align(0.1);

    const y = d3.scaleLinear()
        .rangeRound([height, 0]);


    x.domain(stack.map(function (d) {
        return d.key;
    }));

    y.domain([0, d3.max(stack, function (d) {
        return d.total;
    })]).nice();
    z.domain(keys);

    d3.select(el).select('.xAxis').transition().duration(500).call(d3.axisBottom(x));
    d3.select(el).select('.yAxis').transition().duration(500).call(d3.axisLeft(y));

    const g = d3.select(el)
        .select(".chartGroup");

    const bars = g.selectAll(".bars")
        .data(d3.stack().keys(keys)(stack));

    bars.enter().append("g").attr('class', 'bars')
        .attr("fill", function (d) {
            return z(d.key);
        })
        .merge(bars)
        .each(function (d) {
            const rects = d3.select(this)
                .selectAll("rect")
                .data(d);
            rects.enter()
                .append("rect")
                .each(function () {
                    d3.select(this).append('title');
                })
                .attr("y", height)
                .attr("x", function (d) {
                    return x(d.data.key);
                })
                .merge(rects)
                .transition().duration(500)
                .attr("x", function (d) {
                    return x(d.data.key);
                })
                .attr("y", function (d) {
                    return y(d[1]);
                })
                .attr("height", function (d) {
                    return y(d[0]) - y(d[1]);
                })
                .attr("width", x.bandwidth())
                .select('title')
                .text(function (d) {
                    return d[1] - d[0]
                });
            rects.exit().transition().duration(500)
                .attr("y", height)
                .attr("height", 0);
            rects.exit().transition().delay(500).remove();

        });
    bars.exit().transition().delay(500).remove();
};

export default trunkChart;