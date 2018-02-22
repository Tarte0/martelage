import {connect} from "react-redux";
import {withRouter} from "react-router";
import EssenceList from "../components/EssenceList";
import {selectEssencesAsArray} from "../selectors/data";
import {deleteEssenceByIdThunk} from "../thunks/data";

export default withRouter(
    connect(
        (state, props) => ({
            essences: selectEssencesAsArray(state)
        }),
        (dispatch, props) => ({
            deleteEssence(essenceId){
                dispatch(deleteEssenceByIdThunk(essenceId))
            }
        })
    )(EssenceList));
