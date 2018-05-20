import {connect} from "react-redux";
import {withRouter} from "react-router";
import ConstantView from "../components/ConstantView";
import {
    selectHauteurMoyenneConstantAsArray,
    selectVolumeCommercialConstantAsArray,
    selectPrixConstantAsObjectArray, selectPrelevementConstantAsArray
} from "../selectors/data";

export default withRouter(
    connect(
        (state, props) => ({
            hauteurMoyenneConst: selectHauteurMoyenneConstantAsArray(state),
            volumeCommercialConst: selectVolumeCommercialConstantAsArray(state),
            prixConst: selectPrixConstantAsObjectArray(state),
            prelevementConst: selectPrelevementConstantAsArray(state)
        }),
        (dispatch, props) => ({

        })
    )(ConstantView));