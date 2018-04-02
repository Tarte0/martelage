import {connect} from "react-redux";
import {withRouter} from "react-router";
import CsvImporter from "../components/CsvImporter";
import {selectParcelsAsArray, selectEtatsAsArray, selectEssencesAsArray, getSelectedTrees} from "../selectors/data";
import {setSelectedParcel} from "../actions/data";

export default withRouter(
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
        })
    )(CsvImporter));
