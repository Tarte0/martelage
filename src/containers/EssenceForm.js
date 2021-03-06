import {connect} from "react-redux";
import EssenceForm from "../components/EssenceForm";
import {addEssenceThunk} from "../thunks/data";
import {selectTypesAsArray} from "../selectors/data";

export default
    connect(
        (state, props) => ({
            savingEssence: state.getIn(['data', 'savingEssence']),
            types: selectTypesAsArray(state)
        }),
        (dispatch, props) => ({
            addEssence: (essence, type) => {
                dispatch(addEssenceThunk(essence, type))
            }
        })
    )(EssenceForm);
