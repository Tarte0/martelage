import { expect } from 'chai';
import { Map, List,fromJS } from 'immutable';
import fixture from '../fixture/data.json'
import {initialState} from '../../src/reducers/data'
import {getSelectedTrees} from '../../src/selectors/data'
describe('Martelage get selected trees ', () => {
    let state;

    beforeEach(() => {
        state = Map({data:initialState()});
        state = state.setIn(['data','parcels'], fromJS(fixture))
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
});
