import * as firebase from 'firebase';
import * as uuid from "uuid";
import {
    addParcelSuccess,
    addParcelFailure,
    addParcel,
    setParcels,
    editParcel,
    editParcelSuccess,
    editParcelFailure,
    deleteTree,
    deleteTreeSuccess,
    deleteTreeFailure,
    setEtats,
    addEtat,
    addEtatSuccess,
    addEtatFailure,
    deleteParcel,
    deleteParcelSuccess,
    deleteParcelFailure,
    deleteEtatSuccess,
    deleteEtatFailure,
    deleteEtat,
    deleteEssence,
    deleteEssenceSuccess,
    deleteEssenceFailure,
    setEssences,
    addEssence,
    addEssenceSuccess,
    addEssenceFailure,
    setTypes,
    addTree,
    addTreeSuccess,
    addTreeFailure,
    setConstants,
    editTreeSuccess,
    editTreeFailure,
    editTree, updateParcel, updateParcelSuccess, updateParcelFailure, fileParcel, fileParcelSuccess, fileParcelFailure,
    setFiledParcels, saveConstFailure, saveConstSuccess, saveConst, setTarifs
} from "../actions/data";
/*
//firebase config, change it to plug this app to it
const config = {
    apiKey: "AIzaSyC7JXmQ0tZDmPu1myxCYwX8L6s39tXhVLk",
    authDomain: "martelage-751df.firebaseapp.com",
    databaseURL: "https://martelage-751df.firebaseio.com",
    projectId: "martelage-751df",
    storageBucket: "",
    messagingSenderId: "329628247737"
};*/


 /*const config = {
 apiKey: "AIzaSyD1FBAeh4YmGRkuQF6IrjspJIiDxDHDNhM",
 authDomain: "martelage-5cbf0.firebaseapp.com",
 databaseURL: "https://martelage-5cbf0.firebaseio.com",
 projectId: "martelage-5cbf0",
 storageBucket: "martelage-5cbf0.appspot.com",
 messagingSenderId: "523646105021"
 };*/

const config = {
    apiKey: "AIzaSyBKNHTXS2z5LJgnTtkEUvbG-Z554NtPzYE",
    authDomain: "testfirebase-d5fcc.firebaseapp.com",
    databaseURL: "https://testfirebase-d5fcc.firebaseio.com/",
    projectId: "testfirebase-d5fcc",
    storageBucket: "testfirebase-d5fcc.appspot.com",
    messagingSenderId: "711040738225"
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

export function addEtatThunk(etat) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        dispatch(addEtat());
        return database.ref('metadata/etats/' + etat)
            .set(true).then((e) => {
                dispatch(addEtatSuccess())
            }).catch((e) => {
                console.error(e);
                dispatch(addEtatFailure())
            });
    }
}
export function addEssenceThunk(essence, type) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        dispatch(addEssence());
        return database.ref('metadata/essences/' + essence)
            .set(type).then((e) => {
                dispatch(addEssenceSuccess())
            }).catch((e) => {
                console.error(e);
                dispatch(addEssenceFailure())
            });
    }
}

export function addTreeThunk(tree) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */

    return (dispatch, getState) => {
        dispatch(addTree());
        let newTree = database.ref(`parcelles/${tree.parcelId}/arbres`).push();
        newTree.set({
            numero: tree.numero,
            essence: tree.essence,
            diametre: tree.diametre,
            etat: tree.etat,
            coord: {"x": tree.coord.x, "y": tree.coord.y},
            noteEcologique: tree.noteEcologique,
            utilisationBois: {
                "oeuvre": tree.utilisationBois.oeuvre,
                "chauffage": tree.utilisationBois.chauffage,
                "industrie": tree.utilisationBois.industrie
            }
        }).then((e) => {
            dispatch(addTreeSuccess())
        }).catch((e) => {
            console.error(e);
            dispatch(addTreeFailure())
        });
        return newTree;
    }
}

export function getParcels(store) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    database.ref('/parcelles/').on('value', function (snapshot) {
        const parcels = snapshot.val();
        store.dispatch(setParcels(parcels));
    });
}

export function getFiledParcels(store) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    database.ref('/historique/parcelles/').on('value', function (snapshot) {
        const filedParcels = snapshot.val();
        store.dispatch(setFiledParcels(filedParcels));
    });
}

export function getEtats(store) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    database.ref('/metadata/etats').on('value', function (snapshot) {
        const etats = snapshot.val();
        store.dispatch(setEtats(etats));
    });
}

export function getTypes(store) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    database.ref('/metadata/types').on('value', function (snapshot) {
        const types = snapshot.val();
        store.dispatch(setTypes(types));
    });
}

export function getEssences(store) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    database.ref('/metadata/essences').on('value', function (snapshot) {
        const essences = snapshot.val();
        store.dispatch(setEssences(essences));
    });
}

export function getConstants(store) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    database.ref('/metadata/constantes').on('value', function (snapshot) {
        const constants = snapshot.val();
        store.dispatch(setConstants(constants));
    });
}

