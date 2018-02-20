import {connect} from "react-redux";
import {withRouter} from "react-router";
import TreeView from "../components/TreeView";
import {selectedParcel} from "../selectors/data";

export default withRouter(
    connect(
        (state, props) => ({
            selectedParcel : selectedParcel(state)
        }),
        (dispatch, props) => ({

        })
    )(TreeView));
