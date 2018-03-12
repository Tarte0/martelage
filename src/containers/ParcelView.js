import {connect} from "react-redux";
import {withRouter} from "react-router";
import ParcelView from "../components/ParcelView";
import {selectedParcel, getSelectedTrees, selectEssencesAsArray, selectTypesAsArray, selectFiledParcelsAsArray,
    selectFiledParcel
} from "../selectors/data";

export default withRouter(
    connect(
        (state, props) => ({
            selectedParcel : selectedParcel(state),
            selectedTrees : getSelectedTrees(state),
            essences: selectEssencesAsArray(state),
            types: selectTypesAsArray(state),
            filedParcels: selectFiledParcelsAsArray(state),
            filedParcel : selectFiledParcel(state)
        }),
        (dispatch, props) => ({

        })
    )(ParcelView));
