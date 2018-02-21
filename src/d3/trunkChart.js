import * as d3 from "d3";

const margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = 500
    , height = 500;

const trunkChart = {};

const z = d3.scaleOrdinal()
    .domain(["v", "ms", "mp"])
    .range(["#00ff00", "#ff0000", "#ffff00"]);

trunkChart.render = (el, data) => {

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
        .attr('transform', `translate(${margin.left},${margin.top})`).each(function () {
        const g = d3.select(this);
        g.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .append("text")
            .attr("transform", "translate(" + width + "," + 25 + ")")
            .attr("y", height)
            // .attr("dy", "0.32em")
            // .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .text("diametre");

        g.append("g")
            .attr("class", "yAxis")

            .append("text")
            .attr("x", 2)
            // .attr("y", height)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("tiges");

    });
    const stack = d3.nest()
        .key(function (d) {
            return d.diametre;
        })
        .rollup(function (d) {
            let v = d.filter(function (e) {
                return e.etat === "v"
            }).length;
            let ms = d.filter(function (e) {
                return e.etat === "ms"
            }).length;
            let mp = d.filter(function (e) {
                return e.etat === "mp"
            }).length;
            return {
                v: v,
                ms: ms,
                mp: mp,
                total: v + ms + mp
            }
        }).entries(Object.values(data)).map(function (g) {
            return {key: g.key, v: g.value.v, ms: g.value.ms, mp: g.value.mp}
        }).sort(function (a, b) {
            return Number(a.key) - Number(b.key)
        });

    const x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.05)
        .align(0.1);

    const y = d3.scaleLinear()
        .rangeRound([height, 0]);

    const z = d3.scaleOrdinal()
        .range(["#64FF32", "#FF6432", "#FFC832"]);

    const keys = ["v",
        "ms",
        "mp"];

    x.domain(stack.map(function (d) {
        return d.key;
    }));
    y.domain([0, d3.max(stack, function (d) {
        return d.v;
    })]).nice();
    z.domain(keys);

    d3.select(el).select('.xAxis').call(d3.axisBottom(x));
    d3.select(el).select('.yAxis').call(d3.axisLeft(y));

    const g = d3.select(el)
        .select(".chartGroup");

    const bars = g.selectAll(".bars")
        .data(d3.stack().keys(keys)(stack));

    bars.enter().append("g").attr('class', 'bars')
    // .attr("fill", function (d) {
    //     return z(d.key);
    // })
    // .attr("class", function (d) {
    //     return d.key;
    // })
        .selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("fill", function (d) {
            console.log(d);
            return z(d.data.key);
        })
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
        .append('title').text(function (d) {
        return d[1] - d[0]
    });


    const legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
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
};

export default trunkChart;