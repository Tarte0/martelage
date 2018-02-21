import {connect} from "react-redux";
import {withRouter} from "react-router";
import TreeForm from "../components/TreeForm";
import {addTreeThunk} from "../thunks/data";
import {selectParcelsAsArray} from "../selectors/data";

export default withRouter(
    connect(
        (state, props) => ({
            parcels : selectParcelsAsArray(state),
            savingTree: state.getIn(['data', 'savingTree'])
        }),
        (dispatch, props) => ({
            addTree: (tree) => {
                dispatch(addTreeThunk(tree))
            }
        })
    )(TreeForm));