export function getTarifs(store) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    database.ref('/metadata/tarifs').on('value', function (snapshot) {
        const tarifs = snapshot.val();
        store.dispatch(setTarifs(tarifs));
    });
}

export function deleteParcelByIdThunk(parcelId) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        dispatch(deleteParcel());
        database.ref(`/parcelles/${parcelId}`).remove().then((e) => {
            dispatch(deleteParcelSuccess())
        }).catch((e) => {
            console.error(e);
            dispatch(deleteParcelFailure())
        });

        // render(objToArray(parcel), "Tout");
    }
}

export function deleteEtatByIdThunk(etatId) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        dispatch(deleteEtat());
        database.ref(`/metadata/etats/${etatId}`).remove().then((e) => {
            dispatch(deleteEtatSuccess())
        }).catch((e) => {
            console.error(e);
            dispatch(deleteEtatFailure())
        });

        // render(objToArray(parcel), "Tout");
    }
}
export function deleteEssenceByIdThunk(essenceId) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        dispatch(deleteEssence());
        database.ref(`/metadata/essences/${essenceId}`).remove().then((e) => {
            dispatch(deleteEssenceSuccess())
        }).catch((e) => {
            console.error(e);
            dispatch(deleteEssenceFailure())
        });
    }
}

export function editParcelByIdThunk(parcelId, parcelAttr) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        if (parcelAttr !== null) {
            dispatch(editParcel(parcelId, parcelAttr));
            const state = getState();

            database.ref(`/parcelles/${parcelId}`).set({
                ...state.getIn(['data', 'parcels', parcelId]).toJS(), ...parcelAttr
            }).then((e) => {
                dispatch(editParcelSuccess())
            }).catch((e) => {
                console.error(e);
                dispatch(editParcelFailure())
            });
        }
    }
}

export function updateParcelThunk(parcelId) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        dispatch(updateParcel(parcelId));
        const state = getState();

        database.ref(`/parcelles/${parcelId}`).set({
            ...state.getIn(['data', 'parcels', parcelId]).toJS(),
            version: state.getIn(['data', 'parcels', parcelId, 'version']) + 1
        }).then((e) => {
            dispatch(updateParcelSuccess())
        }).catch((e) => {
            console.error(e);
            dispatch(updateParcelFailure())
        });
    }
}

export function fileParcelThunk(parcelId) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {

        dispatch(fileParcel(parcelId));
        const state = getState();
        const serverTime = Date.now();

        database.ref(`/historique/parcelles/${parcelId}/${state.getIn(['data', 'parcels', parcelId, 'version'])}`).set({
            ...state.getIn(['data', 'parcels', parcelId]).toJS(), date: serverTime
        }).then((e) => {
            dispatch(fileParcelSuccess());
            dispatch(updateParcelThunk(parcelId));
        }).catch((e) => {
            console.error(e);
            dispatch(fileParcelFailure());
        });

    }
}

export function editTreeByIdThunk(parcelId, treeId, treeAttr) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        if (treeAttr !== null) {
            dispatch(editTree(parcelId, treeId, treeAttr));
            const state = getState();

            database.ref(`/parcelles/${parcelId}/arbres/${treeId}`).set({
                ...state.getIn(['data', 'parcels', parcelId, 'arbres', treeId]).toJS(), ...treeAttr
            }).then((e) => {
                dispatch(editTreeSuccess())
            }).catch((e) => {
                console.error(e);
                dispatch(editTreeFailure())
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
        console.log(parcelId, treeId);
        dispatch(deleteTree());
        database.ref(`/parcelles/${parcelId}/arbres/${treeId}`).remove().then((e) => {
            dispatch(deleteTreeSuccess())
        }).catch((e) => {
            console.error(e);
            dispatch(deleteTreeFailure())
        });
    }
}

export function saveHauteurMoyenneConstThunk(key, value) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        dispatch(saveConst());
        database.ref(`/metadata/constantes/hauteurMoyenne/${key}`).set(value).then((e) => {
            dispatch(saveConstSuccess())
        }).catch((e) => {
            console.error(e);
            dispatch(saveConstFailure())
        });
    }
}


export function saveBornesConstThunk(parcelId, constantName, values) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        dispatch(saveConst());
        database.ref(`/parcelles/${parcelId}/constantes/${constantName}`).set(values).then((e) => {
            dispatch(saveConstSuccess())
        }).catch((e) => {
            console.error(e);
            dispatch(saveConstFailure())
        });
    }
}

export function saveVolumeConstThunk(key, value) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        dispatch(saveConst());
        database.ref(`/metadata/constantes/volume/commercial/${key}`).set(value).then((e) => {
            dispatch(saveConstSuccess())
        }).catch((e) => {
            console.error(e);
            dispatch(saveConstFailure())
        });
    }
}

export function savePrixBoisConstThunk(type,key, value) {
    /**
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
        dispatch(saveConst());
        database.ref(`/metadata/constantes/prix/bois/${type}/${key}`).set(value).then((e) => {
            dispatch(saveConstSuccess())
        }).catch((e) => {
            console.error(e);
            dispatch(saveConstFailure())
        });
    }
}