import {expect} from 'chai';
import trees from '../fixture/trees.json'
import * as d3 from 'd3'
import {groupTrees,countSpecies} from '../../src/helpers/d3Helper'
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
    describe(' countSpecies', () => {
        it(' should count species  ', () => {
            const res = countSpecies(trees);
            expect(res.length).to.be.equals(4);
            expect(res.find(s=> s.type ==="Sapin").count).to.be.equals(3);

            const speciePie = d3.pie()
                .sort(null)
                .value((d)=>d.count);
            console.log(speciePie(res))
        });
    });
});

