/**
 * Created by cimin on 23/05/2018.
 */
import {connect} from "react-redux";
import {withRouter} from "react-router";
import TarifView from "../components/TarifView";

export default withRouter(
    connect(
        (state, props) => ({
            tarifs : state.getIn(["data", "tarifs"]),
        }),
        (dispatch, props) => ({

        })
    )(TarifView));
