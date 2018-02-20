import { createSelector } from 'reselect'
const getParcels = state => state.getIn(['data','parcels']);
const getSelectedParcel = state => state.getIn(['data','selectedParcel']);

export const selectParcelsAsArray = createSelector(
    [getParcels],
    (parcels) => {
        return Object.keys(parcels.toJS()).map(id=> ({id , ...parcels.get(id).toJS() }))
    }
);

export const selectedParcel = createSelector(
    [getParcels, getSelectedParcel],
    (parcels, selectedParcelId) => {
        if(selectedParcelId){
            return parcels.get(selectedParcelId);
        }
        return null;
    }
);

export const getSelectedTree = createSelector(
    [getParcels, getSelectedParcel],
    (parcels, selectedParcelId) => {
        if(selectedParcelId){
            return parcels.getIn([selectedParcelId,selectedParcelId.arbres.]);
        }
        return null;
    }
);
