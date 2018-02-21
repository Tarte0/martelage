import {connect} from "react-redux";
import {withRouter} from "react-router";
import ParcelView from "../components/ParcelView";
import {selectedParcel, getSelectedTrees} from "../selectors/data";

export default withRouter(
    connect(
        (state, props) => ({
            selectedParcel : selectedParcel(state),
            selectedTrees : getSelectedTrees(state)
        }),
        (dispatch, props) => ({

        })
    )(ParcelView));
