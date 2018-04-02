import {connect} from "react-redux";
import {withRouter} from "react-router";
import TreeList from "../components/TreeList";
import {selectedParcel, getSelectedTrees, selectedTree, selectEtatsAsArray, selectEssencesAsArray,
    getTreesVolumeAndPrices
} from "../selectors/data";
import {deleteTreeByIdThunk, editTreeByIdThunk} from "../thunks/data";
import {setSelectedTree} from "../actions/data";

export default withRouter(
    connect(
        (state, props) => ({
            selectedParcel: state.getIn(['data', 'selectedParcel']),
            selectedTrees: getSelectedTrees(state),
            selectedTree: selectedTree(state),
            savingTree: state.getIn(['data', 'savingTree']),
            etats: selectEtatsAsArray(state),
            essences: selectEssencesAsArray(state),
            editingTreeSuccess: state.getIn(['data', 'editingTreeSuccess']),
            treesWithVolume: getTreesVolumeAndPrices(state)
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
