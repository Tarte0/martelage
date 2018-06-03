import {connect} from "react-redux";
import FiledParcelView from "../components/FiledParcelView";
import {selectedParcel, selectFiledParcelsAsArray, selectFiledParcel} from "../selectors/data";

export default connect((state, props) => ({
    filedParcels: selectFiledParcelsAsArray(state),
    selectedParcel : selectedParcel(state),
    filedParcel : selectFiledParcel(state)
}), (dispatch, props) => ({

}))(FiledParcelView);
