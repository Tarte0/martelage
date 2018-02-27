import { expect } from 'chai';
import { Map, List,fromJS } from 'immutable';
import fixture from '../fixture/data.json'
import constantsFixture from '../fixture/constants.json'
import {initialState} from '../../src/reducers/data'
import {getSelectedTrees, getTreesVolumeAndPrices} from '../../src/selectors/data'

describe('Martelage get selected trees ', () => {
    let state;
    let trees;

    beforeEach(() => {
        state = Map({data:initialState()});
        state = state.setIn(['data','parcels'], fromJS(fixture));
        state = state.setIn(['data','constants'], fromJS(constantsFixture));
    });

    it('returns trees with id', () => {

        expect(getSelectedTrees(state).length).to.be.equals(0);

        state = state.setIn(['data','selectedParcel'],'parcelleMartelapp');
        const selectedTrees = getSelectedTrees(state);

        expect(selectedTrees.length).to.be.equals(16);
        const found = selectedTrees.find((e) => e.id === '-L54LXjP3fu8ZHRUwCl6');
        expect(found.id).to.be.equals('-L54LXjP3fu8ZHRUwCl6');
        expect(found.essence).to.be.equals('Chataignier');
        expect(found.numero).to.be.equals(40);

    });

    describe('TreeVolumePrices', () => {
        it(' should calculate tree volume and prices ', () => {

            state = state.setIn(['data','selectedParcel'],'parcelleMartelapp');

            const treesVp = getTreesVolumeAndPrices(state);
            const tree = treesVp[0];

            console.log(tree);

            expect (tree.numero).to.be.equals(297);
            expect (tree.hauteurDecoupe).to.be.equals(15);
            expect (tree.volume.commercial).to.be.equals(0.57);
            expect (tree.prix.valeurEco).to.be.equals(25.65);
        });
    });
});
