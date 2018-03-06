import {connect} from "react-redux";
import {withRouter} from "react-router";
import TreeList from "../components/TreeList";
import {selectedParcel, getSelectedTrees, selectedTree} from "../selectors/data";
import {deleteTreeByIdThunk, editTreeByIdThunk} from "../thunks/data";
import {setSelectedTree} from "../actions/data";

export default withRouter(
    connect(
        (state, props) => ({
            selectedParcel: state.getIn(['data', 'selectedParcel']),
            selectedTrees: getSelectedTrees(state),
            selectedTree: selectedTree(state),
            savingTree: state.getIn(['data', 'savingTree']),
            editingTreeSuccess: state.getIn(['data', 'editingTreeSuccess'])
        }),
        (dispatch, props) => ({
            deleteTree(parcelId, treeId){
                dispatch(deleteTreeByIdThunk(parcelId, treeId))
            },
            selectTree(treeId){
                dispatch(setSelectedTree(treeId))
            },
            editTree(parcelId, treeId, selectedTreeAttr){
                dispatch(editTreeByIdThunk(parcelId, treeId, selectedTreeAttr))
            }
        })
    )(TreeList));
