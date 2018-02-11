export const SET_PARCELS = "SET_PARCELS";
export const ADD_PARCEL = "ADD_PARCEL";
export const ADD_PARCEL_SUCCESS = "ADD_PARCEL_SUCCESS";
export const ADD_PARCEL_FAILURE = "ADD_PARCEL_FAILURE";
export const SET_SELECTED_PARCEL = "SET_SELECTED_PARCEL";
export const EDIT_PARCEL = "EDIT_PARCEL";
export const EDIT_PARCEL_SUCCESS = "EDIT_PARCEL_SUCCESS";
export const EDIT_PARCEL_FAILURE = "EDIT_PARCEL_FAILURE";

export const setParcels = (parcels) => (
    {type: SET_PARCELS, parcels}
);

export const addParcel = () => (
    {type: ADD_PARCEL}
);

export const addParcelSuccess = () => (
    {type: ADD_PARCEL_SUCCESS}
);

export const addParcelFailure = () => (
    {type: ADD_PARCEL_FAILURE}
);

export const setSelectedParcel = (parcelId) => (
    {type: SET_SELECTED_PARCEL, parcelId}
);

export const editParcel = (parcelId, parcelAttr) => (
    {type: EDIT_PARCEL, parcelId, parcelAttr}
);

export const editParcelSuccess = () => (
    {type: EDIT_PARCEL_SUCCESS}
);

export const editParcelFailure = () => (
    {type: EDIT_PARCEL_FAILURE}
);