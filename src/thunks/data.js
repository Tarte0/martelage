import * as firebase from 'firebase';
import * as uuid from "uuid";
import {addParcelSuccess, addParcelFailure, addParcel, setParcels, editParcel, editParcelSuccess, editParcelFailure, deleteTree, deleteTreeSuccess, deleteTreeFailure} from "../actions/data";

const config = {
    apiKey: "AIzaSyC7JXmQ0tZDmPu1myxCYwX8L6s39tXhVLk",
    authDomain: "martelage-751df.firebaseapp.com",
    databaseURL: "https://martelage-751df.firebaseio.com",
    projectId: "martelage-751df",
    storageBucket: "",
    messagingSenderId: "329628247737"
};
firebase.initializeApp(config);

const database = firebase.database();

export function addParcelThunk(parcel) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        dispatch(addParcel());
        return database.ref('parcelles/' + uuid.v4())
            .set(parcel).then((e) => {
                dispatch(addParcelSuccess())
            }).catch((e) => {
                console.error(e);
                dispatch(addParcelFailure())
            });
    }
}
export function getParcels(store) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    database.ref('/parcelles/').on('value', function (snapshot) {
        const parcels = snapshot.val();
        console.log(parcels)
        store.dispatch(setParcels(parcels));
        // render(objToArray(parcel), "Tout");
    });
}

export function deleteParcelByIdThunk(parcelId) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {

        dispatch(addParcel());
        database.ref(`/parcelles/${parcelId}`).remove().then((e) => {
            dispatch(addParcelSuccess())
        }).catch((e) => {
            console.error(e);
            dispatch(addParcelFailure())
        });

        // render(objToArray(parcel), "Tout");
    }
}

export function editParcelByIdThunk(parcelId, parcelAttr) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        if(parcelAttr !== null){
            dispatch(editParcel(parcelId, parcelAttr));
            const state = getState();

            database.ref(`/parcelles/${parcelId}`).set({
                ...state.getIn(['data','parcels',parcelId]).toJS(), ...parcelAttr
            }).then((e) => {
                dispatch(editParcelSuccess())
            }).catch((e) => {
                console.error(e);
                dispatch(editParcelFailure())
            });
        }
    }
}

export function deleteTreeByIdThunk(parcelId, treeId) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        dispatch(deleteTree());
        database.ref(`/parcelles/${parcelId}/arbres/${treeId}`).remove().then((e) => {
            dispatch(deleteTreeSuccess())
        }).catch((e) => {
            console.error(e);
            dispatch(deleteTreeFailure())
        });
    }
}
