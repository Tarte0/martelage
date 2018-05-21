/**
 * Created by cimin on 21/05/2018.
 */
import {connect} from "react-redux";
import {withRouter} from "react-router";
import ParcelConstantView from "../components/ParcelConstantView";
import {selectedParcel} from "../selectors/data";
import {saveBornesConstThunk} from "../thunks/data";

export default withRouter(
    connect(
        (state, props) => ({
            selectedParcelID : state.getIn(["data", "selectedParcel"]),
            selectedParcel : selectedParcel(state),
        }),
        (dispatch, props) => ({
            saveBornesConst (parcelId, constantName, values){
                dispatch(saveBornesConstThunk(parcelId, constantName, values))
            }
        })
    )(ParcelConstantView));