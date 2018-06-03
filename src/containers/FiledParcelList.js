import {connect} from "react-redux";
import FiledParcelList from "../components/FiledParcelList";
import {selectedParcel, selectFiledParcelsAsArray, selectFiledParcel} from "../selectors/data";

export default connect((state, props) => ({
    filedParcels: selectFiledParcelsAsArray(state),
    selectedParcel: state.getIn(['data', 'selectedParcel']),
    filedParcel : selectFiledParcel(state)
}), (dispatch, props) => ({

}))(FiledParcelList)
