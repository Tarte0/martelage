import * as d3 from "d3";

const margin = {top: 50, right: 100, bottom: 50, left: 50}
    , width = 250
    , height = 250;

const dateChart = {};

dateChart.render = (el, data) => {


    console.log(data);

    const parseTime = d3.timeParse("%d/%b/%y");

    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    x.domain(d3.extent(data, function (d) {
        return d.key;
    }));

    y.domain([0, d3.max(data, function (d) {
        return d.value;
    })+5]);

    const valueline = d3.line()
        .x(function (d) {
            return x(d.key);
        })
        .y(function (d) {
            return y(d.value);
        });


    d3.select(el)
        .selectAll("svg")
        .data(['svg'])
        .enter()
        .append('svg')
        .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('class', 'svg-content-responsive')
        .attr('width', '100%')
        .append('g');

    const dots = d3.select(el)
        .select("g")
        .selectAll(".dot")
        .data(data);

    dots.enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) { return x(d.key); } )
        .attr("cy", function(d) { return y(d.value); } )
        .attr("r", 2)
        .merge(dots)
        .transition()
        .duration(500)
        .attr("cx", function (d, ) {
            return x(d.key);
        })
        .attr("cy", function (d) {
            return y(d.value);
        });

    dots.exit()
        .transition()
        .duration(100)
        .attr("r", function (d) {
            return 0;
        })
        .transition()
        .delay(100)
        .remove();

    const line = d3.select(el)
        .select("g")
        .selectAll(".line")
        .data([data]);

    line.enter()
        .append("path")
        .attr("class", "line")
        .attr("d", valueline)
        .merge(line)
        .transition()
        .duration(500)
        .attr("d", valueline);

    d3.select(el)
        .selectAll("svg")
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
            .tickFormat(d3.timeFormat("%d/%m/%Y")))
        .selectAll("text")
        .style("text-anchor", "end")
        .style("font-size", "0.85em")
        .attr("dx", "-.3em")
        .attr("dy", ".1.5em")
        .attr("transform", "rotate(-65)");

    d3.select(el)
        .selectAll("svg")
        .append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));

};

export default dateChart;