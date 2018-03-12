import {connect} from "react-redux";
import {withRouter} from "react-router";
import FiledParcelList from "../components/FiledParcelList";
import {selectedParcel, selectFiledParcelsAsArray, selectFiledParcel} from "../selectors/data";

export default withRouter(connect((state, props) => ({
    filedParcels: selectFiledParcelsAsArray(state),
    selectedParcel: state.getIn(['data', 'selectedParcel']),
    filedParcel : selectFiledParcel(state)
}), (dispatch, props) => ({

}))(FiledParcelList));
