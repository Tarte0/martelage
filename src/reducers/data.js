import {Map, fromJS} from "immutable";
import {
    ADD_PARCEL,
    SET_PARCELS,
    ADD_PARCEL_SUCCESS,
    ADD_PARCEL_FAILURE,
    SET_SELECTED_PARCEL,
    EDIT_PARCEL,
    EDIT_PARCEL_SUCCESS,
    EDIT_PARCEL_FAILURE
} from "../actions/data";

const initialState = () => {
    return Map({
        parcels: Map(),
        savingParcel: false,
        editingParcelSuccess: false,
        selectedParcel: ""
    });
};

export default (state = initialState(), action) => {
    switch (action.type) {
        case SET_PARCELS:
            return state.set('parcels', fromJS(action.parcels));
        case ADD_PARCEL:
            return state.set('savingParcel', true);
        case ADD_PARCEL_SUCCESS:
            return state.set('savingParcel', false);
        case ADD_PARCEL_FAILURE:
            return state.set('savingParcel', false);
        case SET_SELECTED_PARCEL:
            return state.set('selectedParcel', action.parcelId);
        case EDIT_PARCEL:
            return state.set('editingParcelSuccess', false);
        case EDIT_PARCEL_SUCCESS:
            return state.set('editingParcelSuccess', true);
        case EDIT_PARCEL_FAILURE:
            return state.set('editingParcelSuccess', false);
    }

    return state;
}
