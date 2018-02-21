import {createSelector} from 'reselect'
const getParcels = state => state.getIn(['data', 'parcels']);
const getSelectedParcel = state => state.getIn(['data', 'selectedParcel']);

export const selectParcelsAsArray = createSelector(
    [getParcels],
    (parcels) => {
        return Object.keys(parcels.toJS()).map(id => ({id, key:id, ...parcels.get(id).toJS()}))
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

export const getSelectedTrees = createSelector(
    [getParcels, getSelectedParcel],
    (parcels, selectedParcelId) => {
        if (selectedParcelId) {
            const treesObject = parcels.getIn([selectedParcelId, 'arbres']).toJS();
            return Object.keys(treesObject).map((e) => {
                treesObject[e].id = e;
                return treesObject[e];
            });
        }
        return [];
    }
);
