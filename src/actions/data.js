export const SET_PARCELS = "SET_PARCELS";
export const ADD_PARCEL = "ADD_PARCEL";
export const ADD_TREE = "ADD_TREE";
export const ADD_PARCEL_SUCCESS = "ADD_PARCEL_SUCCESS";
export const ADD_PARCEL_FAILURE = "ADD_PARCEL_FAILURE";
export const ADD_TREE_SUCCESS = "ADD_TREE_SUCCESS";
export const ADD_TREE_FAILURE = "ADD_TREE_FAILURE";
export const SET_SELECTED_PARCEL = "SET_SELECTED_PARCEL";
export const EDIT_PARCEL = "EDIT_PARCEL";
export const UPDATE_PARCEL = "UPDATE_PARCEL";
export const FILE_PARCEL = "FILE_PARCEL";
export const EDIT_TREE = "EDIT_TREE";
export const EDIT_PARCEL_SUCCESS = "EDIT_PARCEL_SUCCESS";
export const EDIT_PARCEL_FAILURE = "EDIT_PARCEL_FAILURE";
export const UPDATE_PARCEL_SUCCESS = "UPDATE_PARCEL_SUCCESS";
export const UPDATE_PARCEL_FAILURE = "UPDATE_PARCEL_FAILURE";
export const FILE_PARCEL_SUCCESS = "FILE_PARCEL_SUCCESS";
export const FILE_PARCEL_FAILURE = "FILE_PARCEL_FAILURE";
export const EDIT_TREE_SUCCESS = "EDIT_TREE_SUCCESS";
export const EDIT_TREE_FAILURE = "EDIT_TREE_FAILURE";
export const DELETE_TREE = "DELETE_TREE";
export const DELETE_TREE_SUCCESS = "DELETE_TREE_SUCCESS";
export const DELETE_TREE_FAILURE = "DELETE_TREE_FAILURE";
export const DELETE_PARCEL = "DELETE_PARCEL";
export const DELETE_PARCEL_SUCCESS = "DELETE_PARCEL_SUCCESS";
export const DELETE_PARCEL_FAILURE = "DELETE_PARCEL_FAILURE";
export const DELETE_ETAT = "DELETE_ETAT";
export const DELETE_ETAT_SUCCESS = "DELETE_ETAT_SUCCESS";
export const DELETE_ETAT_FAILURE = "DELETE_ETAT_FAILURE";
export const DELETE_ESSENCE = "DELETE_ESSENCE";
export const DELETE_ESSENCE_SUCCESS = "DELETE_ESSENCE_SUCCESS";
export const DELETE_ESSENCE_FAILURE = "DELETE_ESSENCE_FAILURE";
export const SET_SELECTED_TREE = "SET_SELECTED_TREE";
export const SET_ETATS = "SET_ETATS";
export const ADD_ETAT = "ADD_ETAT";
export const ADD_ETAT_SUCCESS = "ADD_ETAT_SUCCESS";
export const ADD_ETAT_FAILURE = "ADD_ETAT_FAILURE";
export const ADD_ESSENCE = "ADD_ESSENCE";
export const ADD_ESSENCE_SUCCESS = "ADD_ESSENCE_SUCCESS";
export const ADD_ESSENCE_FAILURE = "ADD_ESSENCE_FAILURE";
export const SET_ESSENCES = "SET_ESSENCES";
export const SET_TYPES = "SET_TYPES";
export const SET_CONSTANTS = "SET_CONSTANTS";

export const setParcels = (parcels) => (
    {type: SET_PARCELS, parcels}
);

export const setEtats = (etats) => (
    {type: SET_ETATS, etats}
);

export const setTypes = (types) => (
    {type: SET_TYPES, types}
);

export const setEssences = (essences) => (
    {type: SET_ESSENCES, essences}
);
export const setConstants = (constants) => (
    {type: SET_CONSTANTS, constants}
);

export const addParcel = () => (
    {type: ADD_PARCEL}
);

export const addTree = () => (
    {type: ADD_TREE}
);

export const addEtat = () => (
    {type: ADD_ETAT}
);

export const addEssence = () => (
    {type: ADD_ESSENCE}
);

export const addEssenceSuccess = () => (
    {type: ADD_ESSENCE_SUCCESS}
);

export const addEssenceFailure = () => (
    {type: ADD_ESSENCE_FAILURE}
);
export const addTreeSuccess = () => (
    {type: ADD_TREE_SUCCESS}
);

export const addTreeFailure = () => (
    {type: ADD_TREE_FAILURE}
);

export const addParcelSuccess = () => (
    {type: ADD_PARCEL_SUCCESS}
);

export const addEtatSuccess = () => (
    {type: ADD_ETAT_SUCCESS}
);

export const addParcelFailure = () => (
    {type: ADD_PARCEL_FAILURE}
);

export const addEtatFailure = () => (
    {type: ADD_ETAT_FAILURE}
);

export const setSelectedParcel = (parcelId) => (
    {type: SET_SELECTED_PARCEL, parcelId}
);

export const editParcel = (parcelId, parcelAttr) => (
    {type: EDIT_PARCEL, parcelId, parcelAttr}
);

export const updateParcel = (parcelId) => (
    {type: UPDATE_PARCEL, parcelId}
);

export const fileParcel = (parcelId) => (
    {type: FILE_PARCEL, parcelId}
);

export const editTree = (parcelId, treeId, treeAttr) => (
    {type: EDIT_TREE, parcelId, treeId, treeAttr}
);

export const editParcelSuccess = () => (
    {type: EDIT_PARCEL_SUCCESS}
);

export const editParcelFailure = () => (
    {type: EDIT_PARCEL_FAILURE}
);

export const updateParcelSuccess = () => (
    {type: UPDATE_PARCEL_SUCCESS}
);

export const updateParcelFailure = () => (
    {type: UPDATE_PARCEL_FAILURE}
);

export const fileParcelSuccess = () => (
    {type: FILE_PARCEL_SUCCESS}
);

export const fileParcelFailure = () => (
    {type: FILE_PARCEL_FAILURE}
);
export const editTreeSuccess = () => (
    {type: EDIT_TREE_SUCCESS}
);

export const editTreeFailure = () => (
    {type: EDIT_TREE_FAILURE}
);

export const deleteTree = () => (
    {type: DELETE_TREE}
);

export const deleteTreeSuccess = () => (
    {type: DELETE_TREE_SUCCESS}
);

export const deleteTreeFailure = () => (
    {type: DELETE_TREE_FAILURE}
);

export const setSelectedTree = (treeId) => (
    {type: SET_SELECTED_TREE, treeId}
);

export const deleteParcel = () => (
    {type: DELETE_PARCEL}
);

export const deleteParcelSuccess = () => (
    {type: DELETE_PARCEL_SUCCESS}
);

export const deleteParcelFailure = () => (
    {type: DELETE_PARCEL_FAILURE}
);

export const deleteEtat = () => (
    {type: DELETE_ETAT}
);

export const deleteEtatSuccess = () => (
    {type: DELETE_ETAT_SUCCESS}
);

export const deleteEtatFailure = () => (
    {type: DELETE_ETAT_FAILURE}
);
export const deleteEssence = () => (
    {type: DELETE_ESSENCE}
);

export const deleteEssenceSuccess = () => (
    {type: DELETE_ESSENCE_SUCCESS}
);

export const deleteEssenceFailure = () => (
    {type: DELETE_ESSENCE_FAILURE}
);