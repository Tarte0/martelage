import {connect} from "react-redux";
import TypeList from "../components/TypeList";
import {selectTypesAsArray} from "../selectors/data";
//import {deleteEtatByIdThunk} from "../thunks/data";

export default
    connect(
        (state, props) => ({
            types: selectTypesAsArray(state)
        }),
        (dispatch, props) => ({
           /* deleteEtat(etatId){
                dispatch(deleteEtatByIdThunk(etatId))
            }*/
        })
    )(TypeList);
