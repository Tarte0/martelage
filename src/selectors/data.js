import {createSelector} from 'reselect'
import {calculateVolumeAndPrices} from "../helpers/calculationHelper";
const getParcels = state => state.getIn(['data', 'parcels']);
const getEtats = state => state.getIn(['data', 'etats']);
const getEssences = state => state.getIn(['data', 'essences']);
const getTypes = state => state.getIn(['data', 'types']);
const getSelectedParcel = state => state.getIn(['data', 'selectedParcel']);
const getSelectedTree = state => state.getIn(['data', 'selectedTree']);
const getConstants = state => state.getIn(['data', 'constants']);

export const selectParcelsAsArray = createSelector(
    [getParcels],
    (parcels) => {
        return Object.keys(parcels.toJS()).map(id => ({id, key:id, ...parcels.get(id).toJS()}))
    }
);

export const selectEtatsAsArray = createSelector(
    [getEtats],
    (etats) => {
        return  Object.keys(etats.toJS()).map(e => ({etat: e}));
    }
);

export const selectEssencesAsArray = createSelector(
    [getEssences],
    (essences) => {
        return  Object.keys(essences.toJS()).map(e => ({essence: e, type: essences.get(e)}));
    }
);

export const selectTypesAsArray = createSelector(
    [getTypes],
    (types) => {
        return  Object.keys(types.toJS()).map(e => ({type: e}));
    }
);

export const selectedParcel = createSelector(
    [getParcels, getSelectedParcel],
    (parcels, selectedParcelId) => {
        if (selectedParcelId) {
            return parcels.get(selectedParcelId);
        }
        return null;
    }
);

export const selectedTree = createSelector(
    [getParcels, getSelectedParcel, getSelectedTree],
    (parcels, selectedParcelId, selectedTreeId) => {
        if (selectedParcelId && selectedTreeId) {
            return parcels.getIn([selectedParcelId, 'arbres', selectedTreeId]);
        }
        return null;
    }
);

export const getSelectedTrees = createSelector(
    [getParcels, getSelectedParcel],
    (parcels, selectedParcelId) => {
        if (selectedParcelId) {
            let treesObject = parcels.getIn([selectedParcelId, 'arbres']);
            if(treesObject != undefined) {
                treesObject = treesObject.toJS();
                return Object.keys(treesObject).map((e) => {
                    treesObject[e].id = e;
                    return treesObject[e];
                });
            }
        }
        return [];
    }
);

export const getTreesVolumeAndPrices = createSelector(
    [getParcels, getSelectedParcel, getConstants, getEssences],
    (parcels, selectedParcelId, constants, essences) => {
        if (selectedParcelId) {
            let treesObject = parcels.getIn([selectedParcelId, 'arbres']);
            if(treesObject != undefined) {
                treesObject = treesObject.toJS();
                return Object.keys(treesObject).map(t => ({volumePrix : calculateVolumeAndPrices(t, essences, constants.get('hauteurMoyenne'), constants.getIn(['volume', 'commercial']), 'v', constants.getIn(['prix', 'bois'])), ...t}))
            }
        }
        return [];
    }
);
