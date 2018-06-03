import {connect} from "react-redux";
import EtatsList from "../components/EtatsList";
import {selectEtatsAsArray} from "../selectors/data";

export default
    connect(
        (state, props) => ({
            etats: selectEtatsAsArray(state)
        }),
        (dispatch, props) => ({

        })
    )(EtatsList);
