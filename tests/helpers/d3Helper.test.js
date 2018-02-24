import {expect} from 'chai';
import trees from '../fixture/trees.json'
import species from '../fixture/species.json'
import * as d3 from 'd3'
import {groupTrees,countSpecies,sortSpeciesByCount, countType} from '../../src/helpers/d3Helper'
//-r babel-register
describe('d3 helpers ', () => {


    describe(' groupTrees should group trees by diameter ', () => {

        it(' ', () => {
            const res = groupTrees(trees);
            expect(res.length).to.be.equals(8);
            expect(res[0].key).to.be.equals("15");
            expect(res[0].total).to.be.equals(4);
        });
    });
    describe(' compareTrees', () => {
        it(' should sort   ', () => {
            let sortSpeciesByCount2 = [
                {type:"résineux",count:10,essence:"1"},
                {type:"feuillu",count:10,essence:"2"},
                {type:"feuillu",count:3,essence:"3"},
                {type:"feuillu",count:4,essence:"4"},
                {type:"feuillu",count:5,essence:"5"},
                {type:"résineux",count:4,essence:"6"}
            ].sort(sortSpeciesByCount);
            expect (sortSpeciesByCount2[0].essence).to.be.equals("3");
            expect (sortSpeciesByCount2[1].essence).to.be.equals("4");
            expect (sortSpeciesByCount2[2].essence).to.be.equals("5");
            expect (sortSpeciesByCount2[3].essence).to.be.equals("2");
            expect (sortSpeciesByCount2[4].essence).to.be.equals("6");
            expect (sortSpeciesByCount2[5].essence).to.be.equals("1");
        });
    });
    describe(' countSpecies', () => {
        it(' should count species  ', () => {
            const res = countSpecies(trees, species);
            expect(res.length).to.be.equals(4);
            expect(res.find(s=> s.essence ==="sapin").count).to.be.equals(3);
            expect(res.find(s=> s.essence ==="sapin").type).to.be.equals('résineux');

        });
    });

    describe(' countType', () => {
        it(' should count types  ', () => {
            const res = countType(trees, species);
            expect(res.length).to.be.equals(2);
            expect(res.find(s=> s.type ==="résineux").count).to.be.equals(9);

        });
    });
});

