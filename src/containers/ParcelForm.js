import {connect} from "react-redux";
import ParcelForm from "../components/ParcelForm";
import {addParcelThunk} from "../thunks/data";

export default
    connect(
        (state, props) => ({
            savingParcel: state.getIn(['data', 'savingParcel'])
        }),
        (dispatch, props) => ({
            addParcel: (parcel) => {
                dispatch(addParcelThunk(parcel))
            }
        })
    )(ParcelForm);
