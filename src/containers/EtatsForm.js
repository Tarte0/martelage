import {connect} from "react-redux";
import EtatsForm from "../components/EtatsForm";
import {addEtatThunk} from "../thunks/data";

export default
    connect(
        (state, props) => ({
            savingEtat: state.getIn(['data', 'savingEtat'])
        }),
        (dispatch, props) => ({
            addEtat: (etat) => {
                dispatch(addEtatThunk(etat))
            }
        })
    )(EtatsForm);
