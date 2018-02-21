import {connect} from "react-redux";
import {withRouter} from "react-router";
import TreeList from "../components/TreeList";
import {selectedParcel, getSelectedTrees} from "../selectors/data";
import {deleteTreeByIdThunk} from "../thunks/data";

export default withRouter(
    connect(
        (state, props) => ({
            selectedParcel : selectedParcel(state),
            selectedTrees : getSelectedTrees(state)
        }),
        (dispatch, props) => ({
            deleteTree(parcelId, treeId){
                dispatch(deleteTreeByIdThunk(parcelId, treeId))
            }
        })
    )(TreeList));
