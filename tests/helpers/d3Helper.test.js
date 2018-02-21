import {expect} from 'chai';
import trees from '../fixture/trees.json'
import {groupTrees} from '../../src/helpers/d3Helper'
//-r babel-register
describe('Analytics getPlayerEvents selector ', () => {


    it(' ', () => {
        const res = groupTrees(trees);
        expect(res.length).to.be.equals(8);
        expect(res[0].key).to.be.equals("15");
        expect(res[0].total).to.be.equals(4);
    });
});
