import {connect} from "react-redux";
import ParcelList from "../components/ParcelList";
import {selectParcelsAsArray, selectedParcel, selectFiledParcelsAsArray} from "../selectors/data";
import {deleteParcelByIdThunk, editParcelByIdThunk, fileParcelThunk} from "../thunks/data";
import {setSelectedParcel} from "../actions/data";

export default connect((state, props) => ({
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
}))(ParcelList);
