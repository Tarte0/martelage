import {connect} from "react-redux";
import {withRouter} from "react-router";
import EtatsList from "../components/EtatsList";
import {selectEtatsAsArray} from "../selectors/data";

export default withRouter(
    connect(
        (state, props) => ({
            etats: selectEtatsAsArray(state)
        }),
        (dispatch, props) => ({

        })
    )(EtatsList));
