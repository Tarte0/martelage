import {connect} from "react-redux";
import {withRouter} from 'react-router';
import ParcelList from "../components/ParcelList";
import {selectParcelsAsArray, selectedParcel} from "../selectors/data";
import {deleteParcelByIdThunk, editParcelByIdThunk, fileParcelThunk} from "../thunks/data";
import {setSelectedParcel} from "../actions/data";

export default withRouter(connect((state, props) => ({
    parcels: selectParcelsAsArray(state),
    savingParcel: state.getIn(['data', 'savingParcel']),
    selectedParcel: state.getIn(['data', 'selectedParcel']),
    editingParcelSuccess: state.getIn(['data', 'editingParcelSuccess'])
}), (dispatch, props) => ({
    deleteParcel(parcelId){
        dispatch(deleteParcelByIdThunk(parcelId))
    },
    selectParcel(parcelId){
        dispatch(setSelectedParcel(parcelId))
    },
    editParcel(parcelId, selectedParcelAttr){
        dispatch(editParcelByIdThunk(parcelId, selectedParcelAttr))
    },
    fileParcel(parcelId){
        dispatch(fileParcelThunk(parcelId))
    }
}))(ParcelList));
