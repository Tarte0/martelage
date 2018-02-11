import {connect} from "react-redux";
import {withRouter} from "react-router";
import ParcelForm from "../components/ParcelForm";
import {addParcelThunk} from "../thunks/data";

export default withRouter(
    connect(
        (state, props) => ({
            savingParcel: state.getIn(['data', 'savingParcel'])
        }),
        (dispatch, props) => ({
            addParcel: (parcel) => {
                dispatch(addParcelThunk(parcel))
            }
        })
    )(ParcelForm));
