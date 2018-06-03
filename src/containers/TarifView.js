/**
 * Created by cimin on 23/05/2018.
 */
import {connect} from "react-redux";
import TarifView from "../components/TarifView";

export default
    connect(
        (state, props) => ({
            tarifs : state.getIn(["data", "tarifs"]),
        }),
        (dispatch, props) => ({

        })
    )(TarifView);
