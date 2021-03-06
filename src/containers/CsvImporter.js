import {connect} from "react-redux";
import CsvImporter from "../components/CsvImporter";
import {selectParcelsAsArray, selectEtatsAsArray, selectEssencesAsArray, getSelectedTrees} from "../selectors/data";
import {setSelectedParcel} from "../actions/data";
import {addTreeThunk} from "../thunks/data";

export default
    connect(
        (state, props) => ({
            parcels : selectParcelsAsArray(state),
            etats: selectEtatsAsArray(state),
            essences: selectEssencesAsArray(state),
            selectedParcel: state.getIn(['data', 'selectedParcel']),
            selectedTrees: getSelectedTrees(state),
        }),
        (dispatch, props) => ({
            selectParcel(parcelId){
                dispatch(setSelectedParcel(parcelId))
            },
            addTree: (tree) => {
                dispatch(addTreeThunk(tree))
            },
        })
    )(CsvImporter);
