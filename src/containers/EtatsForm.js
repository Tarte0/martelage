import {connect} from "react-redux";
import {withRouter} from "react-router";
import EtatsForm from "../components/EtatsForm";
import {addEtatThunk} from "../thunks/data";

export default withRouter(
    connect(
        (state, props) => ({
            savingEtat: state.getIn(['data', 'savingEtat'])
        }),
        (dispatch, props) => ({
            addEtat: (etat) => {
                dispatch(addEtatThunk(etat))
            }
        })
    )(EtatsForm));
