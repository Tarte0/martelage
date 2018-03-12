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
    SET_ESSENCES,
    SET_TYPES,
    SET_SELECTED_TREE,
    SET_CONSTANTS,
    EDIT_TREE,
    EDIT_TREE_SUCCESS,
    EDIT_TREE_FAILURE, SET_FILED_PARCELS, SET_SELECTED_FILED_PARCEL
} from "../actions/data";

export const initialState = () => {
    return Map({
        parcels: Map(),
        filedParcels: Map(),
        etats: Map(),
        essences: Map(),
        types: Map(),
        constants: Map(),
        savingParcel: false,
        savingEtat: false,
        savingEssence: false,
        editingParcelSuccess: false,
        selectedParcel: "",
        selectedFiledParcel: "",
        selectedTree: "",
        savingTree: false,
        editingTreeSuccess: false,
    });
};

export default (state = initialState(), action) => {
    switch (action.type) {
        case SET_PARCELS:
            return state.set('parcels', fromJS(action.parcels));
        case SET_FILED_PARCELS:
            return state.set('filedParcels', fromJS(action.filedParcels));
        case SET_ETATS:
            return state.set('etats', fromJS(action.etats));
        case SET_ESSENCES:
            return state.set('essences', fromJS(action.essences));
        case SET_TYPES:
            return state.set('types', fromJS(action.types));
        case SET_CONSTANTS:
            return state.set('constants', fromJS(action.constants));
        case ADD_PARCEL:
            return state.set('savingParcel', true);
        case ADD_PARCEL_SUCCESS:
            return state.set('savingParcel', false);
        case ADD_PARCEL_FAILURE:
            return state.set('savingParcel', false);
        case SET_SELECTED_PARCEL:
            return state.set('selectedParcel', action.parcelId);
        case SET_SELECTED_FILED_PARCEL:
            return state.set('selectedFiledParcel', action.filedParcelId);
        case SET_SELECTED_TREE:
            return state.set('selectedTree', action.treeId);
        case EDIT_PARCEL:
            return state.set('editingParcelSuccess', false);
        case EDIT_PARCEL_SUCCESS:
            return state.set('editingParcelSuccess', true);
        case EDIT_PARCEL_FAILURE:
            return state.set('editingParcelSuccess', false);
        case EDIT_TREE:
            return state.set('editingTreeSuccess', false);
        case EDIT_TREE_SUCCESS:
            return state.set('editingTreeSuccess', true);
        case EDIT_TREE_FAILURE:
            return state.set('editingTreeSuccess', false);
    }

    return state;
}
