import {connect} from "react-redux";
import TreeView from "../components/TreeView";
import {selectedParcel, selectedTree} from "../selectors/data";

export default
    connect(
        (state, props) => ({
            constants : state.getIn(['data', 'constants']),
            essences: state.getIn(['data', 'essences'])
        }),
        (dispatch, props) => ({

        })
    )(TreeView);
