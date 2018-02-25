import * as d3 from "d3";
import {countSpecies,countType ,sortSpeciesByCount} from "../helpers/d3Helper";

const margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = 500
    , height = 500;

const specieChart = {};


const typeArc = d3.arc()
    .outerRadius((width / 2.3))
    .innerRadius(width / 5);

const speciesArc= d3.arc()
    .outerRadius((width / 2))
    .innerRadius((width / 2.3) + 1);

specieChart.render = (el, data, species, types) => {
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
        .attr('transform', `translate(${width / 2},${height / 2})`)
        .append('g')
        .attr('class', 'details')
        .append("text")
        .attr("dy", "-1em")
        .attr('class', 'specie')
        .attr("text-anchor", "middle");

    d3.select(el).select(".details")
        .append("text")
        .attr("dy", "0em")
        .attr('class', 'type')
        .attr("text-anchor", "middle");

    d3.select(el).select(".details")
        .append("text")
        .attr("dy", "1em")
        .attr('class', 'percentages')
        .attr("text-anchor", "middle");

    d3.select(el).select(".details")
        .append("text")
        .attr("dy", "2em")
        .attr('class', 'explanations')
        .attr("text-anchor", "middle");

    const pie = d3.pie()
        .sort(sortSpeciesByCount)
        .value((d) => d.count);

    const keys = d3.map(countSpecies(data, species), function (d) {
        return d.essence;
    }).keys();

    function updateTexts(specie, type, percentages, explanations){
        d3.select(el).select(".details")
            .select('.specie')
            .text(specie);

        d3.select(el).select(".details")
            .select('.type')
            .text(type);

        d3.select(el).select(".details")
            .select('.percentages')
            .text(percentages);

        d3.select(el).select(".details")
            .select('.explanations')
            .text(explanations);
    }

    function mouseoverArc(d) {
        d3.selectAll(".arc")
            .data([d], function (d) {
                return d.data.essence;
            })
            .exit()
            .style("opacity", 0.5);

        d3.selectAll(".tarc")
            .style("opacity",(t)=>t.data.type === d.data.type?1:0.5);

        const percentage = (100 * d.data.count / data.length).toPrecision(2);
        const percentageString = percentage + "%";
        const treesOnTotal = d.data.count + " / " +data.length;

        updateTexts(d.data.essence, d.data.type, percentageString, treesOnTotal);
    }

    function mouseleaveArc(d) {
        d3.selectAll(".arc")
            .style("opacity", 1);
        d3.selectAll(".tarc")
            .style("opacity", 1);

        updateTexts('', '', '', '');
    }

    function mouseoverTarc(d) {
        d3.selectAll(".tarc")
            .style("opacity",(t)=>t.data.type === d.data.type?1:0.5);
        d3.selectAll(".arc")
            .style("opacity",(t)=>t.data.type === d.data.type?1:0.5);

        const percentage = (100 * d.data.count / data.length).toPrecision(2);
        const percentageString = percentage + "%";
        const treesOnTotal = d.data.count + " / " +data.length;

        updateTexts('', d.data.type, percentageString, treesOnTotal);
    }

    function mouseleaveTarc(d) {
        d3.selectAll(".tarc")
            .style("opacity", 1);
        d3.selectAll(".arc")
            .style("opacity", 1);

        updateTexts('', '', '', '');
    }

    const arcs = d3.select(el)
        .select(".pie")
        .selectAll(".arc")
        .data(pie(countSpecies(data, species)));


    const color20 = d3.scaleOrdinal(d3.schemeCategory20c)
        .domain(keys);

    arcs.enter()
        .append("path")
        .attr("class", "arc")
        .merge(arcs)
        .attr("d", (d) => speciesArc(d))
        .attr("fill", (d) => color20(d.data.essence))
        .on("mouseover", mouseoverArc)
        .on("mouseleave", mouseleaveArc);

    arcs.exit().remove();

    const tarcs = d3.select(el)
        .select(".pie")
        .selectAll(".tarc")
        .data(pie(countType(data, species)),(d=>d.data.type));

    const colorTypes = d3.scaleLinear()
        .domain([0, types.map(t => t['type']).length - 1])
        .range(['#7de14b', '#FFC832']);

    tarcs.enter()
        .append("path")
        .attr("class", "tarc")
        .merge(tarcs)
        .attr("d", (d) => typeArc(d))
        .attr("fill", (d) => colorTypes(types.map(t => t['type']).indexOf(d.data.type)))
        .on("mouseover", mouseoverTarc)
        .on("mouseleave", mouseleaveTarc);

    tarcs.exit().remove();


};

export default specieChart;