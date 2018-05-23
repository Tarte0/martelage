import {connect} from "react-redux";
import {withRouter} from "react-router";
import ConstantView from "../components/ConstantView";
import {
    selectHauteurMoyenneConstantAsArray,
    selectVolumeCommercialConstantAsArray,
    selectPrixConstantAsObjectArray, selectPrelevementConstantAsArray, selectEssencesAsArray
} from "../selectors/data";
import {
    saveHauteurMoyenneConstThunk, saveVolumeConstThunk, savePrixBoisConstThunk, saveNewPrixThunk,
    saveBornesConstThunk
} from "../thunks/data";

export default withRouter(
    connect(
        (state, props) => ({
            hauteurMoyenneConst: selectHauteurMoyenneConstantAsArray(state),
            volumeCommercialConst: selectVolumeCommercialConstantAsArray(state),
            prixConst: selectPrixConstantAsObjectArray(state),
            savedConstant: state.getIn(['data', 'savedConstant']),
            essences: selectEssencesAsArray(state).map(r => r.essence)
        }),
        (dispatch, props) => ({
            saveHauteurMoyenneConst (key, value){
                dispatch(saveHauteurMoyenneConstThunk(key, value))
            }, saveVolumeConst (key, value){
                dispatch(saveVolumeConstThunk(key, value))
            }, savePrixBoisConst (type, key, value){
                dispatch(savePrixBoisConstThunk(type, key, value))
            }, saveNewPrix (type, key, value){
                dispatch(savePrixBoisConstThunk(type, key, value))
            }
        })
    )(ConstantView));
