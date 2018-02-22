import {Map, fromJS} from "immutable";
import {
    ADD_PARCEL,
    SET_PARCELS,
    ADD_PARCEL_SUCCESS,
    ADD_PARCEL_FAILURE,
    SET_SELECTED_PARCEL,
    EDIT_PARCEL,
    EDIT_PARCEL_SUCCESS,
    EDIT_PARCEL_FAILURE,
    SET_ETATS,
    SET_ESSENCES, SET_TYPES
} from "../actions/data";

export const initialState = () => {
    return Map({
        parcels: Map(),
        etats: Map(),
        essences: Map(),
        types: Map(),
        savingParcel: false,
        savingEtat: false,
        savingEssence: false,
        editingParcelSuccess: false,
        selectedParcel: "",
        selectedTree: ""
    });
};

export default (state = initialState(), action) => {
    switch (action.type) {
        case SET_PARCELS:
            return state.set('parcels', fromJS(action.parcels));
        case SET_ETATS:
            return state.set('etats', fromJS(action.etats));
        case SET_ESSENCES:
            return state.set('essences', fromJS(action.essences));
        case SET_TYPES:
            return state.set('types', fromJS(action.types));
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
