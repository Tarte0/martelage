import {connect} from "react-redux";
import EssenceList from "../components/EssenceList";
import {selectEssencesAsArray} from "../selectors/data";
import {deleteEssenceByIdThunk} from "../thunks/data";

export default
    connect(
        (state, props) => ({
            essences: selectEssencesAsArray(state)
        }),
        (dispatch, props) => ({
            deleteEssence(essenceId){
                dispatch(deleteEssenceByIdThunk(essenceId))
            }
        })
    )(EssenceList);
