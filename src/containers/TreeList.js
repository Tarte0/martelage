import {connect} from "react-redux";
import {withRouter} from "react-router";
import TreeList from "../components/TreeList";
import {selectedParcel, getSelectedTrees, selectedTree} from "../selectors/data";
import {deleteTreeByIdThunk} from "../thunks/data";
import {setSelectedTree} from "../actions/data";

export default withRouter(
    connect(
        (state, props) => ({
            selectedParcel : state.getIn(['data', 'selectedParcel']),
            selectedTrees : getSelectedTrees(state),
            selectedTree : selectedTree(state),

        }),
        (dispatch, props) => ({
            deleteTree(parcelId, treeId){
                dispatch(deleteTreeByIdThunk(parcelId, treeId))
            },
            selectTree(treeId){
                dispatch(setSelectedTree(treeId))
            }
        })
    )(TreeList));
