import {connect} from "react-redux";
import {withRouter} from "react-router";
import ParcelView from "../components/ParcelView";
import {selectedParcel} from "../selectors/data";

export default withRouter(
    connect(
        (state, props) => ({
            selectedParcel : selectedParcel(state)
        }),
        (dispatch, props) => ({

        })
    )(ParcelView));
