import {connect} from "react-redux";
import {withRouter} from "react-router";
import CsvImporter from "../components/CsvImporter";
import {selectParcelsAsArray, selectEtatsAsArray, selectEssencesAsArray} from "../selectors/data";

export default withRouter(
    connect(
        (state, props) => ({
            parcels : selectParcelsAsArray(state),
            etats: selectEtatsAsArray(state),
            essences: selectEssencesAsArray(state),
        }),
        (dispatch, props) => ({

        })
    )(CsvImporter));
